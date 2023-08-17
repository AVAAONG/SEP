/**
 * @file This file contains all the necesary options to set up the next-auth configuration object.
 * @module lib/auth/nextAuthOptions/authOptions
 * @author Kevin Bravo (kevinbravo.me)
 */
import { PagesOptions } from 'next-auth';
import { OAuthUserConfig } from 'next-auth/providers';
import shortUUID from 'short-uuid';

export const NEXT_SECRET = process.env.NEXTAUTH_SECRET || shortUUID.generate();

/**
 * @description NextAuth pages
 * @summary By default, NextAuth.js will render a generic page for handilg sign in, sign out, email verification and displating error messages.
 * You can override these pages by creating a page object with the path to your custom page in where the user can signIn or signUp.
 * @see https://next-auth.js.org/configuration/pages
 *
 */
export const PAGES: Partial<PagesOptions> = {
  signIn: '/signin/admin',
  error: '/signin/admin',
};
/// ==================================== NEXT AUTH CONFIGURATION FOR ADMINS ==================================== ///

/**
 * @description Google ADMIN Client ID
 * @summary Client ID for using the google user resources trough the Google API
 * @see https://developers.google.com/identity/oauth2/web/guides/get-google-api-clientid to get the client id
 */
export const GOOGLE_ADMIN_API_CLIENT_ID = process.env.GOOGLE_ADMIN_API_CLIENT_ID!;
/**
 * @description Google ADMIN Client Secret
 * @summary Client Secret for using the google user resources trough the Google API
 * @see https://developers.google.com/identity/protocols/oauth2/web-server#creatingcred to get the client secret
 */
export const GOOGLE_ADMIN_API_CLIENT_SECRET = process.env.GOOGLE_ADMIN_API_CLIENT_SECRET!;

/**
 * @description Google ADMIN Scopes
 * @summary Scopes for using the google user resources trough the Google API
 * @see https://developers.google.com/identity/protocols/oauth2/scopes
 */
export const GOOGLE_ADMIN_SCOPES = [
  'https://www.googleapis.com/auth/calendar',
  'https://www.googleapis.com/auth/contacts',
  'https://mail.google.com/',
  'https://www.googleapis.com/auth/drive',
  'https://www.googleapis.com/auth/spreadsheets',
  'https://www.googleapis.com/auth/forms',
  'https://www.googleapis.com/auth/userinfo.profile',
  'https://www.googleapis.com/auth/userinfo.email',
];

/**
 * @description NextAuth Google Provider Options object for ADMINS
 * @summary This provider allows admin to sign in in the app using their google account.
 *
 * @remarks It is important to notice that this provider is only for admin users, so it is not available for the public,
 * cause have a lot of googke scopes that are not necesary for the public.
 * @see https://next-auth.js.org/configuration/providers/oauth to learn about the oauth 2.0 protocol
 *
 * @internal Notice we are setting "access_type:"offline" this allow to return a refresh token,
 * that would allow the application obtain a new access token if it is about to expire
 * @see {@link https://github.com/googleapis/google-api-nodejs-client#handling-refresh-tokens}
 *
 * @see https://next-auth.js.org/providers/google to learn about the google provider in nexth-auth
 * @see https://developers.google.com/identity/protocols/oauth2 to learn about the google oauth2 protocol
 */
export const googleAdminProviderConfig: OAuthUserConfig<any> = {
  id: 'adminGoogle',
  clientId: GOOGLE_ADMIN_API_CLIENT_ID,
  clientSecret: GOOGLE_ADMIN_API_CLIENT_SECRET,
  authorization: {
    params: {
      access_type: 'offline',
      include_granted_scopes: true,
      scope: GOOGLE_ADMIN_SCOPES.join(' '),
    },
  },
};
