import ENV from '@config/env';

// Hooks configured by the app after the store is created to avoid circular deps
let getToken: (() => string | null | undefined) | null = null;
let onUnauthorized: (() => void) | null = null;

export function setAuthHooks(opts: { getToken: () => string | null | undefined; onUnauthorized: () => void }) {
  getToken = opts.getToken;
  onUnauthorized = opts.onUnauthorized;
}

function shouldAttachAuth(url: string) {
  try {
    // Only attach auth to our API origin
    const api = new URL(ENV.API_URL);
    const target = new URL(url, ENV.API_URL);
    return api.origin === target.origin;
  } catch {
    return false;
  }
}

export async function apiFetch(input: RequestInfo | URL, init: RequestInit = {}): Promise<Response> {
  const jwt: string | undefined | null = getToken ? getToken() : null;

  let urlStr: string;
  if (typeof input === 'string') urlStr = input;
  else if (input instanceof URL) urlStr = input.toString();
  else urlStr = (input as Request).url;

  const headers = new Headers(init.headers || {});
  if (jwt && shouldAttachAuth(urlStr)) {
    headers.set('Authorization', `Bearer ${jwt}`);
  }

  const response = await fetch(urlStr, { ...init, headers });
  if (response.status === 401) {
    // Unauthorized: trigger handler and surface error
    try { onUnauthorized && onUnauthorized(); } catch {}
    throw new Error('Unauthorized');
  }
  return response;
}

export async function apiFetchJson<T = any>(input: RequestInfo | URL, init: RequestInit = {}): Promise<T> {
  const res = await apiFetch(input, init);
  if (!res.ok) {
    let msg = `HTTP ${res.status}`;
    try { const data = await res.json(); msg = data?.error || data?.message || msg; } catch {}
    throw new Error(msg);
  }
  return res.json() as Promise<T>;
}
