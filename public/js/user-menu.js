const INTERFACE_LANGS = ['en', 'zh-hant', 'zh-hans', 'ja']

function readInterfacePreference(defaultLang) {
  const stored = window.localStorage.getItem('qp_interface_lang')
  if (stored && INTERFACE_LANGS.indexOf(stored) >= 0) return stored
  return defaultLang
}

function writeInterfacePreference(value) {
  window.localStorage.setItem('qp_interface_lang', value)
}

function readRoomLangPreference(defaultLang) {
  try {
    const stored = window.localStorage.getItem('qp_room_langs')
    if (stored) {
      const parsed = JSON.parse(stored)
      const normalized = Array.isArray(parsed)
        ? parsed
            .map(function (item) {
              return String(item)
            })
            .filter(function (code) {
              return INTERFACE_LANGS.indexOf(code) >= 0
            })
        : []
      if (normalized.length) return normalized
    }
  } catch (e) {
    console.warn('[user-menu] failed to parse room language preference', e)
  }
  return [defaultLang]
}

function writeRoomLangPreference(values) {
  const unique = Array.from(
    new Set(
      values.filter(function (code) {
        return INTERFACE_LANGS.indexOf(code) >= 0
      }),
    ),
  )
  window.localStorage.setItem('qp_room_langs', JSON.stringify(unique))
  return unique
}

function computeRedirectPath(targetLang) {
  const url = new URL(window.location.href)
  const segments = url.pathname.split('/').filter(Boolean)
  if (segments.length === 0) {
    segments.push(targetLang)
  } else {
    segments[0] = targetLang
  }
  return '/' + segments.join('/') + url.search + url.hash
}

function buildLanguageOptions(t) {
  return {
    en: t('languages.en'),
    'zh-hant': t('languages.zhHant'),
    'zh-hans': t('languages.zhHans'),
    ja: t('languages.ja'),
  }
}

function formatQuota(t, remaining, max, key) {
  return t(key).replace('{remaining}', String(remaining)).replace('{max}', String(max))
}

export function getSupportedInterfaceLanguages() {
  return INTERFACE_LANGS.slice()
}

export function getLanguageOptions(t) {
  return buildLanguageOptions(t)
}

export function getStoredInterfaceLanguage(defaultLang) {
  return readInterfacePreference(defaultLang)
}

export function setStoredInterfaceLanguage(value) {
  writeInterfacePreference(value)
}

export function getStoredRoomLanguages(defaultLang) {
  return readRoomLangPreference(defaultLang)
}

export function setStoredRoomLanguages(values) {
  return writeRoomLangPreference(values)
}

