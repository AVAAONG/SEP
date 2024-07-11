import { cookies } from 'next/headers';
/**
 * @remarks Check if a cookie with the name chapter has been set,
 * if not, set it to the value of a query parameter called cookieValue.
 * If the cookie has already been set to the same value as cookieValue, the
 * If the cookie has been set to a different value, the function deletes the existing cookie and sets a new one with the value of cookieValue.
 * @param req The incoming request object.
 */
export async function GET(req: Request) {
    const url = new URL(req.url);
    const cookieValue = url.searchParams.get('cookieValue');
    const cookieStore = cookies();
    const hasTheCookie = cookieStore.get('chapter')?.value;
    if (hasTheCookie === undefined) {
        return new Response('fine', {
            status: 200,
            headers: { 'Set-Cookie': `chapter=${cookieValue}; Path=/` },
        });
    } else if (hasTheCookie === cookieValue) {
        return new Response('The cookie is correctly setted', {
            status: 200,
        });
    } else if (hasTheCookie !== cookieValue) {
        cookieStore.delete('chapter');
        return new Response('The new cookie has been setted', {
            status: 200,
            headers: { 'Set-Cookie': `chapter=${cookieValue}; Path=/` },
        });
    }
}
