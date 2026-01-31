import pako from "pako";

export function decodeGzipBase64(base64Data) {
  // 1. Base64 → Uint8Array
  const strData = atob(base64Data); 
  const charData = strData.split("").map(c => c.charCodeAt(0));
  const binData = new Uint8Array(charData);

  // 2. Ungzip
  const decompressed = pako.ungzip(binData, { to: "string" });

  // 3. JSON
  return JSON.parse(decompressed);
}

