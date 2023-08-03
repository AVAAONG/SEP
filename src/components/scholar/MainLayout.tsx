'use client'
import { scholarSidebarAtom } from "@/state/mainState";
import ScholarFooter from "../footer/ScholarFooter";
import { useAtom } from "jotai";

const MainLayout = ({ children }: {
    children: React.ReactNode,
}) => {
    const [isSidebarOpen,] = useAtom(scholarSidebarAtom);
    return (
        <main className={`${isSidebarOpen ? "md:ml-64 " : ""} p-4 h-auto pt-16`}>
            {children}
            <ScholarFooter />
        </main>
    );
};

export default MainLayout;