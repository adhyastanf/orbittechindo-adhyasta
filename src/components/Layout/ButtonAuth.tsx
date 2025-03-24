'use client';

import { logoutAction } from '@/app/actions/logoutAction';
import { useAuthStore } from '@/stores/auth-store';
import { Button } from '../ui/button';

export default function ButtonAuth() {
  const { user } = useAuthStore();

  return (
    <>
      {user && (
        <section className='text-center flex items-center gap-4'>
          <p className='text-lg font-semibold'>Hi, {user ? user : 'User tidak ditemukan'}</p>
          <Button variant='destructive' onClick={() => logoutAction()}>
            Logout
          </Button>
        </section>
      )}
    </>
  );
}
