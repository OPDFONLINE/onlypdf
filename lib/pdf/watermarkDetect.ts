/**
 * Smart watermark detection and removal.
 *
 * Many PDF watermarks are not baked into the page image. They are separate
 * objects the producing program added on top of the page:
 *   - marked-content blocks tagged as a watermark (/Artifact ... /Subtype /Watermark,
 *     a /Watermark tag, or an optional-content layer named "Watermark"),
 *   - semi-transparent text / images / shapes drawn in their own q ... Q block,
 *   - Watermark or Stamp annotations.
 *
 * This module finds those objects and deletes them for real, leaving all other
 * page content untouched. It cannot help with watermarks that are flattened
 * into a scanned image or the page's own artwork; the manual area tool exists
 * for that case.
 *
 * Everything runs in the browser. pdf-lib is imported dynamically so it is
 * never part of the initial bundle.
 */

type PdfLib = typeof import("pdf-lib");
type PdfDoc = import("pdf-lib").PDFDocument;
type PdfPage = import("pdf-lib").PDFPage;

export type WatermarkKind = "marked" | "transparent" | "annotation";

export type WatermarkCandidate = {
  /** Stable signature; pass these ids back to removeDetectedWatermarks(). */
  id: string;
  kind: WatermarkKind;
  /** Short human label, e.g. Semi-transparent text "DRAFT". */
  label: string;
  /** One-line explanation shown under the label. */
  detail: string;
  /** 0-indexed pages the candidate appears on. */
  pages: number[];
  /** Total occurrences (a tiled watermark can appear many times per page). */
  instances: number;
};

export type WatermarkAnalysis = {
  pageCount: number;
  candidates: WatermarkCandidate[];
};

/* ------------------------------------------------------------------ */
/* Content stream tokenizer                                            */
/* ------------------------------------------------------------------ */

type Op = { op: string; operands: string[]; start: number; end: number };

function isWs(c: number) {
  return c === 0 || c === 9 || c === 10 || c === 12 || c === 13 || c === 32;
}
function isDelim(c: number) {
  return c === 40 || c === 41 || c === 60 || c === 62 || c === 91 || c === 93 || c === 123 || c === 125 || c === 47 || c === 37;
}
const NUMBER = /^[+-]?(\d+\.?\d*|\.\d+)$/;

/** Byte string <-> binary string (one char per byte) so ranges map 1:1. */
export function bytesToBinary(bytes: Uint8Array): string {
  let out = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    out += String.fromCharCode.apply(null, Array.from(bytes.subarray(i, i + chunk)));
  }
  return out;
}
export function binaryToBytes(text: string): Uint8Array {
  const out = new Uint8Array(text.length);
  for (let i = 0; i < text.length; i += 1) out[i] = text.charCodeAt(i) & 0xff;
  return out;
}

function skipString(src: string, start: number): number {
  let depth = 0;
  let i = start;
  while (i < src.length) {
    const c = src.charCodeAt(i);
    if (c === 92) {
      i += 2;
      continue;
    }
    if (c === 40) depth += 1;
    else if (c === 41) {
      depth -= 1;
      if (depth === 0) return i + 1;
    }
    i += 1;
  }
  return src.length;
}

function skipDict(src: string, start: number): number {
  let depth = 0;
  let i = start;
  while (i < src.length) {
    const c = src.charCodeAt(i);
    if (c === 60 && src.charCodeAt(i + 1) === 60) {
      depth += 1;
      i += 2;
    } else if (c === 62 && src.charCodeAt(i + 1) === 62) {
      depth -= 1;
      i += 2;
      if (depth === 0) return i;
    } else if (c === 40) {
      i = skipString(src, i);
    } else {
      i += 1;
    }
  }
  return src.length;
}

function skipArray(src: string, start: number): number {
  let depth = 0;
  let i = start;
  while (i < src.length) {
    const c = src.charCodeAt(i);
    if (c === 91) {
      depth += 1;
      i += 1;
    } else if (c === 93) {
      depth -= 1;
      i += 1;
      if (depth === 0) return i;
    } else if (c === 40) {
      i = skipString(src, i);
    } else if (c === 60 && src.charCodeAt(i + 1) === 60) {
      i = skipDict(src, i);
    } else {
      i += 1;
    }
  }
  return src.length;
}

