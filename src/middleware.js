import { jwtDecrypt } from 'jose';
import { NextResponse } from 'next/server';
import { decode as base64Decode } from 'base64-arraybuffer';

const PROTECTED_PATHS = ['/learning', '/labs'];

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('token')?.value;

  const isProtected = PROTECTED_PATHS.some(path => pathname.startsWith(path));

  if (!isProtected) {
    return NextResponse.next();
  }

  if (!token) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = '/login';
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  try {
      const secret = new Uint8Array(base64Decode(process.env.JWT_SECRET));
      const { payload } = await jwtDecrypt(token, secret);

    // Optionally, you can check the payload for specific claims
    if (payload.exp * 1000 < Date.now()) {
      throw new Error('Token expired');
    }

    // If the token is valid, continue to the requested page
    return NextResponse.next();
  } catch (error) {
    console.error('JWT verification failed:', error);
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = '/login';
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }
}
