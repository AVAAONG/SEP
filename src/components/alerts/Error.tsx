/**
 * @file  This file renders a warning alert to the users.
 * @author Kevin Bravo (kevinbravo.me)
 */

import { WarningIcon } from '../../../public/svgs/SocialNetworks';

interface WarningProps {
  title: string;
  subtitle: string;
  children?: React.ReactNode;
}

/**
 *
 * @summary A warning alert.
 * @param title - The title of the warning.
 * @param subtitle - The subtitle of the warning.
 * @param children - The children of the warning.
 * @returns A warning alert.
 * @remarks allow to pass buttons as children to be added to the warning.
 */
const Error = ({ title, subtitle, children }: WarningProps) => {
  return (
    <div
      className="max-w-md p-4 mb-4 text-red-500 border border-red-300 rounded-lg bg-transparent dark:bg-transparent  dark:border-red-800"
      role="alert"
    >
      <div className="flex items-center gap-2">
        <div className="w-5 text-red-500">
          <WarningIcon />
        </div>
        <span className="sr-only">Info</span>
        <h3 className=" text-base md:text-lg font-medium ">{title}</h3>
      </div>
      <div className="mt-2 mb-4 text-sm text-start">{subtitle}</div>
      <div className="flex w-full justify-end">{children}</div>
    </div>
  );
};

export default Error;