/** Splits a content stream into operations with exact source ranges. */
export function parseContent(src: string): Op[] {
  const ops: Op[] = [];
  let operands: string[] = [];
  let opStart = -1;
  let i = 0;
  const n = src.length;

  const pushOperand = (from: number, to: number) => {
    if (opStart < 0) opStart = from;
    operands.push(src.slice(from, to));
  };

  while (i < n) {
    const c = src.charCodeAt(i);
    if (isWs(c)) {
      i += 1;
      continue;
    }
    if (c === 37) {
      while (i < n && src.charCodeAt(i) !== 10 && src.charCodeAt(i) !== 13) i += 1;
      continue;
    }
    const tokenStart = i;
    if (c === 47) {
      i += 1;
      while (i < n && !isWs(src.charCodeAt(i)) && !isDelim(src.charCodeAt(i))) i += 1;
      pushOperand(tokenStart, i);
    } else if (c === 40) {
      i = skipString(src, i);
      pushOperand(tokenStart, i);
    } else if (c === 60) {
      if (src.charCodeAt(i + 1) === 60) i = skipDict(src, i);
      else {
        const close = src.indexOf(">", i);
        i = close < 0 ? n : close + 1;
      }
      pushOperand(tokenStart, i);
    } else if (c === 91) {
      i = skipArray(src, i);
      pushOperand(tokenStart, i);
    } else if (c === 41 || c === 62 || c === 93 || c === 123 || c === 125) {
      i += 1;
    } else {
      while (i < n && !isWs(src.charCodeAt(i)) && !isDelim(src.charCodeAt(i))) i += 1;
      const token = src.slice(tokenStart, i);
      if (NUMBER.test(token) || token === "true" || token === "false" || token === "null") {
        pushOperand(tokenStart, i);
      } else {
        if (opStart < 0) opStart = tokenStart;
        if (token === "BI") {
          // Inline image: skip the binary data up to the terminating EI.
          const idMatch = /\sID\s/g;
          idMatch.lastIndex = i;
          const id = idMatch.exec(src);
          if (id) {
            const eiMatch = /\sEI(?=\s|$)/g;
            eiMatch.lastIndex = id.index + id[0].length;
            const ei = eiMatch.exec(src);
            i = ei ? ei.index + ei[0].length : n;
          } else {
            i = n;
          }
        }
        ops.push({ op: token, operands, start: opStart, end: i });
        operands = [];
        opStart = -1;
      }
    }
  }
  return ops;
}

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

function unescapeLiteral(raw: string): string {
  const inner = raw.slice(1, -1);
  let out = "";
  for (let i = 0; i < inner.length; i += 1) {
    const ch = inner[i];
    if (ch !== "\\") {
      out += ch;
      continue;
    }
    const next = inner[i + 1];
    i += 1;
    if (next === undefined) break;
    if (next === "n") out += "\n";
    else if (next === "r") out += "\r";
    else if (next === "t") out += "\t";
    else if (next === "b") out += "\b";
    else if (next === "f") out += "\f";
    else if (/[0-7]/.test(next)) {
      let octal = next;
      while (octal.length < 3 && /[0-7]/.test(inner[i + 1] || "")) {
        i += 1;
        octal += inner[i];
      }
      out += String.fromCharCode(parseInt(octal, 8) & 0xff);
    } else out += next;
  }
  return out;
}

function decodeHexString(raw: string): string {
  const hex = raw.slice(1, -1).replace(/\s+/g, "");
  const bytes: number[] = [];
  for (let i = 0; i < hex.length; i += 2) bytes.push(parseInt(hex.slice(i, i + 2).padEnd(2, "0"), 16));
  // UTF-16BE where the high byte is 0 -> keep low bytes. Otherwise only accept plain ASCII.
  if (bytes.length >= 2 && bytes.length % 2 === 0 && bytes.filter((_, idx) => idx % 2 === 0).every((b) => b === 0)) {
    return String.fromCharCode(...bytes.filter((_, idx) => idx % 2 === 1));
  }
  return bytes.every((b) => b >= 32 && b < 127) ? String.fromCharCode(...bytes) : "";
}

