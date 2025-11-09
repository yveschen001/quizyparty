;(function (w) {
  if (w.__i18nCompat) return;
  var SEP = '.';
  function normLang(input) {
    if (!input) return 'en';
    var s = String(input).toLowerCase().replace('_','-');
    if (s === 'zh' || s === 'zh-cn' || s === 'zh-hans') return 'zh-hans';
    if (s === 'zh-tw' || s === 'zh-hant' || s === 'zh_hant' || s === 'zh-hk' || s === 'zh-mo') return 'zh-hant';
    return s;
  }
  function get(obj, path) {
    try {
      return String(path).split(SEP).reduce(function (o, k) { return (o && o[k] != null) ? o[k] : undefined }, obj);
    } catch (_) { return undefined }
  }
  function isHit(val, key) {
    if (val == null) return false;
    if (val === key) return false;
    if (typeof val === 'string' && val.indexOf('🚧 ') === 0) return false;
    return true;
  }
  var origT = typeof w.t === 'function' ? w.t : function (k) { return k };
  function tryVariants(baseKey) {
    var out;
    var list = [baseKey];
    if (baseKey.indexOf('common.') === 0) {
      list.push(baseKey.slice('common.'.length));
      var parts = baseKey.split('.');
      if (parts[0] === 'common' && parts.length > 1) list.push(parts.slice(1).join('.'));
    }
    for (var i=0;i<list.length;i+=1) {
      try {
        out = origT(list[i]);
        if (isHit(out, list[i])) return out;
      } catch(_) {}
    }
    return null;
  }
  function tCompat(key, fallback) {
    var v = tryVariants(key);
    if (isHit(v, key)) return v;
    if (fallback) {
      var fv = tryVariants(fallback);
      if (isHit(fv, fallback)) return fv;
    }
    return origT(key, fallback);
  }
  w.__origT = origT;
  w.t = tCompat;
  w.__i18nCompat = { normLang: normLang, get: get };
})(window);


