"use client"
import { useState } from 'react'


type DropdownButtonProps = {
    buttonName: string;
    itemList: { name: string, link: string }[];
    Icon: any;
    link: string;
};

const DropdownButton = (props: DropdownButtonProps) => {
    const { buttonName, itemList, Icon, link } = props;

    const [isDropdownOpen, setDropdown] = useState(false);
    const toggleDropdown = () => setDropdown(!isDropdownOpen);

    if (itemList.length === 0) {
        return (
            <li>
                <a
                    href={link}
                    className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                    <svg
                        aria-hidden="true"
                        className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                        <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                    </svg>
                    <span className="ml-3">{buttonName}</span>
                </a>
            </li>
        )
    }
    else {
        return (
            <li>
                <button
                    type="button"
                    className="flex items-center p-2 w-full text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    onClick={toggleDropdown}
                >
                    <svg
                        aria-hidden="true"
                        className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                            clip-rule="evenodd"
                        ></path>
                    </svg>
                    <span className="flex-1 ml-3 text-left whitespace-nowrap"
                    >{buttonName}</span>

                    <svg
                        aria-hidden="true"
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clip-rule="evenodd"
                        ></path>
                    </svg>
                </button>
                <ul id="dropdown-pages" className={`${isDropdownOpen ? 'flex flex-col' : "hidden"} py-2 space-y-2`}>
                    {itemList.map((item) => (
                        <li className='flex justify-center items-center'>
                            <a
                                href="#"
                                className="flex items-center gap-4 p-2 pl-11 w-full text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                            >
                                <div className='rounded-full bg-green-700 w-2 h-2'></div>
                                {item.name}</a >
                        </li>
                    ))}
                </ul>
            </li>
        )
    }
}

export default DropdownButton