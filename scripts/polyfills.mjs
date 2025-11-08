// Minimal polyfills for Node 18 to satisfy undici webidl checks used by i18next-parser
if (typeof globalThis.File === 'undefined') {
  // @ts-ignore
  globalThis.File = class {};
}
if (typeof globalThis.Blob === 'undefined') {
  // @ts-ignore
  globalThis.Blob = class {};
}
if (typeof globalThis.FormData === 'undefined') {
  // @ts-ignore
  globalThis.FormData = class {};
}


