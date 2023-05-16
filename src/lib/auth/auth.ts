import { auth } from '@googleapis/oauth2';

export const CLIENT_ID = process.env.GOOGLE_API_CLIENT_ID;
export const CLIENT_SECRET = process.env.GOOGLE_API_CLIENT_SECRET;
export const REDIRECT_URL = "http://localhost:3000/api/google/calendarCallback";

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
        // 'online' (default) or 'offline' (gets refresh_token)
        access_type: 'offline',
        // If you only need one scope you can pass it as a string
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


