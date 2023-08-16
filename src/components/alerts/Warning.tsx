import WarningTooltip from '../admin/WarningTooltip';

interface WarningProps {
  title: string;
  subtitle: string;
  children?: React.ReactNode;
}

const Warning = ({ title, subtitle, children }: WarningProps) => {
  return (
    <div
      className="p-4 mb-4 text-yellow-600 border border-yellow-300 rounded-lg bg-transparent dark:bg-transparent dark:text-yellow-400 dark:border-yellow-800"
      role="alert"
    >
      <div className="flex items-center">
        <WarningTooltip helperText="Utiliza el correo por el cual recibes los mensajes de ProExcelencia" />
        <span className="sr-only">Info</span>
        <h3 className="text-lg font-medium">{title}</h3>
      </div>
      <div className="mt-2 mb-4 text-sm">{subtitle}</div>
      <div className="flex w-full justify-end">{children}</div>
    </div>
  );
};

export default Warning;
