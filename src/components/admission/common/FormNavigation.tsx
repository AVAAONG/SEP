'use client';
import { CheckBadgeIcon } from '@heroicons/react/24/outline';
import { Button } from '@nextui-org/button';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/dropdown';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
const setVariantAccordingToState = (state: string) => {
  if (state === 'current') return 'solid';
  if (state === 'done') return 'flat';
  if (state === 'notDone') return 'light';
};
const FormNavigation = ({
  items,
}: {
  items: { label: string; state: string; avalible: boolean; step: number }[];
}) => {
  const router = useRouter();
  const pathname = usePathname();

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

  const nvigateTo = (step: number | string) => {
    const newSearchParams = new URLSearchParams();
    newSearchParams.set('paso', step.toString());
    router.replace(`${pathname}?${newSearchParams.toString()}`);
  };

  return (
    <>
      {isMobile ? (
        <Dropdown>
          <DropdownTrigger>
            <Button variant="bordered">Open Menu</Button>
          </DropdownTrigger>

          <DropdownMenu aria-label="Static Actions" onAction={(key) => nvigateTo(key)}>
            {items.map(({ label, state, avalible, step }) => (
              <DropdownItem
                startContent={state === 'done' ? <CheckBadgeIcon className="w-5 h-5" /> : <></>}
                key={step}
              >
                {label}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      ) : (
        <>
          {items.map(({ label, state, avalible, step }, index) => (
            <Button
              radius="sm"
              startContent={state === 'done' ? <CheckBadgeIcon className="w-5 h-5" /> : <></>}
              key={index}
              color="success"
              isDisabled={!avalible}
              onPress={() => nvigateTo(step)}
              variant={setVariantAccordingToState(state)}
              className="!justify-start"
            >
              {label}
            </Button>
          ))}
        </>
      )}
    </>
  );
};

export default FormNavigation;
