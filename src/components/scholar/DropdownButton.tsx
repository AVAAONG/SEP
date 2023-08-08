'use client';
import { useState } from 'react';

type DropdownButtonProps = {
  buttonName: string;
  itemList: { name: string; link: string }[];
  Icon: JSX.Element;
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
          className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-green-300 dark:hover:bg-green-700 group"
        >
          <div className="w-6 h-6">{Icon}</div>
          <span className="ml-3">{buttonName}</span>
        </a>
      </li>
    );
  } else {
    return (
      <li>
        <button
          type="button"
          className="flex items-center p-2 w-full text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-green-300 dark:text-white dark:hover:bg-green-700"
          onClick={toggleDropdown}
        >
          <div className="w-6 h-6">{Icon}</div>
          <span className="flex-1 ml-3 text-left whitespace-nowrap">
            {buttonName}
          </span>

          <svg
            aria-hidden="true"
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        <ul
          id="dropdown-pages"
          className={`${
            isDropdownOpen ? 'flex flex-col' : 'hidden'
          } py-2 space-y-2`}
        >
          {itemList.map((item, index) => (
            <li className="flex justify-center items-center" key={index}>
              <a
                href={item.link}
                className="flex items-center gap-4 p-2 pl-11 w-full text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-green-200 dark:text-white dark:hover:bg-green-700"
              >
                <div className="rounded-full bg-green-700 w-2 h-2"></div>
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </li>
    );
  }
};

export default DropdownButton;