/** Readable text drawn by the text operators inside ops[from..to]. */
function extractLabel(ops: Op[], from: number, to: number): string {
  let text = "";
  for (let i = from; i <= to && text.length < 60; i += 1) {
    const cur = ops[i];
    if (!cur) continue;
    const { op, operands } = cur;
    if (op !== "Tj" && op !== "TJ" && op !== "'" && op !== '"') continue;
    const last = operands[operands.length - 1] || "";
    const pieces = last.match(/\((?:\\.|[^\\()])*\)|<[0-9A-Fa-f\s]*>/g) || [];
    for (const piece of pieces) {
      text += piece.startsWith("(") ? unescapeLiteral(piece) : decodeHexString(piece);
    }
    text += " ";
  }
  const clean = text.replace(/[^\x20-\x7e]/g, "").replace(/\s+/g, " ").trim();
  return clean.length >= 2 ? clean.slice(0, 40) : "";
}

function nameOf(raw: string) {
  return raw.startsWith("/") ? raw.slice(1) : raw;
}

/* ------------------------------------------------------------------ */
/* Form XObjects (stamps and overlays added by pdftk, qpdf, pypdf, ...) */
/* ------------------------------------------------------------------ */

type FormVerdict = { kind: "transparent" | "marked"; label: string; percent: number; ref?: import("pdf-lib").PDFRef };

const SHOW_OPS = new Set(["Tj", "TJ", "'", '"', "f", "F", "f*", "B", "B*", "b", "b*", "S", "s", "sh", "Do", "BI"]);

/**
 * Looks inside a Form XObject that a page draws with `Do`. Many tools add a
 * watermark as a separate form: the watermark's transparency (`gs`) then lives
 * inside the form, so the page-level q ... Q check cannot see it.
 *
 * A form counts as a watermark when it carries an Acrobat watermark tag, or
 * when it draws only a few things and every one of them is semi-transparent.
 * A normal page-sized form (the page body) has many opaque paint operations,
 * so it is never flagged.
 */
function analyzeForm(lib: PdfLib, stream: import("pdf-lib").PDFStream, fallback: import("pdf-lib").PDFDict | undefined): FormVerdict | null {
  const { PDFName, PDFDict, PDFNumber, PDFRawStream, decodePDFRawStream } = lib;
  const dict = stream.dict;
  if (dict.lookup(PDFName.of("Subtype"))?.toString() !== "/Form") return null;

  // Acrobat's own "Add Watermark" marks the form through /PieceInfo.
  const piece = dict.lookup(PDFName.of("PieceInfo"));
  if (piece && /\/Watermark/.test(piece.toString())) {
    return { kind: "marked", label: "", percent: 100 };
  }

  let bytes: Uint8Array;
  try {
    bytes = stream instanceof PDFRawStream ? decodePDFRawStream(stream).decode() : stream.getContents();
  } catch {
    return null;
  }
  if (bytes.length === 0 || bytes.length > 60000) return null;

  const ops = parseContent(bytesToBinary(bytes));
  const resources = dict.lookupMaybe(PDFName.of("Resources"), PDFDict) ?? fallback;
  const gstates = resources?.lookupMaybe(PDFName.of("ExtGState"), PDFDict);
  const opacityOf = (name: string): number | undefined => {
    const gs = gstates?.lookupMaybe(PDFName.of(nameOf(name)), PDFDict);
    if (!gs) return undefined;
    const values = ["ca", "CA"]
      .map((key) => gs.lookupMaybe(PDFName.of(key), PDFNumber)?.asNumber())
      .filter((v): v is number => typeof v === "number");
    return values.length ? Math.min(...values) : undefined;
  };

  let current = 1;
  const stack: number[] = [];
  let painted = 0;
  let opaque = 0;
  let lowest = 1;
  for (const { op, operands } of ops) {
    if (op === "q") stack.push(current);
    else if (op === "Q") current = stack.pop() ?? 1;
    else if (op === "gs") {
      const value = operands[0] ? opacityOf(operands[0]) : undefined;
      if (value !== undefined) current = value;
    } else if (SHOW_OPS.has(op)) {
      painted += 1;
      if (current > 0.95) opaque += 1;
      else lowest = Math.min(lowest, current);
    }
  }
  if (painted === 0 || painted > 12 || opaque > 0) return null;
  return { kind: "transparent", label: extractLabel(ops, 0, ops.length - 1), percent: Math.round(lowest * 100) };
}

