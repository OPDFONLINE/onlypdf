"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { Eraser, Hand, Loader2, Pipette, Redo2, RotateCcw, Trash2, AlertTriangle, Undo2, ZoomIn, ZoomOut } from "lucide-react";
import type { PageThumbnail } from "@/lib/pdf/renderThumbnails";
import { renderPdfPage, type RenderedPage } from "@/lib/pdf/renderPage";
import { removeWatermarkAreas, type AreaJob, type WatermarkRect } from "@/lib/pdf/removeWatermark";
import { DEFAULT_SCOPE, resolveScope, safeResolveScope, type PageScope } from "@/lib/pdf/pageScope";
import { createRingSampler, hexToRgb, rgbToHex, samplePoint, type Rgb } from "@/lib/pdf/sampleColor";
import { PageNav } from "./PageNav";
import { ScopeSelect } from "./ScopeSelect";
import { downloadBlob } from "./download";

type Area = { id: string; rect: WatermarkRect; scope: PageScope; drawnOn: number };
type Corner = "nw" | "ne" | "sw" | "se";
type Fill = "auto" | "white" | "custom";

type Drag =
  | { kind: "create"; id: string; start: { x: number; y: number }; snapshot: Area[]; changed: boolean }
  | { kind: "move"; id: string; start: { x: number; y: number }; origin: WatermarkRect; snapshot: Area[]; changed: boolean }
  | { kind: "resize"; id: string; corner: Corner; origin: WatermarkRect; snapshot: Area[]; changed: boolean };

const clamp = (v: number) => Math.max(0, Math.min(1, v));
const MIN_SIZE = 0.008;
const ZOOMS = [1, 1.5, 2, 3];
const HANDLES: { corner: Corner; className: string; cursor: string }[] = [
  { corner: "nw", className: "-left-3.5 -top-3.5", cursor: "cursor-nwse-resize" },
  { corner: "ne", className: "-right-3.5 -top-3.5", cursor: "cursor-nesw-resize" },
  { corner: "sw", className: "-bottom-3.5 -left-3.5", cursor: "cursor-nesw-resize" },
  { corner: "se", className: "-bottom-3.5 -right-3.5", cursor: "cursor-nwse-resize" },
];

let counter = 0;
const newId = () => `area-${Date.now().toString(36)}-${counter++}`;
const css = ({ r, g, b }: Rgb) => `rgb(${r}, ${g}, ${b})`;

