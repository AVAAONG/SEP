'use client';
import { CheckBadgeIcon } from '@heroicons/react/24/outline';
import { Button } from '@nextui-org/button';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/dropdown';
import { useEffect, useState } from 'react';

const FormNavigationButtons = ({
  buttonInfo,

  completedSteps,
}: {
  buttonInfo: {
    onClickFnc: () => void;
    label: string;
    step: number;
  }[];
  completedSteps: number;
}) => {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth <= 768 : false
  );

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        setIsMobile(window.innerWidth <= 768);
      }
    };
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      // Run the handler once to catch the initial size
      handleResize();
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  if (isMobile) {
    return (
      <Dropdown>
        <DropdownTrigger>
          <Button variant="bordered" color="success" radius="sm" className="!w-full">
            Selecciona una sección
          </Button>
        </DropdownTrigger>
        <DropdownMenu>
          {buttonInfo.map(({ label, onClickFnc, step }, index) => (
            <DropdownItem
              key={index}
              startContent={completedSteps > step ? <CheckBadgeIcon className="w-5 h-5" /> : <></>}
              onClick={onClickFnc}
              isDisabled={completedSteps < step}
            >
              {label}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    );
  } else {
    return (
      <>
        {buttonInfo.map(({ label, onClickFnc, step }, index) => (
          <Button
          key={index}
            startContent={completedSteps > step ? <CheckBadgeIcon className="w-5 h-5" /> : <></>}
            className="!justify-start !text-white"
            color="success"
            radius="sm"
            onClick={onClickFnc}
            isDisabled={completedSteps < step}
          >
            {label}
          </Button>
        ))}
      </>
    );
  }
};

export default FormNavigationButtons;