type PageScan = {
  source: string | null;
  instances: Instance[];
  annotationHits: { index: number; subtype: string }[];
};

type Instance = {
  sig: string;
  kind: WatermarkKind;
  label: string;
  detail: string;
  /** Range in the page's content source (marked / transparent). */
  start: number;
  end: number;
  /** True when found by looking inside a Form XObject drawn with `Do`. */
  formLevel?: boolean;
  /** Reference of the Form XObject that was drawn (form-level instances only). */
  formRef?: import("pdf-lib").PDFRef;
};

function readContent(lib: PdfLib, page: PdfPage): string | null {
  const { PDFArray, PDFStream, PDFRawStream, decodePDFRawStream } = lib;
  const contents = page.node.Contents();
  const streams: import("pdf-lib").PDFStream[] = [];
  if (contents instanceof PDFArray) {
    for (let i = 0; i < contents.size(); i += 1) {
      const item = contents.lookup(i);
      if (item instanceof PDFStream) streams.push(item);
    }
  } else if (contents instanceof PDFStream) {
    streams.push(contents);
  }
  if (streams.length === 0) return null;
  return streams
    .map((stream) => bytesToBinary(stream instanceof PDFRawStream ? decodePDFRawStream(stream).decode() : stream.getContents()))
    .join("\n");
}

