const SidebarSeparator = ({ text }: { text: string }) => {
  return (
    <div className="border-t border-gray-200 dark:border-emerald-800 p-1 font-semibold w-full ">
      <p className="text-xs font-semibold text-white dark:text-emerald-600 mt-2">{text}</p>
    </div>
  );
};

export default SidebarSeparator;
