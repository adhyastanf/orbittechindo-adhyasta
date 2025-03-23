'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SearchBar from '../Movies/SearchBar';
import ButtonAuth from './ButtonAuth';

export default function Navbar() {
  const pathname = usePathname();
  const hideNavbar = pathname.startsWith('/auth');

  if (hideNavbar) return null;

  return (
    <div className=' px-8 right-0 left-0'>
      <div className='flex items-center justify-between mx-auto max-w-6xl h-16'>
        <div className='flex items-center gap-4'>
          <Link href='/' className='font-bold '>
            Movie Review
          </Link>
          <SearchBar />
        </div>
        <div>
          <ButtonAuth />
        </div>
      </div>
    </div>
  );
}