function scanPage(lib: PdfLib, page: PdfPage): PageScan {
  const { PDFName, PDFNumber, PDFDict, PDFArray } = lib;
  const instances: Instance[] = [];
  const annotationHits: { index: number; subtype: string }[] = [];

  const resources = page.node.Resources();
  const resDict = (key: string) => resources?.lookupMaybe(PDFName.of(key), PDFDict);
  const extGStates = resDict("ExtGState");
  const properties = resDict("Properties");

  const opacityOf = (gsName: string): number | undefined => {
    const gs = extGStates?.lookupMaybe(PDFName.of(nameOf(gsName)), PDFDict);
    if (!gs) return undefined;
    const values = ["ca", "CA"]
      .map((key) => gs.lookupMaybe(PDFName.of(key), PDFNumber)?.asNumber())
      .filter((v): v is number => typeof v === "number");
    return values.length ? Math.min(...values) : undefined;
  };

  const isWatermarkMark = (op: Op): boolean => {
    if (op.op === "BMC") return op.operands[0] === "/Watermark";
    if (op.op !== "BDC") return false;
    const tag = op.operands[0];
    const prop = op.operands[1] || "";
    if (tag === "/Watermark") return true;
    if (tag === "/Artifact") {
      if (prop.startsWith("<<")) return /\/Subtype\s*\/Watermark/.test(prop);
      if (prop.startsWith("/")) {
        const dict = properties?.lookupMaybe(PDFName.of(nameOf(prop)), PDFDict);
        return dict?.lookup(PDFName.of("Subtype"))?.toString() === "/Watermark";
      }
    }
    if (tag === "/OC" && prop.startsWith("/")) {
      const ocg = properties?.lookupMaybe(PDFName.of(nameOf(prop)), PDFDict);
      const title = ocg?.lookup(PDFName.of("Name"));
      const text = title && "decodeText" in title ? (title as { decodeText(): string }).decodeText() : "";
      return /watermark/i.test(text);
    }
    return false;
  };

  const xobjects = resDict("XObject");
  const formCache = new Map<string, FormVerdict | null>();
  const formVerdict = (raw: string | undefined): FormVerdict | null => {
    if (!raw || !xobjects) return null;
    const name = nameOf(raw);
    if (formCache.has(name)) return formCache.get(name) ?? null;
    const target = xobjects.lookup(PDFName.of(name));
    const verdict = target instanceof lib.PDFStream ? analyzeForm(lib, target, resources) : null;
    if (verdict) {
      const ref = xobjects.get(PDFName.of(name));
      if (ref instanceof lib.PDFRef) verdict.ref = ref;
    }
    formCache.set(name, verdict);
    return verdict;
  };

  const source = readContent(lib, page);
  if (source) {
    const ops = parseContent(source);

    // 1) Marked-content watermarks.
    const markStack: { index: number; watermark: boolean }[] = [];
    let watermarkDepth = 0;
    // 2) Semi-transparent q ... Q blocks.
    type QFrame = { index: number; minOpacity?: number; painters: number; rotated: boolean; hasDo: boolean; childCandidate: boolean };
    const qStack: QFrame[] = [];

    for (let i = 0; i < ops.length; i += 1) {
      const cur = ops[i];
      if (!cur) continue;
      const { op, operands } = cur;

      if (op === "BMC" || op === "BDC") {
        const watermark = isWatermarkMark(cur);
        markStack.push({ index: i, watermark });
        if (watermark) watermarkDepth += 1;
      } else if (op === "EMC") {
        const frame = markStack.pop();
        if (frame?.watermark) {
          watermarkDepth -= 1;
          if (watermarkDepth === 0) {
            const label = extractLabel(ops, frame.index, i);
            instances.push({
              sig: `m|${label || "layer"}`,
              kind: "marked",
              label: label ? `Marked watermark "${label}"` : "Marked watermark layer",
              detail: "Tagged as a watermark by the program that created this PDF, so it can be removed cleanly.",
              start: ops[frame.index]!.start,
              end: cur.end,
            });
          }
        }
      } else if (op === "q") {
        qStack.push({ index: i, painters: 0, rotated: false, hasDo: false, childCandidate: false });
      } else if (op === "gs") {
        const top = qStack[qStack.length - 1];
        const value = operands[0] ? opacityOf(operands[0]) : undefined;
        if (top && value !== undefined) top.minOpacity = top.minOpacity === undefined ? value : Math.min(top.minOpacity, value);
      } else if (op === "cm") {
        const top = qStack[qStack.length - 1];
        const b = parseFloat(operands[1] ?? "0");
        const c = parseFloat(operands[2] ?? "0");
        if (top && (Math.abs(b) > 0.01 || Math.abs(c) > 0.01)) top.rotated = true;
      } else if (op === "BT" || op === "Do" || op === "sh" || op === "BI" || /^(f|F|f\*|B|B\*|b|b\*|S|s)$/.test(op)) {
        if (op === "Do" && watermarkDepth === 0) {
          const verdict = formVerdict(operands[0]);
          if (verdict) {
            const what = verdict.label ? `text "${verdict.label}"` : "image or graphic";
            instances.push(
              verdict.kind === "marked"
                ? {
                    sig: "f|marked",
                    kind: "marked",
                    label: "Watermark layer",
                    detail: "Saved as a watermark by the program that created this PDF, so it can be removed cleanly.",
                    start: cur.start,
                    end: cur.end,
                    formLevel: true,
                    formRef: verdict.ref,
                  }
                : {
                    sig: `f|${verdict.label || "graphic"}|${verdict.percent}`,
                    kind: "transparent",
                    label: `Semi-transparent ${what}`,
                    detail: `${verdict.percent}% opacity, added as a separate stamp layer. Check the preview before removing.`,
                    start: cur.start,
                    end: cur.end,
                    formLevel: true,
                    formRef: verdict.ref,
                  }
            );
          }
        }
        const top = qStack[qStack.length - 1];
        if (top) {
          top.painters += 1;
          if (op === "Do") top.hasDo = true;
        }
      } else if (op === "Q") {
        const frame = qStack.pop();
        if (!frame) continue;
        const parent = qStack[qStack.length - 1];
        if (parent) {
          parent.painters += frame.painters;
          parent.rotated = parent.rotated || frame.rotated;
          parent.hasDo = parent.hasDo || frame.hasDo;
        }
        const length = cur.end - ops[frame.index]!.start;
        if (
          watermarkDepth === 0 &&
          !frame.childCandidate &&
          frame.minOpacity !== undefined &&
          frame.minOpacity <= 0.95 &&
          frame.painters >= 1 &&
          frame.painters <= 3 &&
          length < 30000
        ) {
          if (parent) parent.childCandidate = true;
          const text = extractLabel(ops, frame.index, i);
          const percent = Math.round(frame.minOpacity * 100);
          const what = text ? `text "${text}"` : frame.hasDo ? "image or graphic" : "shape";
          instances.push({
            sig: `t|${text || (frame.hasDo ? "graphic" : "shape")}|${percent}`,
            kind: "transparent",
            label: `Semi-transparent ${what}`,
            detail: `${percent}% opacity${frame.rotated ? ", rotated" : ""}. Typical of a text or logo watermark. Check the preview before removing.`,
            start: ops[frame.index]!.start,
            end: cur.end,
          });
        }
      }
    }
  }

  // A form drawn inside an already-detected block is covered by that block.
  const contained = (inner: Instance) =>
    instances.some((other) => other !== inner && !other.formLevel && other.start <= inner.start && other.end >= inner.end);
  for (let i = instances.length - 1; i >= 0; i -= 1) {
    const inst = instances[i];
    if (inst && inst.formLevel && contained(inst)) instances.splice(i, 1);
  }

  // 3) Watermark / Stamp annotations.
  const annots = page.node.Annots();
  if (annots instanceof PDFArray) {
    for (let i = 0; i < annots.size(); i += 1) {
      const annot = annots.lookup(i);
      if (!(annot instanceof PDFDict)) continue;
      const subtype = annot.lookup(PDFName.of("Subtype"))?.toString();
      if (subtype === "/Watermark") annotationHits.push({ index: i, subtype: "Watermark" });
      else if (subtype === "/Stamp") annotationHits.push({ index: i, subtype: "Stamp" });
    }
  }

  return { source, instances, annotationHits };
}

