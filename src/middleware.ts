import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'


export default withAuth(
    function middleware(req) {
        // console.log(req.nextauth);
        if (
            req.nextUrl.pathname === "/dashboard" &&
            req.nextauth.token?.role !== "ADMIN"
        ) {
            return new NextResponse("You are not authorized");
        }
    },
    {
        callbacks: {
            // if true will return the auth, if false will false and we know the user is not auth, if true the middleware will continue
            authorized: (params) => {
                let { token } = params;
                return !!token
            }
        }
    }
)
