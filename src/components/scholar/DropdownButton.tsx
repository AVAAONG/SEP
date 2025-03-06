'use client';
import { useSidebarContext } from '@/hooks/sidebar-context';
import { Button } from '@nextui-org/button';
import { Link } from '@nextui-org/link';
import {
  cn,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Tooltip,
} from '@nextui-org/react';
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
  const { isOpen } = useSidebarContext();
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
        <li>
          <Tooltip
            isDisabled={isOpen}
            radius="sm"
            content={isOpen === false ? buttonName : null}
            placement="right-end"
          >
            <Button
              isIconOnly={!isOpen}
              href={link ? link : ''}
              as={Link}
              startContent={<div className="w-6 h-6">{Icon}</div>}
              className={cn(
                ' text-white dark:text-gray-300 flex items-center font-medium',
                isOpen && 'w-full'
              )}
              radius="sm"
              variant="light"
            >
              {isOpen && <span className="flex-1 text-left whitespace-nowrap">{buttonName}</span>}{' '}
            </Button>
          </Tooltip>
        </li>
      </ul>
    );
  } else {
    return isOpen ? (
      <ul>
        <li>
          <Button
            isIconOnly={!isOpen}
            type="button"
            className={cn('text-white dark:text-gray-300 font-medium', isOpen && 'w-full')}
            radius="sm"
            startContent={<div className="w-6 h-6">{Icon}</div>}
            variant="light"
            endContent={
              isOpen && (
                <div
                  className={`${isDropdownOpen ? 'rotate-180 transition-transform  ' : ''} w-6 h-6`}
                >
                  <ChevronIcon />
                </div>
              )
            }
            onClick={toggleDropdown}
          >
            {isOpen && <span className="flex-1 text-left whitespace-nowrap">{buttonName}</span>}
          </Button>
          <ul
            id="dropdown-pages"
            className={`${
              isDropdownOpen ? 'flex flex-col' : 'hidden'
            } py-2 space-y-1 transition-transform  duration-75`}
          >
            {itemList.map((item, index) => (
              <li className="flex gap-2 justify-center items-center pl-8" key={index}>
                <Button
                  href={link ? link : ''}
                  as={Link}
                  className={cn(
                    'text-white dark:text-gray-300 flex items-center font-medium',
                    isOpen && 'w-full'
                  )}
                  radius="sm"
                  startContent={
                    <div className="rounded-full bg-gray-200 hover:bg-white w-1 h-1"></div>
                  }
                  variant="light"
                >
                  <span className="flex-1 ml-2 text-left whitespace-nowrap"> {item.name}</span>
                </Button>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    ) : (
      <Dropdown placement="right-end" size="sm" radius="sm">
        <Tooltip content={buttonName} placement="right-end" radius="sm">
          <DropdownTrigger>
            <Button
              variant="light"
              radius="sm"
              size="sm"
              isIconOnly
              startContent={<div className="w-6 h-6">{Icon}</div>}
              // variant={isSubmenuActive ? 'solid' : 'light'}
              className="w-full  h-10 mb-1 text-white dark:text-gray-300 font-medium"
            >
              {isOpen && <span className="flex-1 text-left whitespace-nowrap">{buttonName}</span>}
            </Button>
          </DropdownTrigger>
        </Tooltip>

        <DropdownMenu disabledKeys={['label']}>
          <DropdownSection showDivider aria-label="Profile & Actions">
            <DropdownItem key="label" className="max-w-[190px] truncate">
              {buttonName}
            </DropdownItem>
          </DropdownSection>
          <DropdownSection aria-label="Profile & Actions">
            {itemList.map(({ link, name }, index) => (
              <DropdownItem
                key={index}
                href={link}
                // className={`cursor-pointer ${((active === undefined && pathname === href) || active) && 'bg-secondary'}`}
              >
                <p className="max-w-[180px] truncate">{name}</p>
              </DropdownItem>
            ))}
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
    );
  }
};

export default DropdownButton;
