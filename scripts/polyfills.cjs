// Minimal polyfills for Node 18 to satisfy undici webidl checks used by i18next-parser
if (typeof globalThis.File === 'undefined') {
  globalThis.File = class {};
}
if (typeof globalThis.Blob === 'undefined') {
  globalThis.Blob = class {};
}
if (typeof globalThis.FormData === 'undefined') {
  globalThis.FormData = class {};
}


