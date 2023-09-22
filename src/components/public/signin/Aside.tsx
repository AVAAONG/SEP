'use client';
import useSWR from 'swr';

/**
 * @file  This file renders the sign-in page for the admin role.
 * @remarks when the user is not signed in, this page will be rendered. Otherwise, the user will be redirected to the callback URL.
 * @remarks If the user signs in with an email not registered in the SEP as an admin, it would show an error message.
 * @author Kevin Bravo (kevinbravo.me)
 */

import Image from 'next/image';
import React from 'react';
const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface AsideProps {
  cookieValue: 'admin' | 'scholar';
}

/**
 * Renders the aside of the sign in page.
 * @param cookieValue - The value of the cookie to set.
 * @remarks This component is made a client component intentionally, so that the cookie is set in the client side.
 * This allow to add a different cookie value depending on the user role,
 * which is used to determine the oauth configuration to use.
 *
 */
const Aside: React.FC<AsideProps> = ({ cookieValue }) => {
  useSWR(`/api/setAuthCookie?cookieValue=${cookieValue}`, fetcher);

  return (
    <section className="flex items-center w-full px-4 mx-auto md:px-0 md:items-center md:w-1/3">
      <div className="flex flex-col items-center w-full max-w-sm py-4 mx-auto md:mx-0 my-auto min-w-min relative md:-left-2.5 pt-4 transform origin-left md:gap-44">
        <hr className="hidden md:block w-full h-px my-8  border-0 bg-emerald-700 opacity-75 rotate-90 -translate-x-36 " />
        <div className=" pt-8 md:p-0 flex items-center space-x-1 md:-translate-x-10 relative drop-shadow-[0_0_1rem_#279902]">
          <Image
            src="/logo-proexcelencia-cap.png"
            alt="Proexcelencia Logo"
            width={70}
            height={70}
          ></Image>
          <Image
            src="/logo-proexcelencia-words.png"
            alt="Proexcelencia Logo"
            width={200}
            height={100}
            className="animate-pulse"
          ></Image>
        </div>
        <hr className="hidden w-full overflow-hidden -z-10 md:block  h-px my-8  border-0 bg-emerald-700 opacity-75 rotate-90 -translate-x-36" />
      </div>
    </section>
  );
};

export default Aside;
