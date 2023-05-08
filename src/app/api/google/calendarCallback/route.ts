import { CLIENT_ID, CLIENT_SECRET, REDIRECT_URL } from '@/lib/auth/auth';
import { auth } from '@googleapis/oauth2';
import { NextApiRequest, NextApiResponse } from 'next';

const oauth2Client = new auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URL
);

export async function GET(request: NextApiRequest, res: NextApiResponse) {
    const url = request.url;
    if (url === undefined) {
        res.status(400).send("Bad Request");
        return;
    }
    const { searchParams } = new URL(url);
    const code = searchParams.get('code');

    if (code) {
        oauth2Client.getToken(code, (err, tokens) => {
            if (err) {
                console.log('Error retrieving access token', err);
                return;
            }
            if (tokens) {
                oauth2Client.setCredentials(tokens);
                //aqui guardamos el token en la base de datos 
                //y redirigimos a la pagina de exito
                // res.redirect('/success');
            }
        });
    }
}