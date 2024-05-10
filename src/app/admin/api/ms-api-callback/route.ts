/**
 * @remarks Check if a cookie with the name fromWhereYouCome has been set,
 * if not, set it to the value of a query parameter called cookieValue.
 * If the cookie has already been set to the same value as cookieValue, the
 * If the cookie has been set to a different value, the function deletes the existing cookie and sets a new one with the value of cookieValue.
 * @param req The incoming request object.
 */
export async function GET(req: Request) {
    const url = new URL(req.url);
    console.log(url);
    return new Response('The code has been setted, close the tab', {
        status: 200,
    });
}
