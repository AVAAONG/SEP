import { auth } from '@googleapis/oauth2';
import { useRouter } from 'next/router';

import { CLIENT_ID, CLIENT_SECRET, REDIRECT_URL } from '../constants';
import { calendar } from '@googleapis/calendar';
import { drive } from '@googleapis/drive'
import { gmail } from '@googleapis/gmail'
import { sheets } from '@googleapis/sheets'
import { people } from '@googleapis/people'


const oauth2Client = new auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URL
);

/**
 * @description the refresh token is only returned on the first authorization, so we need to save it in the database
 * @see link https://github.com/googleapis/google-api-nodejs-client#oauth2-client - for more information about the API
 * @returns the url to the conset page to authenticate the user
 */
export const getAuthUrl = (scopes: string[]) => {
    const url = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes,
    });
    return url;
}

// el usuario da click en un Boton
// este boton activa la function getAuthUrl
// esta funcion genera un url

// el usuario es redireccionado a la pagina de google
// el usuario acepta los permisos
// el usuario es redireccionado a la pagina de exito
// en la pagina de exito se obtiene el codigo
// se obtiene el token

// se guarda el token en la base de datos
// se redirecciona a la pagina de exito
// en la pagina de exito se obtiene el token de la base de datos


export const redirectToAuthUrl = (url: string) => {
    const router = useRouter();
    router.push(url);
}

export const getAccessToken = async (code: string) => {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    return tokens;
}




/**
 * ---------------------------------------- Google API Services ----------------------------------------
 * 
 * @description the services are created with the credentials of the user who is logged in
 * @see link 
 */
export const Calendar = calendar({ version: "v3", auth: oauth2Client })
export const Drive = drive({ version: "v3", auth: oauth2Client })
export const Gmail = gmail({ version: "v1", auth: oauth2Client })
export const Sheets = sheets({ version: "v4", auth: oauth2Client })
export const People = people({ version: "v1", auth: oauth2Client })
