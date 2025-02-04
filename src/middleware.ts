import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

interface Token {
  role?: string;
}

const ACCESS_DENIED_PATH = '/accessDenied';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET }) as Token | null;

  // Redirect to /signin if no token is present
  if (!token && pathname !== '/signin') {
    return NextResponse.redirect(new URL('/signin', req.url));
  }

  // Protect routes
  if (pathname.startsWith('/admin')) {
    if (!token || token.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/signin', req.url));
    }
  }
  if (pathname.startsWith('/becario')) {
    if (!token || (token.role !== 'SCHOLAR')) {
      return NextResponse.redirect(new URL('/signin', req.url));
    }
  }
  if (pathname.startsWith('/captacion/postulacion')) {
    if (!token || (token.role !== 'APPLICANT')) {
      return NextResponse.redirect(new URL(ACCESS_DENIED_PATH, req.url));
    }
  }

  // Handle post-authentication redirects
  if (pathname === '/signin') {
    if (token) {
      if (token.role === 'ADMIN') {
        return NextResponse.redirect(new URL('/admin/panel', req.url));
      }
      else if (token.role === 'SCHOLAR') {
        return NextResponse.redirect(new URL('/becario/panel', req.url));
      }
      else if (token.role === 'APPLICANT') {
        return NextResponse.redirect(new URL('/captacion/postulacion', req.url));
      }
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/becario/:path*', '/signin', '/captacion/postulacion/:path*'],
};
