export function toPublicUrl(path) {
  const raw = String(path || '');
  if (!raw) return raw;
  if (/^https?:\/\//i.test(raw)) return raw;

  const base = import.meta.env.BASE_URL || '/';
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  const cleanPath = raw.startsWith('/') ? raw.slice(1) : raw;
  return `${cleanBase}${cleanPath}`;
}

