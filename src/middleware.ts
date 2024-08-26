/**
 * @file Middleware function to check if user is authenticated or not for admin routes and scholar routes
 * @author Kevin Bravo (kevinbravo.me)
 *
 * @summary This file export a middleware function to allow access to admin routes and scholar routes only if the user is authenticated.
 * @remarks When a request is made to a route that starts with /admin or /scholar the middleware function is called
 * and it checks if the user is authenticated or not,
 * if the user is authenticated then the request is allowed to continue to the route handler,
 * if the user is not authenticated then the request is redirected to the login page
 * @remarks depending on the rute that was used to make the request the user is redirected to the corresponding login page
 */

import { NextRequestWithAuth, withAuth } from 'next-auth/middleware';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';



export default async function wrapMiddlewareFunction(req: NextRequestWithAuth, res: Response) {
  let signinPath = '';
  if (req.nextUrl.pathname.startsWith('/becario')) {
    signinPath = 'becario';
  } else if (req.nextUrl.pathname.startsWith('/admin')) {
    signinPath = 'admin';

  }

  ///@ts-expect-error
  return withAuth(
    async (request: NextRequestWithAuth) => {
      const { token } = request.nextauth;
      const { pathname } = request.nextUrl;
      const host = headers().get('host');

      const isAdminRoute = pathname.startsWith('/admin');
      const isScholarRoute = pathname.startsWith('/becario');

      if (token?.kind_of_user === 'ADMIN' && isAdminRoute) {

        const response = await fetch(`http://${host}/admin/api/roles?adminId=${token.id}`);
        const { admin } = await response.json();
        const { chapter } = admin;
        const rr = NextResponse.next();

        rr.cookies.set({
          name: 'chapter',
          value: chapter.id,
          maxAge: 60 * 60 * 24 * 7, // 1 week
          path: '/',
        });
      }

      if (isScholarRoute && token?.kind_of_user !== 'SCHOLAR') {
        return NextResponse.rewrite(new URL('/accessDenied', request.url));
      }
      if (isAdminRoute && token?.kind_of_user !== 'ADMIN') {
        return NextResponse.rewrite(new URL('/accessDenied', request.url));
      }
      return NextResponse.next();
    },
    {
      pages: {
        signIn: `/signin/${signinPath}`,
      },
    }
  )(req);
}
/**
 * @description it export the config object to be used by the middleware function
 * @see https://nextjs.org/docs/pages/building-your-application/routing/middleware for more information
 */
export const config = {
  matcher: ['/admin/:path*', '/becario/:path*'],
};
