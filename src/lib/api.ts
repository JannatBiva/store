export const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || process.env.API_BASE_URL || '';

const join = (base: string, path: string) => {
  const b = base.replace(/\/+$/, '');
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${b}${p}`;
};

export async function api<T>(
  path: string,
  opts: { method?: 'GET' | 'POST'; body?: unknown; headers?: Record<string, string> } = {}
): Promise<T> {
  const isAbsolute = /^https?:\/\//i.test(path);
  const url = isAbsolute ? path : join(API_BASE, path);

  const res = await fetch(url, {
    method: opts.method ?? 'GET',
    headers: { 'Content-Type': 'application/json', ...(opts.headers ?? {}) },
    ...(opts.body ? { body: JSON.stringify(opts.body) } : {}),
    // note: 'next: { revalidate }' is ignored on the client; harmless
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API ${res.status} ${res.statusText}: ${text}`);
  }
  return res.json() as Promise<T>;
}
