import { auth, calendar } from '@googleapis/calendar';
import { CLIENT_ID, CLIENT_SECRET, GOOGLE_API_REFRESH_TOKEN, REDIRECT_URL } from '../constants';

if (!GOOGLE_API_REFRESH_TOKEN) {
  throw Error('Google api refresh token not found');
}

const oauth2Client = new auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);

/**
 * @description
 * @param access_token the access token of the user who is logged in
 * @param refresh_token the refresh token of the user who is logged in
 * @see https://github.com/googleapis/google-api-nodejs-client#retrieve-access-token for more information
 */
export const setTokens = async () => {
  oauth2Client.setCredentials({
    refresh_token: GOOGLE_API_REFRESH_TOKEN,
  });
  try {
    const { credentials } = await oauth2Client.refreshAccessToken();
  } catch (err) {
    console.log('An error occurred while trying to refresh the access token: ', err);
  }
};

/**
 * ---------------------------------------- Google API Services ----------------------------------------
 *
 * @description the services are created with the credentials of the user who is logged in
 * @see link
 */
export const Calendar = calendar({ version: 'v3', auth: oauth2Client });