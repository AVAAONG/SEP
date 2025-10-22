import AppDrawer from '@/components/layout/app-drawer';
import ChapterToggle from '@/components/layout/chapter-toggle';
import { ThemeToggleButton } from '@/components/layout/theme-toggle';
import { UserDropdown } from '@/components/layout/user-dropdown';

type NavbarProps = {
  hasExtendedAccess: boolean;
};

const Navbar = ({ hasExtendedAccess }: NavbarProps) => {
  return (
    <nav className="block h-10 w-full left-0 right-0 top-0 my-2 lg:mb-4">
      <div className="flex justify-between lg:!justify-end gap-4">
        <AppDrawer hasExtendedAccess={hasExtendedAccess} />
        <div className="flex gap-4  items-center justify-start">
          <div className="lg:hidden">
            <ChapterToggle />
          </div>
          <ThemeToggleButton />
          <UserDropdown />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
