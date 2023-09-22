/**
 * @file This file renders a button that allows user to sign in with Google.
 * @author Kevin Bravo (kevinbravo.me)
 */

'use client';
import handler from '@/lib/serverAction';
import { signIn } from 'next-auth/react';

interface GoogleSignInButtonProps {
  providerId: string;
  callbackUrl: string;
  cookieValue: 'admin' | 'scholar';
}

/**
 *  Renders a button that allows user to sign in with Google.
 * @param param0 - The props of the component.
 * @param param0.providerId - The provider ID of the auth provider to use.
 * @param param0.callbackUrl - The URL to redirect to after a successful sign in or sign up.
 * @param param0.cookieValue - The value of the cookie to set.
 * @remarks This component can be used to sign in with Google in by any user.
 * Depending on the props, the user will be redirected to the callback URL with a cookie value.
 * The cookie value is used to determine the role of the user, depending on the role, the user will use a different oauth configuration,
 * and the callback URL is used to redirect the user to the correct page.
 * @returns A button that allows user to sign in with Google.
 */
const GoogleSignInButton = ({ providerId, callbackUrl, cookieValue }: GoogleSignInButtonProps) => {
  const handleSignIn = async () => {
    await handler(cookieValue);
    return signIn(providerId, { callbackUrl });
  };

  return (
    <button
      onClick={() => handleSignIn()}
      role="button"
      className="bg-primary-light hover:bg-primary-dark transition-colors text-white font-semibold py-2 px-4 rounded-md w-full flex justify-center gap-4"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Gmail"
        role="img"
        viewBox="0 0 512 512"
        fill="#000000"
        width={25}
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
          <rect width="512" height="512" rx="15%" fill="#ffffff"></rect>
          <path d="M158 391v-142l-82-63V361q0 30 30 30" fill="#4285f4"></path>
          <path d="M 154 248l102 77l102-77v-98l-102 77l-102-77" fill="#ea4335"></path>
          <path d="M354 391v-142l82-63V361q0 30-30 30" fill="#34a853"></path>
          <path d="M76 188l82 63v-98l-30-23c-27-21-52 0-52 26" fill="#c5221f"></path>
          <path d="M436 188l-82 63v-98l30-23c27-21 52 0 52 26" fill="#fbbc04"></path>
        </g>
      </svg>
      Entrar con Google
    </button>
  );
};

export default GoogleSignInButton;