export function AreaPanel({
  file,
  pages,
  onStart,
  onDone,
}: {
  file: File;
  pages: PageThumbnail[];
  onStart: () => void;
  onDone: () => void;
}) {
  const pageCount = pages.length;
  const [pageIndex, setPageIndex] = useState(0);
  const [image, setImage] = useState<RenderedPage | null>(null);
  const [areas, setAreas] = useState<Area[]>([]);
  const [past, setPast] = useState<Area[][]>([]);
  const [future, setFuture] = useState<Area[][]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [mode, setMode] = useState<"draw" | "pan">("draw");
  const [fill, setFill] = useState<Fill>("auto");
  const [customColor, setCustomColor] = useState("#ffffff");
  const [picking, setPicking] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [colors, setColors] = useState<Record<string, Rgb>>({});
  const [working, setWorking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const previewRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<Drag | null>(null);
  const areasRef = useRef<Area[]>(areas);
  areasRef.current = areas;

  /* ---------------------------- page image ---------------------------- */
  useEffect(() => {
    let cancelled = false;
    setImage(null);
    renderPdfPage(file, pageIndex)
      .then((img) => !cancelled && setImage(img))
      .catch((err) => !cancelled && setError(err instanceof Error ? err.message : "Couldn't preview this page."));
    return () => {
      cancelled = true;
    };
  }, [file, pageIndex]);

  const visible = areas.filter((a) => safeResolveScope(a.scope, a.drawnOn, pageCount).includes(pageIndex));

  /* -------------------- colours for the result preview ------------------- */
  useEffect(() => {
    if (!showResult || !image) return;
    let cancelled = false;
    (async () => {
      const next: Record<string, Rgb> = {};
      if (fill === "auto") {
        const sample = await createRingSampler(image.dataUrl);
        for (const a of visible) next[a.id] = sample(a.rect);
      } else {
        const c = fill === "white" ? { r: 255, g: 255, b: 255 } : hexToRgb(customColor);
        for (const a of visible) next[a.id] = c;
      }
      if (!cancelled) setColors(next);
    })().catch(() => undefined);
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showResult, image, fill, customColor, areas, pageIndex]);

  /* ------------------------------ history ------------------------------- */
  function pushHistory(snapshot: Area[]) {
    setPast((p) => [...p.slice(-49), snapshot]);
    setFuture([]);
  }
  function commit(next: Area[]) {
    pushHistory(areasRef.current);
    setAreas(next);
  }
  function undo() {
    if (past.length === 0) return;
    const prev = past[past.length - 1];
    if (!prev) return;
    setPast(past.slice(0, -1));
    setFuture((f) => [areasRef.current, ...f]);
    setAreas(prev);
  }
  function redo() {
    if (future.length === 0) return;
    const [next, ...rest] = future;
    if (!next) return;
    setFuture(rest);
    setPast((p) => [...p, areasRef.current]);
    setAreas(next);
  }
  function removeArea(id: string) {
    commit(areasRef.current.filter((a) => a.id !== id));
    if (selectedId === id) setSelectedId(null);
  }
  function clearAll() {
    if (areasRef.current.length === 0) return;
    commit([]);
    setSelectedId(null);
  }

  /* ------------------------------ pointer ------------------------------- */
  function point(event: PointerEvent) {
    const box = previewRef.current?.getBoundingClientRect();
    if (!box || box.width === 0 || box.height === 0) return null;
    return { x: clamp((event.clientX - box.left) / box.width), y: clamp((event.clientY - box.top) / box.height) };
  }

  async function pickColor(p: { x: number; y: number }) {
    if (!image) return;
    try {
      setCustomColor(rgbToHex(await samplePoint(image.dataUrl, p.x, p.y)));
      setFill("custom");
    } finally {
      setPicking(false);
    }
  }

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    if (mode !== "draw" || !image) return;
    const p = point(event);
    if (!p) return;
    if (picking) {
      void pickColor(p);
      return;
    }
    const target = event.target as HTMLElement;
    const handle = target.closest<HTMLElement>("[data-handle]")?.dataset.handle as Corner | undefined;
    const areaId = target.closest<HTMLElement>("[data-area]")?.dataset.area;
    const snapshot = areasRef.current;
    event.currentTarget.setPointerCapture(event.pointerId);

    if (areaId) {
      const area = snapshot.find((a) => a.id === areaId);
      if (!area) return;
      setSelectedId(areaId);
      dragRef.current = handle
        ? { kind: "resize", id: areaId, corner: handle, origin: area.rect, snapshot, changed: false }
        : { kind: "move", id: areaId, start: p, origin: area.rect, snapshot, changed: false };
      return;
    }

    const id = newId();
    setAreas((current) => [...current, { id, rect: { x: p.x, y: p.y, width: 0, height: 0 }, scope: { ...DEFAULT_SCOPE }, drawnOn: pageIndex }]);
    setSelectedId(id);
    dragRef.current = { kind: "create", id, start: p, snapshot, changed: false };
  }

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    const drag = dragRef.current;
    if (!drag) return;
    const p = point(event);
    if (!p) return;
    drag.changed = true;

    const update = (rect: WatermarkRect) =>
      setAreas((current) => current.map((a) => (a.id === drag.id ? { ...a, rect } : a)));

    if (drag.kind === "create") {
      update({ x: Math.min(drag.start.x, p.x), y: Math.min(drag.start.y, p.y), width: Math.abs(p.x - drag.start.x), height: Math.abs(p.y - drag.start.y) });
    } else if (drag.kind === "move") {
      const { origin } = drag;
      update({
        ...origin,
        x: Math.max(0, Math.min(1 - origin.width, origin.x + (p.x - drag.start.x))),
        y: Math.max(0, Math.min(1 - origin.height, origin.y + (p.y - drag.start.y))),
      });
    } else {
      const { origin, corner } = drag;
      // The corner opposite the dragged one stays fixed.
      const ax = corner === "nw" || corner === "sw" ? origin.x + origin.width : origin.x;
      const ay = corner === "nw" || corner === "ne" ? origin.y + origin.height : origin.y;
      update({ x: Math.min(ax, p.x), y: Math.min(ay, p.y), width: Math.abs(p.x - ax), height: Math.abs(p.y - ay) });
    }
  }

  function onPointerUp(event: PointerEvent<HTMLDivElement>) {
    const drag = dragRef.current;
    dragRef.current = null;
    try {
      event.currentTarget.releasePointerCapture(event.pointerId);
    } catch {
      // Already released.
    }
    if (!drag) return;

    if (drag.kind === "create") {
      const created = areasRef.current.find((a) => a.id === drag.id);
      if (!created || created.rect.width < MIN_SIZE || created.rect.height < MIN_SIZE) {
        setAreas((current) => current.filter((a) => a.id !== drag.id));
        setSelectedId(null);
        return;
      }
    }
    if (drag.changed) pushHistory(drag.snapshot);
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const mod = event.metaKey || event.ctrlKey;
    if (mod && event.key.toLowerCase() === "z") {
      event.preventDefault();
      if (event.shiftKey) redo();
      else undo();
    } else if (mod && event.key.toLowerCase() === "y") {
      event.preventDefault();
      redo();
    } else if ((event.key === "Delete" || event.key === "Backspace") && selectedId) {
      event.preventDefault();
      removeArea(selectedId);
    }
  }

  /* ------------------------------ process ------------------------------- */
  async function process() {
    setError(null);
    if (areas.length === 0) {
      setError("Draw at least one area over the watermark first.");
      return;
    }
    onStart();
    setWorking(true);
    try {
      const samplers = new Map<number, (rect: WatermarkRect) => Rgb>();
      const jobs: AreaJob[] = [];
      for (const area of areas) {
        for (const index of resolveScope(area.scope, area.drawnOn, pageCount)) {
          let color: Rgb;
          if (fill === "white") color = { r: 255, g: 255, b: 255 };
          else if (fill === "custom") color = hexToRgb(customColor);
          else {
            let sampler = samplers.get(index);
            if (!sampler) {
              const thumb = pages[index];
              sampler = thumb ? await createRingSampler(thumb.dataUrl) : () => ({ r: 255, g: 255, b: 255 });
              samplers.set(index, sampler);
            }
            color = sampler(area.rect);
          }
          jobs.push({ pageIndex: index, rect: area.rect, color });
        }
      }
      const blob = await removeWatermarkAreas(file, jobs);
      downloadBlob(blob, file.name.replace(/\.pdf$/i, "") + "-cleaned.pdf");
      onDone();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't clean the selected areas.");
    } finally {
      setWorking(false);
    }
  }

  const iconBtn = "inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface text-ink-muted transition-colors hover:border-teal hover:text-teal disabled:pointer-events-none disabled:opacity-40";

  return (
    <div className="mt-5">
      <div className="flex items-start gap-3 rounded-2xl bg-amber-soft p-4 text-sm text-ink-muted">
        <AlertTriangle size={18} className="mt-0.5 shrink-0 text-amber" aria-hidden="true" />
        <p>
          Manual mode <strong className="font-semibold text-ink">covers</strong> the areas you draw. It does not delete what is underneath, so hidden text
          can still be found in the file. Use it for watermarks baked into the page, and <strong className="font-semibold text-ink">never to hide sensitive information</strong>.
        </p>
      </div>

      <div className="mt-4 rounded-card border border-border bg-surface p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <PageNav current={pageIndex} pageCount={pageCount} onChange={setPageIndex} />
          <div className="flex flex-wrap items-center gap-2">
            <button type="button" className={iconBtn} onClick={undo} disabled={past.length === 0} aria-label="Undo" title="Undo (Ctrl+Z)"><Undo2 size={16} /></button>
            <button type="button" className={iconBtn} onClick={redo} disabled={future.length === 0} aria-label="Redo" title="Redo (Ctrl+Shift+Z)"><Redo2 size={16} /></button>
            <button type="button" className={iconBtn} onClick={() => setZoom(ZOOMS[Math.max(0, ZOOMS.indexOf(zoom) - 1)] ?? 1)} disabled={zoom === ZOOMS[0]} aria-label="Zoom out"><ZoomOut size={16} /></button>
            <span className="w-10 text-center text-xs font-semibold text-ink-muted">{Math.round(zoom * 100)}%</span>
            <button type="button" className={iconBtn} onClick={() => setZoom(ZOOMS[Math.min(ZOOMS.length - 1, ZOOMS.indexOf(zoom) + 1)] ?? 1)} disabled={zoom === ZOOMS[ZOOMS.length - 1]} aria-label="Zoom in"><ZoomIn size={16} /></button>
            {zoom > 1 && (
              <button
                type="button"
                onClick={() => setMode(mode === "draw" ? "pan" : "draw")}
                aria-pressed={mode === "pan"}
                className={`inline-flex h-9 items-center gap-1.5 rounded-lg border px-3 text-xs font-semibold ${mode === "pan" ? "border-teal bg-teal text-white" : "border-border bg-surface text-ink-muted"}`}
              >
                <Hand size={14} /> {mode === "pan" ? "Panning" : "Pan"}
              </button>
            )}
          </div>
        </div>

        <p className="mt-3 text-xs text-ink-muted">
          {picking ? "Click the page to pick a colour." : "Drag on the page to draw a box. Drag a box to move it, or drag its corners to resize. Delete removes the selected box."}
        </p>

        <div
          tabIndex={0}
          onKeyDown={onKeyDown}
          className="mt-3 max-h-[70vh] overflow-auto rounded-xl border border-border bg-paper focus:outline-none focus-visible:ring-2 focus-visible:ring-teal"
        >
          <div
            ref={previewRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            style={{ width: `${zoom * 100}%`, touchAction: mode === "draw" ? "none" : "auto" }}
            className={`relative mx-auto select-none bg-white ${picking ? "cursor-crosshair" : mode === "draw" ? "cursor-crosshair" : "cursor-grab"}`}
          >
            {image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={image.dataUrl} alt={`PDF page ${pageIndex + 1}`} className="pointer-events-none block h-auto w-full" draggable={false} />
            ) : (
              <div className="flex min-h-[360px] items-center justify-center text-sm text-ink-muted"><Loader2 size={16} className="mr-2 animate-spin" /> Preparing preview…</div>
            )}

            {image &&
              visible.map((a) => {
                const selected = a.id === selectedId;
                const solid = showResult && colors[a.id];
                return (
                  <div
                    key={a.id}
                    data-area={a.id}
                    style={{
                      left: `${a.rect.x * 100}%`,
                      top: `${a.rect.y * 100}%`,
                      width: `${a.rect.width * 100}%`,
                      height: `${a.rect.height * 100}%`,
                      backgroundColor: solid ? css(colors[a.id] ?? { r: 255, g: 255, b: 255 }) : undefined,
                    }}
                    className={`absolute cursor-move border-2 ${selected ? "border-solid border-teal" : "border-dashed border-teal/70"} ${solid ? "" : "bg-teal/20"}`}
                  >
                    {selected &&
                      HANDLES.map((h) => (
                        <span key={h.corner} data-handle={h.corner} className={`absolute flex h-7 w-7 items-center justify-center ${h.className} ${h.cursor}`}>
                          <span className="h-2.5 w-2.5 rounded-full border-2 border-teal bg-white" />
                        </span>
                      ))}
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-surface p-4">
          <p className="text-xs font-semibold text-ink-muted">Cover colour</p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            {([
              ["auto", "Match background"],
              ["white", "White"],
              ["custom", "Custom"],
            ] as [Fill, string][]).map(([key, label]) => (
              <button
                key={key}
                type="button"
                aria-pressed={fill === key}
                onClick={() => setFill(key)}
                className={`rounded-pill border px-3 py-1.5 text-xs font-semibold ${fill === key ? "border-teal bg-teal text-white" : "border-border bg-surface text-ink-muted hover:border-teal"}`}
              >
                {label}
              </button>
            ))}
            {fill === "custom" && (
              <input type="color" value={customColor} onChange={(e) => setCustomColor(e.target.value)} aria-label="Custom cover colour" className="h-8 w-10 cursor-pointer rounded border border-border bg-surface" />
            )}
            <button
              type="button"
              onClick={() => { setMode("draw"); setPicking((v) => !v); }}
              aria-pressed={picking}
              className={`inline-flex items-center gap-1.5 rounded-pill border px-3 py-1.5 text-xs font-semibold ${picking ? "border-teal bg-teal text-white" : "border-border bg-surface text-ink-muted hover:border-teal"}`}
            >
              <Pipette size={13} /> Pick from page
            </button>
          </div>
          <p className="mt-2 text-xs text-ink-soft">“Match background” samples the colour around each box, so the cover blends into tinted pages.</p>
          <label className="mt-3 flex items-center gap-2 text-sm text-ink">
            <input type="checkbox" checked={showResult} onChange={(e) => setShowResult(e.target.checked)} />
            Preview the cover on this page
          </label>
        </div>

        <div className="rounded-xl border border-border bg-surface p-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-ink-muted">Areas ({areas.length})</p>
            {areas.length > 0 && (
              <button type="button" onClick={clearAll} className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink-muted hover:text-ink">
                <RotateCcw size={13} /> Clear all
              </button>
            )}
          </div>
          {areas.length === 0 ? (
            <p className="mt-3 text-sm text-ink-muted">No areas yet. Draw a box over the watermark to start.</p>
          ) : (
            <ul className="mt-3 max-h-60 space-y-2 overflow-auto">
              {areas.map((a, i) => (
                <li
                  key={a.id}
                  onClick={() => { setSelectedId(a.id); setPageIndex(a.drawnOn); }}
                  className={`flex flex-wrap items-center gap-2 rounded-lg border p-2 ${a.id === selectedId ? "border-teal bg-teal-soft/50" : "border-border"}`}
                >
                  <span className="text-xs font-semibold text-ink">Area {i + 1}</span>
                  <span className="text-[11px] text-ink-soft">drawn on page {a.drawnOn + 1}</span>
                  <div className="ml-auto flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                    <ScopeSelect
                      id={`scope-${a.id}`}
                      value={a.scope}
                      pageCount={pageCount}
                      onChange={(scope) => commit(areasRef.current.map((x) => (x.id === a.id ? { ...x, scope } : x)))}
                    />
                    <button type="button" onClick={() => removeArea(a.id)} aria-label={`Delete area ${i + 1}`} className="rounded-lg p-1.5 text-ink-soft hover:bg-coral-soft hover:text-coral">
                      <Trash2 size={15} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <button
        type="button"
        disabled={areas.length === 0 || working}
        onClick={process}
        className={`mt-5 inline-flex items-center gap-2 rounded-pill px-5 py-2.5 text-sm font-semibold text-white ${areas.length > 0 && !working ? "bg-teal hover:opacity-90" : "cursor-not-allowed bg-ink-soft"}`}
      >
        {working ? <Loader2 size={16} className="animate-spin" /> : <Eraser size={16} />}
        {working ? "Working…" : "Cover areas and download"}
      </button>

      {error && (
        <p role="alert" className="mt-4 flex items-start gap-2 rounded-xl bg-coral-soft px-4 py-3 text-sm text-coral">
          <AlertTriangle size={16} className="mt-0.5 shrink-0" aria-hidden="true" /> {error}
        </p>
      )}
    </div>
  );
}
