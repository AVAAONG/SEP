export { default } from 'next-auth/middleware'

export const config = {
    /**
     * @description the session is only required for the routes that are not public
     * @see link https://codevoweb.com/setup-and-use-nextauth-in-nextjs-13-app-directory/ - for more information
    */
    matcher: ['/^\/api\/auth\/((?!session).)*$/'],
}