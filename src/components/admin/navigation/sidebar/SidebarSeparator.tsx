const SidebarSeparator = ({ text }: { text: string }) => {
  return (
    <div className="border-t border-gray-300 dark:border-emerald-800 p-1 font-medium w-full ">
      <p className="text-xs font-bold text-black dark:text-primary-light mt-2 tracking-wider ">
        {text}
      </p>
    </div>
  );
};

export default SidebarSeparator;
