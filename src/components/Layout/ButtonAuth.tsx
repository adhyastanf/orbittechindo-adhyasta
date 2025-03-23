'use client';

import { logoutAction } from '@/app/actions/logoutAction';
import { useAuthStore } from '@/stores/auth-store';
import { Button } from '../ui/button';

export default function ButtonAuth() {
  const { user, token } = useAuthStore();

  return (
    <section className='text-center flex items-center gap-4'>
      {token && (
        <div>
          <p className='text-lg font-semibold'>Hi, {user ? user : 'User tidak ditemukan'}</p>
          <Button variant='destructive' onClick={() => logoutAction()}>
            Logout
          </Button>
        </div>
      )}
    </section>
  );
}