async function loadDocument(file: File): Promise<{ lib: PdfLib; doc: PdfDoc }> {
  const lib = await import("pdf-lib");
  let bytes: ArrayBuffer;
  try {
    bytes = await file.arrayBuffer();
  } catch {
    throw new Error(`Couldn't read "${file.name}". Try selecting it again.`);
  }
  try {
    const doc = await lib.PDFDocument.load(bytes);
    return { lib, doc };
  } catch {
    throw new Error("This PDF couldn't be opened. It may be password-protected or damaged.");
  }
}

/* ------------------------------------------------------------------ */
/* Public API                                                          */
/* ------------------------------------------------------------------ */

/** Scans every page and returns the watermark-like objects found. */
export async function analyzeWatermarks(file: File): Promise<WatermarkAnalysis> {
  const { lib, doc } = await loadDocument(file);
  const pages = doc.getPages();
  const map = new Map<string, WatermarkCandidate>();

  pages.forEach((page, pageIndex) => {
    const scan = scanPage(lib, page);
    const add = (sig: string, kind: WatermarkKind, label: string, detail: string) => {
      const existing = map.get(sig);
      if (existing) {
        existing.instances += 1;
        if (!existing.pages.includes(pageIndex)) existing.pages.push(pageIndex);
      } else {
        map.set(sig, { id: sig, kind, label, detail, pages: [pageIndex], instances: 1 });
      }
    };
    for (const inst of scan.instances) add(inst.sig, inst.kind, inst.label, inst.detail);
    for (const hit of scan.annotationHits) {
      add(
        `a|${hit.subtype}`,
        "annotation",
        `${hit.subtype} annotation`,
        hit.subtype === "Watermark" ? "A watermark stored as a page annotation." : "A stamp (for example DRAFT or CONFIDENTIAL) stored as a page annotation."
      );
    }
  });

  const order: Record<WatermarkKind, number> = { marked: 0, annotation: 1, transparent: 2 };
  const candidates = [...map.values()].sort((a, b) => order[a.kind] - order[b.kind] || b.pages.length - a.pages.length);
  return { pageCount: pages.length, candidates };
}

