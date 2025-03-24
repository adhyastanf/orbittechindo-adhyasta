import { deleteCookie } from 'cookies-next/server';
import { NextRequest, NextResponse } from 'next/server';
import { fetchValidationKey } from './lib/services';

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('tmdb_api_key')?.value;

  if(req.nextUrl.pathname.startsWith('/auth')){
    return NextResponse.next(); 
  }

  try {
    await fetchValidationKey(token || '');
  } catch {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)', '/movie/:type/:id*', '/tv/:type/:id*'],
};
