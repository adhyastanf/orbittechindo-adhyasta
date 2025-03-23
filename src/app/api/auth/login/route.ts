import { NextResponse } from 'next/server';

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (email === 'opal@gmail.com' && password === 'password') {
    const user = {
      email,
      name: 'Opal',
    };
    const response = NextResponse.json({ message: 'Login successful', user, token: TMDB_API_KEY }, { status: 200 });

    return response;
  }

  return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
}
