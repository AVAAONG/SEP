import { NextApiRequest, NextApiResponse } from 'next';

import { setAccessTokens } from '@/lib/auth/auth';

export async function GET(request: NextApiRequest, res: NextApiResponse) {
    const url = request.url;
    if (url === undefined) {
        res.status(400).send("Bad Request");
        return;
    }
    const { searchParams } = new URL(url);
    const code = searchParams.get('code');
    if (code) {
        setAccessTokens(code)
    }
    else {
        throw new Error("No code provided");
    }
}