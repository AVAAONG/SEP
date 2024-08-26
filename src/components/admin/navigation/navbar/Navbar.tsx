'use client';
import ThemeToggleButton from '@/components/scholar/NavigationBar/ThemeToggleButton';
import ProfileDropdown from '@/components/scholar/ProfileDropdown';
import { getBlobImage } from '@/lib/azure/azure';
import { sidebarAtom } from '@/lib/state/mainState';
import { useAtom } from 'jotai';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { MenuIcon } from '../../../../../public/svgs/svgs';
const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Navbar = ({ children }) => {
  const [isOpen, setSidebar] = useAtom(sidebarAtom);
  const { data: session } = useSession();
  const setUpSidebar = () => (isOpen ? setSidebar(false) : setSidebar(true));
  useSWR(`/api/setAuthCookie?cookieValue=admin`, fetcher);
  const [image, setImage] = useState<string | null | undefined>(' ');

  useEffect(() => {
    const fetchImage = async () => {
      const blobImage = await getBlobImage(session?.user?.image);
      setImage(blobImage || ' ');
    };

    fetchImage();
  }, [session?.user?.image]);

  return (
    <nav className="block h-12 w-full left-0 right-0 top-0 mb-4">
      <div className="flex justify-between gap-4">
        <div className="flex gap-8 justify-center items-center">
          <button
            onClick={setUpSidebar}
            type="button"
            className="w-6 text-primary-light font-medium p-2 text-xl"
          >
            <div className="w-6 font-bold">
              <MenuIcon />
            </div>
          </button>
          {children}
        </div>

        <div className="flex gap-4 ">
          <div className="inline-flex items-center p-2 text-sm rounded-lg">
            <ThemeToggleButton />
          </div>
          <div className="flex items-center justify-start">
            <ProfileDropdown
              name={session?.user?.name || ' '}
              email={session?.user?.email || ' '}
              image={image}
              type="admin"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
