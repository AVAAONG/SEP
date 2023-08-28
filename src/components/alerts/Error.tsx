/**
 * @file  This file renders a warning alert to the users.
 * @author Kevin Bravo (kevinbravo.me)
 */
import WarningTooltip from '../admin/WarningTooltip';

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
const Warning = ({ title, subtitle, children }: WarningProps) => {
  return (
    <div
      className="max-w-md p-4 mb-4 text-red-600 border border-red-300 rounded-lg bg-transparent dark:bg-transparent dark:text-red-400 dark:border-red-800"
      role="alert"
    >
      <div className="flex items-center">
        <WarningTooltip helperText="Utiliza el correo por el cual recibes los mensajes de ProExcelencia" />
        <span className="sr-only">Info</span>
        <h3 className=" text-base md:text-lg font-medium ">{title}</h3>
      </div>
      <div className="mt-2 mb-4 ml-7 text-sm">{subtitle}</div>
      <div className="flex w-full justify-end">{children}</div>
    </div>
  );
};

export default Warning;
