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
