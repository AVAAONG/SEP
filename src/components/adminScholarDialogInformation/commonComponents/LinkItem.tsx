import Link from "next/link";

interface LinkItemProps {
    href: string | null;
    label: string;
    icon: React.ReactNode;
}

const LinkItem: React.FC<LinkItemProps> = ({ href, label, icon }) => {
    if (!href) {
        return <div></div>;
    }

    return (
        <Link href={href} className="flex items-center space-x-2" target="_blank">
            {icon}
            <span className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {label}
            </span>
        </Link>
    );
};
export default LinkItem;