import { calendar } from '@googleapis/calendar';
import { drive } from '@googleapis/drive';
import { forms } from '@googleapis/forms';
import { gmail } from '@googleapis/gmail';
import { auth } from '@googleapis/oauth2';
import { people } from '@googleapis/people';
import { sheets } from '@googleapis/sheets';

import { getServerSession } from 'next-auth';
import authAdminOptions from '../auth/nextAuthAdminOptions/authAdminOptions';
import { CLIENT_ID, CLIENT_SECRET, REDIRECT_URL } from '../constants';

const oauth2Client = new auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);

/**
 * @description
 * @param access_token the access token of the user who is logged in
 * @param refresh_token the refresh token of the user who is logged in
 * @see https://github.com/googleapis/google-api-nodejs-client#retrieve-access-token for more information
 */
export const setTokens = async () => {
  const session = await getServerSession(authAdminOptions);
  if (!session?.user?.refreshToken) {
    console.log('No refresh token found in user session');
    return;
  }

  oauth2Client.setCredentials({
    refresh_token: session.user.refreshToken,
  });

  try {
    const { credentials } = await oauth2Client.refreshAccessToken();
    // oauth2Client.setCredentials({
    //   access_token: credentials.access_token,
    // });
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
export const Drive = drive({ version: 'v3', auth: oauth2Client });
export const Gmail = gmail({ version: 'v1', auth: oauth2Client });
export const Sheets = sheets({ version: 'v4', auth: oauth2Client });
export const People = people({ version: 'v1', auth: oauth2Client });
export const Form = forms({ version: 'v1', auth: oauth2Client });
