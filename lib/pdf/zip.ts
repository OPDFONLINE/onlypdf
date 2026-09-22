/**
 * Minimal ZIP archive writer (store method, i.e. no compression).
 * PDFs are already compressed internally, so skipping DEFLATE costs almost
 * nothing in file size while keeping this dependency-free.
 */

const CRC_TABLE = buildCrcTable();

function buildCrcTable(): Uint32Array {
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    table[n] = c >>> 0;
  }
  return table;
}

function crc32(data: Uint8Array): number {
  let crc = 0xffffffff;
  for (let i = 0; i < data.length; i++) {
    const byte = data[i] ?? 0;
    const tableEntry = CRC_TABLE[(crc ^ byte) & 0xff] ?? 0;
    crc = tableEntry ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function dosDateTime(date: Date): { time: number; date: number } {
  const time =
    ((date.getHours() & 0x1f) << 11) |
    ((date.getMinutes() & 0x3f) << 5) |
    (Math.floor(date.getSeconds() / 2) & 0x1f);
  const dosDate =
    (((date.getFullYear() - 1980) & 0x7f) << 9) |
    (((date.getMonth() + 1) & 0xf) << 5) |
    (date.getDate() & 0x1f);
  return { time, date: dosDate };
}

class ByteWriter {
  private chunks: Uint8Array[] = [];
  private length = 0;

  push(bytes: Uint8Array) {
    this.chunks.push(bytes);
    this.length += bytes.length;
  }

  pushUint16(value: number) {
    const buf = new Uint8Array(2);
    new DataView(buf.buffer).setUint16(0, value, true);
    this.push(buf);
  }

  pushUint32(value: number) {
    const buf = new Uint8Array(4);
    new DataView(buf.buffer).setUint32(0, value, true);
    this.push(buf);
  }

  get currentLength() {
    return this.length;
  }

  toUint8Array(): Uint8Array {
    const out = new Uint8Array(this.length);
    let offset = 0;
    for (const chunk of this.chunks) {
      out.set(chunk, offset);
      offset += chunk.length;
    }
    return out;
  }
}

export type ZipEntry = { name: string; data: Uint8Array };

export function createZip(entries: ZipEntry[]): Uint8Array {
  const encoder = new TextEncoder();
  const { time, date } = dosDateTime(new Date());
  const body = new ByteWriter();
  const centralDirectory = new ByteWriter();

  for (const entry of entries) {
    const nameBytes = encoder.encode(entry.name);
    const crc = crc32(entry.data);
    const localHeaderOffset = body.currentLength;

    // Local file header
    body.pushUint32(0x04034b50);
    body.pushUint16(20); // version needed to extract
    body.pushUint16(0); // general purpose flags
    body.pushUint16(0); // compression method: store
    body.pushUint16(time);
    body.pushUint16(date);
    body.pushUint32(crc);
    body.pushUint32(entry.data.length); // compressed size
    body.pushUint32(entry.data.length); // uncompressed size
    body.pushUint16(nameBytes.length);
    body.pushUint16(0); // extra field length
    body.push(nameBytes);
    body.push(entry.data);

    // Matching central directory record
    centralDirectory.pushUint32(0x02014b50);
    centralDirectory.pushUint16(20); // version made by
    centralDirectory.pushUint16(20); // version needed to extract
    centralDirectory.pushUint16(0); // flags
    centralDirectory.pushUint16(0); // compression method
    centralDirectory.pushUint16(time);
    centralDirectory.pushUint16(date);
    centralDirectory.pushUint32(crc);
    centralDirectory.pushUint32(entry.data.length);
    centralDirectory.pushUint32(entry.data.length);
    centralDirectory.pushUint16(nameBytes.length);
    centralDirectory.pushUint16(0); // extra field length
    centralDirectory.pushUint16(0); // comment length
    centralDirectory.pushUint16(0); // disk number start
    centralDirectory.pushUint16(0); // internal attributes
    centralDirectory.pushUint32(0); // external attributes
    centralDirectory.pushUint32(localHeaderOffset);
    centralDirectory.push(nameBytes);
  }

  const centralDirOffset = body.currentLength;
  const centralDirBytes = centralDirectory.toUint8Array();
  body.push(centralDirBytes);

  // End of central directory record
  body.pushUint32(0x06054b50);
  body.pushUint16(0); // disk number
  body.pushUint16(0); // disk where central directory starts
  body.pushUint16(entries.length); // entries on this disk
  body.pushUint16(entries.length); // total entries
  body.pushUint32(centralDirBytes.length);
  body.pushUint32(centralDirOffset);
  body.pushUint16(0); // comment length

  return body.toUint8Array();
}