function applyRemoval(lib: PdfLib, doc: PdfDoc, ids: Set<string>, pageFilter: Set<number> | null) {
  const { PDFName } = lib;
  let removed = 0;
  const removedForms = new Map<string, import("pdf-lib").PDFRef>();

  doc.getPages().forEach((page, pageIndex) => {
    if (pageFilter && !pageFilter.has(pageIndex)) return;
    const scan = scanPage(lib, page);

    for (const inst of scan.instances) {
      if (ids.has(inst.sig) && inst.formRef) removedForms.set(inst.formRef.toString(), inst.formRef);
    }

    const ranges = scan.instances
      .filter((inst) => ids.has(inst.sig))
      .map((inst) => [inst.start, inst.end] as const)
      .sort((a, b) => a[0] - b[0] || b[1] - a[1]);

    if (scan.source && ranges.length) {
      // Drop ranges nested inside an earlier (outer) range.
      const outer: (readonly [number, number])[] = [];
      for (const range of ranges) {
        const last = outer[outer.length - 1];
        if (last && range[0] >= last[0] && range[1] <= last[1]) continue;
        outer.push(range);
      }
      let cursor = 0;
      let result = "";
      for (const [start, end] of outer) {
        result += scan.source.slice(cursor, start) + "\n";
        cursor = end;
      }
      result += scan.source.slice(cursor);
      const stream = doc.context.flateStream(binaryToBytes(result));
      page.node.set(PDFName.of("Contents"), doc.context.register(stream));
      removed += outer.length;
    }

    const dropAnnots = new Set(scan.annotationHits.filter((hit) => ids.has(`a|${hit.subtype}`)).map((hit) => hit.index));
    if (dropAnnots.size) {
      const annots = page.node.Annots();
      if (annots) {
        const keep = annots.asArray().filter((_, index) => !dropAnnots.has(index));
        page.node.set(PDFName.of("Annots"), doc.context.obj(keep));
        removed += dropAnnots.size;
      }
    }
  });

  // Empty out removed stamp forms that no page draws any more, so the watermark
  // is not left behind as an unused object inside the saved file.
  if (removedForms.size) {
    const stillUsed = new Set<string>();
    for (const page of doc.getPages()) {
      const source = readContent(lib, page);
      const xobjects = page.node.Resources()?.lookupMaybe(PDFName.of("XObject"), lib.PDFDict);
      if (!source || !xobjects) continue;
      for (const { op, operands } of parseContent(source)) {
        if (op !== "Do" || !operands[0]) continue;
        const ref = xobjects.get(PDFName.of(nameOf(operands[0])));
        if (ref instanceof lib.PDFRef) stillUsed.add(ref.toString());
      }
    }
    for (const [key, ref] of removedForms) {
      if (stillUsed.has(key)) continue;
      const original = doc.context.lookup(ref);
      if (!(original instanceof lib.PDFStream)) continue;
      const empty = doc.context.flateStream(new Uint8Array(0), {
        Type: "XObject",
        Subtype: "Form",
        BBox: original.dict.get(PDFName.of("BBox")) ?? [0, 0, 1, 1],
      });
      doc.context.assign(ref, empty);
    }
  }

  return removed;
}

function toBlob(saved: Uint8Array): Blob {
  // Copy into a fresh, ArrayBuffer-backed view (TypeScript DOM typings).
  const bytes = new Uint8Array(saved.byteLength);
  bytes.set(saved);
  return new Blob([bytes.buffer], { type: "application/pdf" });
}

/**
 * Deletes the chosen watermark objects and returns the cleaned PDF.
 * `pageIndexes` limits the removal to specific pages (default: all pages).
 */
export async function removeDetectedWatermarks(file: File, ids: string[], pageIndexes?: number[]): Promise<Blob> {
  if (ids.length === 0) throw new Error("Select at least one detected watermark.");
  const { lib, doc } = await loadDocument(file);
  const removed = applyRemoval(lib, doc, new Set(ids), pageIndexes ? new Set(pageIndexes) : null);
  if (removed === 0) throw new Error("Nothing was removed. The selected watermark wasn't found on the chosen pages.");
  return toBlob(await doc.save());
}

/** Single-page PDF showing one page with the chosen watermarks removed (for previews). */
export async function previewWatermarkRemoval(file: File, ids: string[], pageIndex: number): Promise<Blob> {
  const { lib, doc } = await loadDocument(file);
  applyRemoval(lib, doc, new Set(ids), new Set([pageIndex]));
  const out = await lib.PDFDocument.create();
  const [copied] = await out.copyPages(doc, [pageIndex]);
  out.addPage(copied);
  return toBlob(await out.save());
}
