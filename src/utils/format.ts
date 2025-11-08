export function formatNumber(value: number, lang: string): string {
  try {
    return new Intl.NumberFormat(lang).format(value ?? 0);
  } catch {
    return String(value ?? 0);
  }
}

export function formatPercent(value: number, lang: string, digits = 1): string {
  const safe = isFinite(value) ? value : 0;
  try {
    return new Intl.NumberFormat(lang, { style: 'percent', minimumFractionDigits: digits, maximumFractionDigits: digits }).format(safe);
  } catch {
    return `${Math.round(safe * 1000) / 10}%`;
  }
}

export function formatDate(value: number | Date | string, lang: string, options?: Intl.DateTimeFormatOptions): string {
  const date = typeof value === 'number' || typeof value === 'string' ? new Date(value) : value;
  if (!date || !date.getTime || !date.getTime()) return '';
  const opts: Intl.DateTimeFormatOptions = options || { year: 'numeric', month: 'short', day: 'numeric' };
  try {
    return new Intl.DateTimeFormat(lang, opts).format(date as Date);
  } catch {
    return (date as Date).toLocaleString();
  }
}


