/**
 * @file This file contains all the necesary options to set up the next-auth configuration object.
 * @module lib/auth/nextAuthOptions/authOptions
 * @author Kevin Bravo (kevinbravo.me)
 */
import { PagesOptions } from 'next-auth';
import { EmailUserConfig, OAuthUserConfig, } from 'next-auth/providers';
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
  signIn: '/signin/becario',
  error: '/signin/becario',
  newUser: '/becario/configuracion',
  verifyRequest: '/signin/becario/checkEmail',
};

/// ==================================== NEXT AUTH CONFIGURATION FOR USERS ==================================== ///

/**
 * @description Google USER Client ID
 * @summary Client ID for using the google user resources trough the Google API
 * @see https://developers.google.com/identity/oauth2/web/guides/get-google-api-clientid to get the client id
 */
export const GOOGLE_USER_API_CLIENT_ID = process.env.GOOGLE_USER_API_CLIENT_ID!;
/**
 * @description Google USER Client Secret
 * @summary Client Secret for using the google user resources trough the Google API
 * @see https://developers.google.com/identity/protocols/oauth2/web-server#creatingcred to get the client secret
 */
export const GOOGLE_USER_API_CLIENT_SECRET = process.env.GOOGLE_USER_API_CLIENT_SECRET!;

/**
 * @description NextAuth Google Provider Options object for USERS
 * @summary This provider allows users to sign in in the app using their google account.
 *
 * The difference between this provider and the google provider for admins is that this provider only request the user profile information,
 * whereas the google provider for admins request a lot of scopes to access the google apis.
 *
 * @see https://next-auth.js.org/configuration/providers/oauth to learn about the oauth 2.0 protocol
 *
 * @see https://next-auth.js.org/providers/google to learn about the google provider in nexth-auth
 * @see https://developers.google.com/identity/protocols/oauth2 to learn about the google oauth2 protocol
 * @see https://next-auth.js.org/configuration/providers/oauth#options to learn about the options for the oauth providers
 */
export const googleUserProviderConfig: OAuthUserConfig<any> = {
  // the id should match with the redirect url final path in the google console
  id: 'userGoogle',
  clientId: GOOGLE_USER_API_CLIENT_ID,
  clientSecret: GOOGLE_USER_API_CLIENT_SECRET,
  /// @see https://github.com/nextauthjs/next-auth/issues/519#issuecomment-1500498874 for more information
  allowDangerousEmailAccountLinking: true,

};

export const emailUserProviderConfig: EmailUserConfig = {
  type: 'email',
  server: {
    host: process.env.EMAIL_SERVER_HOST,
    port: Number(process.env.EMAIL_SERVER_PORT),
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  },
  from: process.env.EMAIL_FROM,
};
