'use server';

import { fetchRegister } from '@/lib/services';


type RegisterData = {
  name: string;
  email: string;
  password: string;
};

export async function registerAction(body: RegisterData) {
  const { name, email, password } = body;
  try {
    await fetchRegister(name, email, password);
    return { success: true };
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      return { success: false, message: error?.response?.data?.message || 'Registration failed' };
    }
    return { success: false, message: 'An unknown error occurred' };
  }
}

function isAxiosError(error: unknown): error is { response: { data?: { message?: string } } } {
  return typeof error === 'object' && error !== null && 'response' in error;
}