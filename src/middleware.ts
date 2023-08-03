/**
 * @file Middleware function to check if user is authenticated or not for admin routes and scholar routes 
 * @author Kevin Bravo (kevinbravo.me)
 * 
 * @summary This file export a middleware function to allow access to admin routes and scholar routes only if the user is authenticated, 
 * when a request is made to a route that starts with /admin or /scholar the middleware function is called 
 * and it checks if the user is authenticated or not,
 * if the user is authenticated then the request is allowed to continue to the route handler, 
 * if the user is not authenticated then the request is redirected to the login page.
 * 
 */

import { withAuth, NextRequestWithAuth } from "next-auth/middleware"

export default function wrapMiddlewareFunction(req) {
    let coockieValue = ""
    if (req.nextUrl.pathname.startsWith("/becario")) {
        coockieValue = "becario"
    }
    else if (req.nextUrl.pathname.startsWith("/admin")) {
        coockieValue = "admin"
    }
    console.log('coockieValue', coockieValue)
    return withAuth({
        pages: {
            signIn: `/signin/${coockieValue}`
        }
    })(req);
}

6
/**
 * @description it export the config object to be used by the middleware function 
 * @see https://nextjs.org/docs/pages/building-your-application/routing/middleware for more information
 */
export const config = {
    matcher: ['/admin/:path*', '/becario/:path*']
}
