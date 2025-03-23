import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className='flex min-h-screen justify-center items-center'>
      <div className='bg-white rounded-lg w-96'>{children}</div>;
    </div>
  );
}
