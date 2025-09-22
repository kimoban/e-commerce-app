import ENV from '@config/env';
import { apiFetchJson } from './http';

export async function forgotPassword(email: string): Promise<{ message: string }>
{
  const url = `${ENV.API_URL}/api/auth/password/forgot/`;
  return apiFetchJson(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
}

export type Provider = 'google' | 'facebook';
export interface ExchangeResponse { token: string; user: { id: string; name: string; email: string; role?: 'admin' | 'user' } }

// Exchange a provider access token for our backend JWT
export async function exchangeProviderToken(provider: Provider, accessToken: string): Promise<ExchangeResponse> {
  const url = `${ENV.API_URL}/api/auth/${provider}/exchange/`;
  return apiFetchJson(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ access_token: accessToken }),
  });
}
