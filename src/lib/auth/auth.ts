import { auth } from '@googleapis/oauth2';
// import { useRouter } from 'next/router';
import { CLIENT_ID, CLIENT_SECRET, REDIRECT_URL } from '../constants';
import { calendar } from '@googleapis/calendar';
import { drive } from '@googleapis/drive'
import { gmail } from '@googleapis/gmail'
import { sheets } from '@googleapis/sheets'
import { people } from '@googleapis/people'
import { forms } from '@googleapis/forms'

const oauth2Client = new auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URL
);

// export const redirectToAuthUrl = (url: string) => {
//     const router = useRouter();
//     router.push(url);
// }

/**
 * @description the refresh token is only returned on the first authorization, so we need to save it in the database
 * @see link https://github.com/googleapis/google-api-nodejs-client#oauth2-client - for more information about the API
 * @returns the url to the conset page to authenticate the user
 */
// export const getAuthUrl = (scopes: string[]) => {
//     const url = oauth2Client.generateAuthUrl({
//         access_type: 'offline',
//         scope: scopes,
//     });
//     redirectToAuthUrl(url);
//     return url;
// }

export const setAccessTokens = (code: string) => {
    oauth2Client.getToken(code, (err, tokens) => {
        if (err) {
            console.log('Error retrieving access token', err);
            return;
        }
        if (tokens) {
            oauth2Client.setCredentials(tokens);
            return tokens;
        }
    });
}

export const setTokens = (access_token: string, refresh_token: string) => {
    oauth2Client.setCredentials({
        access_token,
        refresh_token
    });
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
export const Form = forms({ version: "v1", auth: oauth2Client })
