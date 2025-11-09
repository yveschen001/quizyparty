export const SUPPORTED = ['en', 'zh-hant', 'zh-hans', 'ja'] as const;

export type Lang = (typeof SUPPORTED)[number];

const ALIASES: Record<string, Lang> = {
  zh_TW: 'zh-hant',
  'zh-tw': 'zh-hant',
  'zh-Hant': 'zh-hant',
  zh_Hant: 'zh-hant',
  zh_CN: 'zh-hans',
  'zh-cn': 'zh-hans',
  'zh-Hans': 'zh-hans',
  zh_Hans: 'zh-hans',
};

export const normalizeLang = (raw?: string): Lang | null => {
  if (!raw) return null;
  const trimmed = raw.trim();
  if ((SUPPORTED as readonly string[]).includes(trimmed)) {
    return trimmed as Lang;
  }
  if (ALIASES[trimmed]) {
    return ALIASES[trimmed];
  }
  return null;
};

