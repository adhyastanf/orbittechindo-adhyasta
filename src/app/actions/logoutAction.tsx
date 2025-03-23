'use server';

import { deleteCookie } from 'cookies-next';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export async function logoutAction() {
  await deleteCookie('tmdb_api_key', { cookies });
  redirect('/auth/login');
}
