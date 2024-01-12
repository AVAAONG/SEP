'use client';
import { Button } from '@nextui-org/button';
import { Link } from '@nextui-org/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ChevronIcon } from '../../../public/svgs/svgs';

export type DropdownButtonProps = {
  buttonName: string;
  itemList: { name: string; link: string }[];
  Icon: JSX.Element;
  link: string | null;
};

const DropdownButton = (props: DropdownButtonProps) => {
  const { buttonName, itemList, Icon, link } = props;
  const pathname = usePathname();

  const [isDropdownOpen, setDropdown] = useState(false);
  const toggleDropdown = () => setDropdown(!isDropdownOpen);
  useEffect(() => {
    // Function to handle route changes
    if (window.innerWidth <= 768) {
      setDropdown(false);
    }
  }, [pathname]);

  if (itemList.length === 0) {
    return (
      <ul>
        <Button
          href={link ? link : ''}
          as={Link}
          className=" text-white dark:text-gray-300 flex items-center font-medium w-full"
          radius="md"
          variant="light"
        >
          <div className="w-6 h-6">{Icon}</div>
          <span className="flex-1 ml-2 text-left whitespace-nowrap">{buttonName}</span>
        </Button>
      </ul>
    );
  } else {
    return (
      <ul>
        <Button
          type="button"
          className="text-white dark:text-gray-300 font-medium w-full "
          radius="md"
          variant="light"
          onClick={toggleDropdown}
        >
          <div className="w-6 h-6">{Icon}</div>
          <span className="flex-1 ml-2 text-left whitespace-nowrap">{buttonName}</span>
          <div className={`${isDropdownOpen ? 'rotate-180 transition-transform  ' : ''} w-6 h-6`}>
            <ChevronIcon />
          </div>
        </Button>
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
                className="flex items-center gap-4 p-2 pl-11 w-full text-sm rounded-lg text-white dark:text-gray-300 hover:text-gray-300 dark:hover:text-white"
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
