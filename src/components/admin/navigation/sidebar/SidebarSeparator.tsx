const SidebarSeparator = ({ text }: { text: string }) => {
  return (
    <div className="border-t border-gray-300 dark:border-emerald-800 p-1 font-semibold w-full ">
      <p className="text-xs font-medium text-secondary-dark dark:text-primary-light mt-2">{text}</p>
    </div>
  );
};

export default SidebarSeparator;
