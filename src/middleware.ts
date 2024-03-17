import * as process from 'process';

import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

// eslint-disable-next-line consistent-return
export async function middleware(req:NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET, raw: true });

  const { pathname } = req.nextUrl;

  if (/^(\/signin|\/signup|\/find-password|\/tos\/use|\/tos\/privacy)$/.test(pathname)) {
    if (token) {
      return NextResponse.redirect(new URL('/', req.url));
    }
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL('/signin', req.url));
  }
}

export const config = {
  matcher: [
    '/signin',
    '/signup',
    '/find-password',
    '/find-following',
    '/tos/privacy',
    '/tos/use',
    '/profile-image',
    '/',
    '/alarm',
    '/profile',
    '/search',
    '/setting',
    '/setting/profile-setting',
    '/setting/notification',
    '/setting/tos',
    '/setting/change-password',
    '/setting/remove-account',
  ],
};
