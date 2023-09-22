'use client';
import Link from 'next/link';
import { useState } from 'react';
import { ChevronIcon } from '../../../public/svgs/svgs';

type DropdownButtonProps = {
  buttonName: string;
  itemList: { name: string; link: string }[];
  Icon: JSX.Element;
  link: string | null;
};

const DropdownButton = (props: DropdownButtonProps) => {
  const { buttonName, itemList, Icon, link } = props;

  const [isDropdownOpen, setDropdown] = useState(false);
  const toggleDropdown = () => setDropdown(!isDropdownOpen);

  if (itemList.length === 0) {
    return (
      <ul>
        <Link
          href={link ? link : ''}
          className="flex items-center p-2 text-sm font-medium rounded-lg text-gray-200 hover:text-white"
        >
          <div className="w-6 h-6">{Icon}</div>
          <span className="ml-3">{buttonName}</span>
        </Link>
      </ul>
    );
  } else {
    return (
      <ul>
        <button
          type="button"
          className="flex items-center p-2 w-full text-sm font-medium rounded-lg text-gray-200 hover:text-white"
          onClick={toggleDropdown}
        >
          <div className="w-6 h-6">{Icon}</div>
          <span className="flex-1 ml-3 text-left whitespace-nowrap">{buttonName}</span>
          <div className={`${isDropdownOpen ? 'rotate-180' : ''} w-6 h-6`}>
            <ChevronIcon />
          </div>
        </button>
        <ul
          id="dropdown-pages"
          className={`${
            isDropdownOpen ? 'flex flex-col' : 'hidden'
          } py-2 space-y-1 transition-transform  duration-75`}
        >
          {itemList.map((item, index) => (
            <li className="flex gap-2 justify-center items-center" key={index}>
              <Link
                href={item.link}
                className="flex items-center gap-4 p-2 pl-11 w-full text-sm rounded-lg text-gray-200 hover:text-white"
              >
                <div className="rounded-full bg-gray-200 hover:bg-white w-1.5 h-1.5"></div>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </ul>
    );
  }
};

export default DropdownButton;
