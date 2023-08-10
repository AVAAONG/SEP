import { auth } from '@googleapis/oauth2';
import { calendar } from '@googleapis/calendar';
import { drive } from '@googleapis/drive';
import { gmail } from '@googleapis/gmail';
import { sheets } from '@googleapis/sheets';
import { people } from '@googleapis/people';
import { forms } from '@googleapis/forms';

import { CLIENT_ID, CLIENT_SECRET, REDIRECT_URL } from '../constants';

const oauth2Client = new auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);

/**
 * @description
 * @param access_token the access token of the user who is logged in
 * @param refresh_token the refresh token of the user who is logged in
 * @see https://github.com/googleapis/google-api-nodejs-client#retrieve-access-token for more information
 */
export const setTokens = (access_token: string, refresh_token: string) => {
  oauth2Client.setCredentials({
    access_token,
    refresh_token,
  });
};

/**
 * ---------------------------------------- Google API Services ----------------------------------------
 *
 * @description the services are created with the credentials of the user who is logged in
 * @see link
 */
export const Calendar = calendar({ version: 'v3', auth: oauth2Client });
export const Drive = drive({ version: 'v3', auth: oauth2Client });
export const Gmail = gmail({ version: 'v1', auth: oauth2Client });
export const Sheets = sheets({ version: 'v4', auth: oauth2Client });
export const People = people({ version: 'v1', auth: oauth2Client });
export const Form = forms({ version: 'v1', auth: oauth2Client });