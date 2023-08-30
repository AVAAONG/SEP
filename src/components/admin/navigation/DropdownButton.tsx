'use client';
import Link from 'next/link';
import { useState } from 'react';

type DropdownButtonProps = {
  buttonName: string;
  itemList: { name: string; link: string }[];
  Icon: any;
};

const DropdownButton = ({ buttonName, itemList, Icon }: DropdownButtonProps) => {
  const [isDropdownOpen, setDropdown] = useState(false);
  const toggleDropdown = () => setDropdown(!isDropdownOpen);
  return (
    <li className="mb-4 list-none">
      <button
        onClick={toggleDropdown}
        type="button"
        className="flex items-center justify-between p-2 w-full text-sm font-semibold text-white rounded-md transition duration-75 group dakr:hover:bg-gray-100 dark:text-slate-300 hover:bg-green-600 dark:hover:bg-green-600"
      >
        <i className={` w-6 h-6`}>
          <Icon />
        </i>
        <span className="flex-1 ml-3 text-left whitespace-nowrap">{buttonName}</span>
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
      <ul className={` ${isDropdownOpen ? 'flex flex-col' : 'hidden'} py-2 space-y-2 `}>
        {itemList.map(({ name, link }) => {
          return (
            <li key={link}>
              <div className="flex items-center ml-9 rounded-lg transition duration-75 group hover:bg-green-600 dark:text-slate-300 text-white dark:hover:bg-green-600 p-2 pr-6 gap-4 justify-between w-full ">
                <svg
                  className="w-2 h-2 "
                  focusable="false"
                  fill="#ffffff"
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  data-testid="FiberManualRecordIcon"
                >
                  <circle cx="12" cy="12" r="8"></circle>
                </svg>
                <Link href={link} className="flex items-center w-full text-xs font-bold">
                  {name}
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </li>
  );
};

export default DropdownButton;
