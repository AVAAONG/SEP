'use client';
import { useSidebarContext } from '@/hooks/sidebar-context';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { Button } from '@nextui-org/button';
import { ScholarStatus } from '@prisma/client';
import ScholarStatusIndicator from '../ScholarStatus';
import { ScholarUserDropdown } from '../layout/ScholarUserDropdown';
import { ThemeToggleButton } from '../layout/theme-toggle';
import LetterRequests from './LetterRequests';
interface NavigationBarProps {
  email: string | null | undefined;
  scholarStatus: ScholarStatus;
}
const NavigationBar = ({ email, scholarStatus }: NavigationBarProps) => {
  const { isOpen: isSidebarOpen, toggle } = useSidebarContext();

  return (
    <nav className="px-4 py-2.5 dark:bg-black left-0 right-0 top-0 z-30">
      <div
        className={`${isSidebarOpen ? 'md:ml-72' : ''} flex items-center justify-between gap-4 transition-all duration-300 ease-in-out`}
      >
        <div className="flex justify-start items-center">
          <Button
            isIconOnly
            variant="light"
            size="sm"
            startContent={<Bars3Icon className="w-6 h-6" />}
            onPress={toggle}
            onClick={toggle}
          />
        </div>
        <div className="flex gap-4 md:gap-8 items-center justify-start">
          <ScholarStatusIndicator
            scholarData={{
              dni: '',
              firstName: '',
              status: scholarStatus,
              id: '',
              surNames: '',
            }}
            isAdmin={false}
          />
          <LetterRequests email={email ?? ''} />
          <ThemeToggleButton />
          <ScholarUserDropdown />
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
