'use server';

import { fetchLogin } from '@/lib/services';
import { setCookie } from 'cookies-next/server';
import { cookies } from 'next/headers';

type LoginData = {
  email: string;
  password: string;
};

export async function loginAction(body: LoginData) {
  const { email, password } = body;
  try {
    const res = await fetchLogin(email, password);
    const { user, token, message } = res;

    await setCookie('tmdb_api_key', token, { cookies });

    return { success: true, user, token, message };
  } catch (error : unknown) {
    if (isAxiosError(error)) {
      return { success: false, message: error?.response?.data?.message || 'Login failed' };
    }
    return { success: false, message: 'An unknown error occurred' };
  }
}

function isAxiosError(error: unknown): error is { response: { data?: { message?: string } } } {
  return typeof error === 'object' && error !== null && 'response' in error;
}