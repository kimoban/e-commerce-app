import ENV from '@config/env';
import { store } from '@store';
import { logout } from '@store/userSlice';

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
  const state: any = store.getState();
  const jwt: string | undefined | null = state?.user?.jwt;

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
    // Unauthorized: log out user and surface error
    try { store.dispatch(logout()); } catch {}
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
