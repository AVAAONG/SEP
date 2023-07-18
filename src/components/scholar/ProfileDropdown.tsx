'use client'
import { useState } from "react";
import Image from "next/image";
interface ProfileDropdownProps {
    name: string;
    email: string;
    scholarId: string;
    image: string;
}

const ProfileDropdown = (props: ProfileDropdownProps) => {

    const [isDrowpdownProfileOpen, setDropdownProfile] = useState(false);
    const toggleDropdownProfile = () => setDropdownProfile(!isDrowpdownProfileOpen);

    const { name, email, scholarId, image} = props;

    return (
        <>
            <button
                onClick={toggleDropdownProfile}
                type="button"
                className="flex text-sm bg-gray-800 rounded-full  focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            >
                <span className="sr-only">Abrir menu de usuario</span>
                <Image
                    className="w-8 h-8 rounded-full border border-green-800"
                    src={image}
                    alt="user photo"
                    width={32}
                    height={32}

                />
            </button>
            <div
                className={`${isDrowpdownProfileOpen ? "absolute  transform translate-x-40 md:translate-x-48   lg:translate-x-52 translate-y-[128px]" : "hidden"} z-50 my-4 w-56 text-base list-none bg-white  divide-y divide-gray-100 shadow dark:bg-slate-900 dark:divide-gray-600 rounded-xl`}
            >
                <div className="py-3 px-4">
                    <span
                        className="block text-sm font-semibold text-gray-900 dark:text-white"
                    >{name}</span>
                    <span
                        className="block text-sm text-gray-900 truncate dark:text-white"
                    >{email}</span >
                </div>
                <ul
                    className="py-1 text-gray-700 dark:text-gray-300"
                    aria-labelledby="dropdown"
                >
                    <li>
                        <a
                            href={`becario/${scholarId}/config`}
                            className="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-green-600 dark:text-gray-400 dark:hover:text-white"
                        >Mi perfil</a>
                    </li>
                    <li>
                        <a
                            href={`becario/${scholarId}/config`}
                            className="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-green-600 dark:text-gray-400 dark:hover:text-white"
                        >Configuración de la cuenta</a>
                    </li>
                </ul>
                <ul
                    className="py-1 text-gray-700 dark:text-gray-300 bg-red-700 hover:bg-red-500 dark:hover:bg-red-600 rounded-b-xl"
                    aria-labelledby="dropdown"
                >
                    <li >
                        <a
                            href="#"
                            className="block py-2 px-4 text-sm  dark:hover:text-white"
                        >Sign out</a>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default ProfileDropdown