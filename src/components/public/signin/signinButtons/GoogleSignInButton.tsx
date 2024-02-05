/**
 * @file This file renders a button that allows user to sign in with Google.
 * @author Kevin Bravo (kevinbravo.me)
 */

'use client';
import handler from '@/lib/serverAction';
import { Button } from '@nextui-org/react';
import { signIn } from 'next-auth/react';
import { toast } from 'react-toastify';

interface GoogleSignInButtonProps {
  providerId: string;
  callbackUrl: string;
  cookieValue: 'admin' | 'SCHOLAR';
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
    <Button
      onClick={async () =>
        toast.promise(handleSignIn(), {
          pending: 'Realizando analisis de seguridad.',
          success: 'Analisis de seguridad completado.',
          error: 'Ocurrio un error',
        })
      }
      className="bg-primary-dark transition-colors text-white font-semibold py-2 px-4 rounded-md w-full flex justify-center gap-4"
      startContent={
        <svg
          viewBox="0 0 32 32"
          data-name="Layer 1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          fill="#000000"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g id="SVGRepo_tracerCarrier" strokeLinecap="round" stroke-linejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <path
              d="M23.75,16A7.7446,7.7446,0,0,1,8.7177,18.6259L4.2849,22.1721A13.244,13.244,0,0,0,29.25,16"
              fill="#00ac47"
            ></path>
            <path
              d="M23.75,16a7.7387,7.7387,0,0,1-3.2516,6.2987l4.3824,3.5059A13.2042,13.2042,0,0,0,29.25,16"
              fill="#4285f4"
            ></path>
            <path
              d="M8.25,16a7.698,7.698,0,0,1,.4677-2.6259L4.2849,9.8279a13.177,13.177,0,0,0,0,12.3442l4.4328-3.5462A7.698,7.698,0,0,1,8.25,16Z"
              fill="#ffba00"
            ></path>
            <polygon
              fill="#2ab2db"
              points="8.718 13.374 8.718 13.374 8.718 13.374 8.718 13.374"
            ></polygon>
            <path
              d="M16,8.25a7.699,7.699,0,0,1,4.558,1.4958l4.06-3.7893A13.2152,13.2152,0,0,0,4.2849,9.8279l4.4328,3.5462A7.756,7.756,0,0,1,16,8.25Z"
              fill="#ea4435"
            ></path>
            <polygon
              fill="#2ab2db"
              points="8.718 18.626 8.718 18.626 8.718 18.626 8.718 18.626"
            ></polygon>
            <path d="M29.25,15v1L27,19.5H16.5V14H28.25A1,1,0,0,1,29.25,15Z" fill="#4285f4"></path>
          </g>
        </svg>
      }
    >
      Entrar con Google
    </Button>
  );
};

export default GoogleSignInButton;
