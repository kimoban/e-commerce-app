import ENV from '@config/env';

export async function forgotPassword(email: string): Promise<{ message: string }>
{
  const url = `${ENV.API_URL}/api/auth/password/forgot/`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  if (!res.ok) {
    let msg = 'Request failed';
    try {
      const data = await res.json();
      msg = data?.error || data?.message || msg;
    } catch {}
    throw new Error(msg);
  }
  return res.json();
}

export type Provider = 'google' | 'facebook';
export interface ExchangeResponse { token: string; user: { id: string; name: string; email: string; role?: 'admin' | 'user' } }

// Exchange a provider access token for our backend JWT
export async function exchangeProviderToken(provider: Provider, accessToken: string): Promise<ExchangeResponse> {
  const url = `${ENV.API_URL}/api/auth/${provider}/exchange/`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ access_token: accessToken }),
  });
  if (!res.ok) {
    let msg = 'Exchange failed';
    try {
      const data = await res.json();
      msg = data?.error || data?.message || msg;
    } catch {}
    throw new Error(msg);
  }
  return res.json();
}