export function setupUserMenu(config) {
  const { lang, t, profileUrl, joinedUrl, aboutUrl, privacyUrl, termsUrl, onLogout } = config || {}

  const root = document.getElementById('user-info')
  if (!root) return null

  const trigger = root.querySelector('[data-role="menu-trigger"]')
  const panel = root.querySelector('[data-role="menu-panel"]')
  const avatar = root.querySelector('[data-role="avatar"]')
  const nameLabel = root.querySelector('[data-role="name"]')
  if (!trigger || !panel) return null

  let currentLang = lang
  let menuOpen = false
  let userMenuRendered = false
  let outsideListener = null
  let escapeListener = null
  let currentUser = null

  function closeMenu() {
    if (!menuOpen) return
    panel.style.display = 'none'
    trigger.setAttribute('aria-expanded', 'false')
    menuOpen = false
    if (outsideListener) {
      document.removeEventListener('click', outsideListener, true)
      outsideListener = null
    }
    if (escapeListener) {
      document.removeEventListener('keydown', escapeListener, true)
      escapeListener = null
    }
  }

  function handleOutsideClick(event) {
    if (!root.contains(event.target)) {
      closeMenu()
    }
  }

  function handleEscape(event) {
    if (event.key === 'Escape') {
      closeMenu()
    }
  }

  function openMenu() {
    if (menuOpen) return
    if (!userMenuRendered) renderMenu()
    panel.style.display = 'grid'
    trigger.setAttribute('aria-expanded', 'true')
    menuOpen = true
    outsideListener = handleOutsideClick
    escapeListener = handleEscape
    document.addEventListener('click', outsideListener, true)
    document.addEventListener('keydown', escapeListener, true)
  }

  function toggleMenu() {
    if (menuOpen) {
      closeMenu()
    } else {
      openMenu()
    }
  }

  function renderMenu() {
    const current = currentLang || 'en'
    const aboutHref = typeof aboutUrl === 'function' ? aboutUrl(current) : aboutUrl || '#'
    const privacyHref =
      typeof privacyUrl === 'function' ? privacyUrl(current) : '/' + current + '/legal/privacy'
    const termsHref =
      typeof termsUrl === 'function' ? termsUrl(current) : '/' + current + '/legal/terms'
    const profileHref =
      typeof profileUrl === 'function' ? profileUrl(current) : '/' + current + '/profile'
    const joinedHref =
      typeof joinedUrl === 'function' ? joinedUrl(current) : '/' + current + '/rooms/joined'

    var html = ''
    html += '<div style="display:grid;gap:12px">'
    html +=
      '<div style="display:grid;gap:8px;font-size:0.8rem;opacity:0.75" data-role="quota-container"></div>'
    html += '<div style="display:grid;gap:6px">'
    html +=
      '<a data-role="profile-link" href="' +
      profileHref +
      '" class="btn" style="justify-content:flex-start">' +
      t('nav.menu.profile') +
      '</a>'
    html +=
      '<a data-role="myrooms-link" href="/' +
      current +
      '/my-rooms" class="btn" style="justify-content:flex-start">' +
      t('nav.menu.myRooms') +
      '</a>'
    html +=
      '<a data-role="joined-link" href="' +
      joinedHref +
      '" class="btn" style="justify-content:flex-start">' +
      t('profile.sections.participations') +
      '</a>'
    html +=
      '<a data-role="about-link" href="' +
      aboutHref +
      '" class="btn" style="justify-content:flex-start">' +
      t('nav.about') +
      '</a>'
    html +=
      '<a data-role="privacy-link" href="' +
      privacyHref +
      '" target="_blank" rel="noopener" class="btn" style="justify-content:flex-start">' +
      t('nav.menu.privacy') +
      '</a>'
    html +=
      '<a data-role="terms-link" href="' +
      termsHref +
      '" target="_blank" rel="noopener" class="btn" style="justify-content:flex-start">' +
      t('nav.menu.terms') +
      '</a>'
    html +=
      '<button data-action="logout" class="btn" style="justify-content:flex-start">' +
      t('nav.menu.logout') +
      '</button>'
    html += '</div>'
    html += '</div>'
    panel.innerHTML = html

    const logoutBtn = panel.querySelector('[data-action="logout"]')
    if (logoutBtn) {
      logoutBtn.addEventListener('click', async function (event) {
        event.preventDefault()
        if (typeof onLogout === 'function') {
          await onLogout()
        }
        closeMenu()
      })
    }

    userMenuRendered = true
  }

  trigger.addEventListener('click', function () {
    if (!currentUser) return
    toggleMenu()
  })

  return {
    applyUser(user) {
      currentUser = user
      root.style.display = 'flex'
      closeMenu()
      userMenuRendered = false
      const fallbackAlt = typeof t === 'function' ? t('nav.menu.profile') : 'User'
      if (avatar) {
        if (user && user.avatar) {
          avatar.src = user.avatar
          avatar.alt = user.name || user.email || fallbackAlt
        } else {
          avatar.src =
            'https://www.gravatar.com/avatar/' +
            encodeURIComponent(user && user.email ? user.email : '') +
            '?d=identicon'
          avatar.alt = user && (user.name || user.email) ? user.name || user.email : fallbackAlt
        }
      }
      if (nameLabel) {
        nameLabel.textContent = user && (user.name || user.email) ? user.name || user.email : ''
      }
    },
    clearUser() {
      currentUser = null
      root.style.display = 'none'
      closeMenu()
    },
    updateLanguage(newLang) {
      currentLang = newLang
      userMenuRendered = false
    },
    setQuota(quota) {
      const container = panel.querySelector('[data-role="quota-container"]')
      if (!container) return
      if (!quota) {
        container.innerHTML = ''
        return
      }
      const parts = []
      if (quota.generate) {
        parts.push(
          formatQuota(
            t,
            quota.generate.remaining,
            quota.generate.max,
            'createRoom.ai.generateQuota',
          ),
        )
      }
      if (quota.improve) {
        parts.push(
          formatQuota(t, quota.improve.remaining, quota.improve.max, 'createRoom.ai.optimizeQuota'),
        )
      }
      container.innerHTML = parts
        .map(function (text) {
          return '<div>' + text + '</div>'
        })
        .join('')
    },
    getRoomLanguages() {
      return readRoomLangPreference(currentLang)
    },
    getInterfaceLanguage() {
      return readInterfacePreference(currentLang)
    },
  }
}
