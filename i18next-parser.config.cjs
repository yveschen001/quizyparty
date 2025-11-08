const DEFAULT_LOCALE = 'zh-hant';

module.exports = {
  locales: ['zh-hant', 'en', 'ja', 'zh-hans'],
  defaultNamespace: 'common',
  // 掃描鍵但不輸出到檔案
  output: false,
  input: ['src/**/*.{astro,ts,tsx}'],
  keySeparator: '.',
  namespaceSeparator: ':',
  lexers: {
    ts: ['JavascriptLexer'],
    tsx: ['JsxLexer'],
    astro: ['HandlebarsLexer'],
  },
  createOldCatalogs: false,
  sort: true,
  defaultValue: (locale, _ns, _key) => (locale === DEFAULT_LOCALE ? '__MISSING__' : ''),
};
