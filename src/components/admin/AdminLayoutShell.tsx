'use client';

import Navbar from '@/components/admin/navigation/navbar/Navbar';
import Sidebar from '@/components/admin/navigation/sidebar/Sidebar';
import { useSidebarContext } from '@/hooks/sidebar-context';
import { cn } from '@nextui-org/react';
import type { ReactNode } from 'react';

type AdminLayoutShellProps = {
    children: ReactNode;
    hasExtendedAccess: boolean;
};

const AdminLayoutShell = ({ children, hasExtendedAccess }: AdminLayoutShellProps) => {
    const { isOpen } = useSidebarContext();

    return (
        <main className="bg-[#137832] dark:bg-[#083A17] antialiased flex lg:p-2 lg:pl-0 max-w-screen box-border">
            <Sidebar hasExtendedAccess={hasExtendedAccess} />
            <section
                className={cn(
                    'min-h-screen md:rounded-md bg-[#f4fbf7] dark:bg-[#040b07] p-2 w-full',
                    isOpen ? 'lg:!min-w-0' : 'lg:!min-w-[calc(100vw-6rem)]'
                )}
            >
                <Navbar hasExtendedAccess={hasExtendedAccess} />
                {children}
            </section>
        </main>
    );
};

export default AdminLayoutShell;
