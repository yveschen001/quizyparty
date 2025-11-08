/* global window, document, XMLHttpRequest, console */

;(function(global) {
  'use strict'

  var DEFAULT_LANG = 'zh-hant'
  var FALLBACK_LANG = 'en'
  var cache = {}

  function createFlatMap(source) {
    var result = {}
    function walk(obj, prefix) {
      if (!obj || typeof obj !== 'object') return
      var keys = Object.keys(obj)
      for (var i = 0; i < keys.length; i += 1) {
        var key = keys[i]
        var value = obj[key]
        var path = prefix ? prefix + '.' + key : key
        if (value && typeof value === 'object' && !Array.isArray(value)) {
          result[path] = value
          walk(value, path)
        } else {
          result[path] = value
        }
      }
    }
    walk(source, '')
    return result
  }

  function loadLocale(lang) {
    if (cache[lang]) return cache[lang]

    if (typeof XMLHttpRequest === 'undefined') {
      cache[lang] = {}
      return cache[lang]
    }

    var request = new XMLHttpRequest()
    try {
      request.open('GET', '/i18n/' + lang + '.json', false)
      request.send(null)
      if (request.status >= 200 && request.status < 300) {
        try {
          var data = JSON.parse(request.responseText)
          cache[lang] = createFlatMap(data)
          return cache[lang]
        } catch (parseError) {
          if (typeof console !== 'undefined' && console.warn) {
            console.warn('[i18n] Failed to parse locale file for', lang, parseError)
          }
        }
      } else if (typeof console !== 'undefined' && console.warn) {
        console.warn('[i18n] Failed to load locale file for', lang, 'status:', request.status)
      }
    } catch (networkError) {
      if (typeof console !== 'undefined' && console.warn) {
        console.warn('[i18n] Locale request failed for', lang, networkError)
      }
    }

    cache[lang] = {}
    return cache[lang]
  }

  function getDocumentLang() {
    if (typeof document === 'undefined' || !document.documentElement) return null
    return document.documentElement.getAttribute('lang')
  }

  function normaliseLang(raw) {
    if (!raw) return DEFAULT_LANG
    var lower = raw.toLowerCase()
    if (lower === 'zh-hant' || lower === 'zh-hans') return lower
    return lower
  }

  function getActiveLang() {
    var docLang = normaliseLang(getDocumentLang())
    if (!docLang) docLang = DEFAULT_LANG
    if (!cache[docLang]) loadLocale(docLang)
    if (cache[docLang] && Object.keys(cache[docLang]).length) return docLang
    return FALLBACK_LANG
  }

  function translate(key) {
    if (!key) return ''
    var lang = getActiveLang()
    var texts = cache[lang] || loadLocale(lang)
    var value = texts[key]

    if (value === undefined && lang !== FALLBACK_LANG) {
      var fallbackTexts = cache[FALLBACK_LANG] || loadLocale(FALLBACK_LANG)
      value = fallbackTexts[key]
    }

    if (value === undefined) {
      if (typeof console !== 'undefined' && console.warn) {
        console.warn('[i18n] Missing translation key:', key, 'lang:', lang)
      }
      return key
    }

    return value
  }

  loadLocale(FALLBACK_LANG)
  loadLocale(DEFAULT_LANG)

  if (global && typeof global === 'object') {
    global.t = translate
  }
})(typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : this))
