import { randomUUID } from "crypto";

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


export const NEXT_SECRET = process.env.NEXTAUTH_SECRET || randomUUID();

export const PAGES = {
  signIn: '/signin',
  error: '/signin',
  verifyRequest: '/signin/checkEmail',
  signOut: '/signin',
}

export const GOOGLE_PROVIDER_CONFIG = {
  id: 'userGoogle',
  clientId: GOOGLE_USER_API_CLIENT_ID,
  clientSecret: GOOGLE_USER_API_CLIENT_SECRET,
  /// @see https://github.com/nextauthjs/next-auth/issues/519#issuecomment-1500498874 for more information
  allowDangerousEmailAccountLinking: true,
}