
interface ProfileDropdownProps {
    name: string;
    email: string;
    scholarId: string;
    isOpen: boolean;

}


const ProfileDropdown = (props: ProfileDropdownProps) => {
    const { name, email, scholarId, isOpen } = props;

    return (
        <div
            className={`${isOpen ? "" : "hidden"} z-50 my-4 w-56 text-base list-none bg-white  divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600 rounded-xl`}
            id="dropdown"
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
                        className="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
                    >Mi perfil</a>
                </li>
                <li>
                    <a
                        href={`becario/${scholarId}/config`}
                        className="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
                    >Configuracion de la cuenta</a>
                </li>
            </ul>
            <ul
                className="py-1 text-gray-700 dark:text-gray-300"
                aria-labelledby="dropdown"
            >
            </ul>
            <ul
                className="py-1 text-gray-700 dark:text-gray-300"
                aria-labelledby="dropdown"
            >
                <li>
                    <a
                        href="#"
                        className="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >Sign out</a>
                </li>
            </ul>
        </div>
    )
}

export default ProfileDropdown