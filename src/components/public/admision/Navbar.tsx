import NavbarProfileDropdown from '@/components/commons/NavbarProfileDropdown';
import ThemeToggleButton from '@/components/scholar/NavigationBar/ThemeToggleButton';

const Navbar = async ({ email, image }: { email?: string; image?: string }) => {
  return (
    <nav className="h-12 flex gap-4 items-center justify-end w-full p-4 bg-gray-100 dark:bg-black border-b border-gray-200 dark:border-gray-800">
      <div className="inline-flex items-center p-2 text-sm rounded-lg">
        <ThemeToggleButton />
      </div>
      {email && image && <NavbarProfileDropdown email={email} image={image} />}
    </nav>
  );
};

export default Navbar;
