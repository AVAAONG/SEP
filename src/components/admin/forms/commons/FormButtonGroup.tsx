'use client';
import { Button } from '@nextui-org/button';
export type ButtonGroupEventName = 'create' | 'send' | 'schedule' | 'edit';
/**
 * Renders a group of buttons that are design to be used in the different forms to create or edit an an activity.
 * The buttons rendered depend on the `onlyEdit` prop.
 *
 * @component
 * @param  onlyEdit - If true, only the "Edit" button is rendered.
 * If false, the "Create", "Send", and "Schedule" buttons are rendered.
 * @param  isDisabled - If true, all buttons are disabled.
 * If false, all buttons are enabled.
 * @returns A group of buttons.
 */
const FormButtonGroup = ({ onlyEdit, isDisabled }: { onlyEdit: boolean; isDisabled: boolean }) => {
  if (onlyEdit)
    return (
      <Button
        name="edit"
        type="submit"
        color="success"
        radius="sm"
        isDisabled={isDisabled}
        className="w-full !text-white"
      >
        Editar
      </Button>
    );
  return (
    <>
      <Button name="create" type="submit" radius="sm" isDisabled={isDisabled} className="w-full">
        Crear
      </Button>
      <Button name="send" type="submit" radius="sm" isDisabled={isDisabled} className="w-full">
        Enviar
      </Button>
      <Button
        name="schedule"
        type="submit"
        color="success"
        radius="sm"
        isDisabled={isDisabled}
        className="w-full !text-white"
      >
        Agendar
      </Button>
    </>
  );
};

export default FormButtonGroup;
