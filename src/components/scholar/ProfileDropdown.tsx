'use client';
import defailProfilePic from '@/../public/defaultProfilePic.png';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import { useState } from 'react';
interface ProfileDropdownProps {
  name: string | null | undefined;
  email: string | null | undefined;
  image: string | null | undefined;
}

const ProfileDropdown = (props: ProfileDropdownProps) => {
  const [isDrowpdownProfileOpen, setDropdownProfile] = useState(false);
  const toggleDropdownProfile = () => setDropdownProfile(!isDrowpdownProfileOpen);

  const { name, email, image } = props;

  return (
    <>
      <button
        onClick={toggleDropdownProfile}
        type="button"
        className="flex text-sm bg-gray-800 rounded-full  hover:ring-2 focus:ring-green-300 dark:hover:ring-green-600"
      >
        <span className="sr-only">Abrir menu de usuario</span>
        <Image
          className="w-11 h-11 rounded-full border border-green-800"
          src={image === '/' ? image : defailProfilePic}
          alt="user photo"
          width={50}
          height={50}
        />
      </button>
      <div
        className={`${
          isDrowpdownProfileOpen
            ? 'absolute  transform translate-x-40 md:translate-x-48  lg:translate-x-52 translate-y-[128px]'
            : 'hidden'
        } z-50 my-4 w-56 text-base list-none bg-white  divide-y divide-gray-100 shadow dark:bg-slate-900 dark:divide-gray-600 rounded-xl`}
      >
        <div className="py-3 px-4">
          <span className="block text-sm font-semibold text-gray-900 dark:text-white">{name}</span>
          <span className="block text-sm text-gray-900 truncate dark:text-white">{email}</span>
        </div>
        <ul className="py-1 text-gray-700 dark:text-gray-300" aria-labelledby="dropdown">
          <li>
            <a
              href={`/becario/config`}
              className="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-green-600 dark:text-gray-300 dark:hover:text-white"
            >
              Mi perfil
            </a>
          </li>
          <li>
            <a
              href={`/becario/config`}
              className="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-green-600 dark:text-gray-400 dark:hover:text-white"
            >
              Configuración de la cuenta
            </a>
          </li>
        </ul>
        <ul
          className="py-1 dark:text-gray-300 text-white bg-red-500 hover:bg-red-600 dark:bg-red-800 dark:hover:bg-red-700  rounded-b-xl"
          aria-labelledby="dropdown"
        >
          <li>
            <button onClick={() => signOut()} className="block py-2 px-4 text-sm ">
              Salir de la cuenta
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default ProfileDropdown;
