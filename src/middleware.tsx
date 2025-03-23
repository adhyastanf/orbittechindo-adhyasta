import { NextResponse, NextRequest } from 'next/server';
import { getCookie } from 'cookies-next/server';
import { fetchValidationKey } from './lib/services';
import { deleteCookie } from 'cookies-next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const token = await getCookie('tmdb_api_key', { res, req });

  const isAuthRoute = req.nextUrl.pathname.startsWith('/auth');

  if (isAuthRoute) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  try {
    await fetchValidationKey(token);
  } catch {
    deleteCookie('tmdb_api_key', { req });
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)', '/', '/movie/:type/:id*', '/tv/:type/:id*'],
};
