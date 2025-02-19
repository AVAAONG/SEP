'use client';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { Button } from "@heroui/button";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/dropdown";
import { useDisclosure } from "@heroui/modal";
import { Select, SelectItem } from "@heroui/react";
import { useState } from 'react';
import { toast } from 'react-toastify';
import BasicModal from '../../BasicModal';
import changeActivityStatus from './utils';

const SUSPENSION_REASON = [
  'Falta de Quorum',
  'Disponibilidad del facilitador',
  'Falla de servicios',
  'Condiciones climáticas',
  'Reprogramación',
  'Eventos inesperados',
];

const StatusUpdateButton = ({
  kindOfActivity,
  activityForChangeId,
  scholarsEmails,
}: {
  kindOfActivity: 'workshop' | 'chat';
  activityForChangeId: string;
  scholarsEmails: (string | null)[];
}) => {
  const suspendModal = useDisclosure();
  const attendanceCheckedModal = useDisclosure();
  const [value, setValue] = useState<string>('');

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
  };
  return (
    <>
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Button
            radius="sm"
            startContent={<ArrowPathIcon className="w-5 h-5" />}
            className="w-full"
          >
            {' '}
            <span className="hidden md:block w-full">Cambiar estatus</span>
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem
            key="ATTENDANCE_CHECKED"
            color="success"
            onPress={attendanceCheckedModal.onOpen}
          >
            Realizado
          </DropdownItem>
          <DropdownItem key="SUSPENDED" color="danger" onPress={suspendModal.onOpen}>
            Suspendido
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <BasicModal
        isOpen={suspendModal.isOpen}
        onOpenChange={suspendModal.onOpenChange}
        isButtonDisabled={value.length === 0}
        title="¿Estas seguro que deseas suspender la actividad?"
        Content={() => (
          <div className="flex flex-col gap-4">
            <p>
              Si cancelas la actividad, los becarios inscritos seran notificados via correo
              electronico y se prohibira la inscripcion de nuevos becarios a la actividad.
            </p>
            <Select
              label="Selecciona la razon de la suspension"
              onChange={handleSelectionChange}
              selectedKeys={[value]}
            >
              {SUSPENSION_REASON.map((reason) => (
                <SelectItem key={reason}>{reason}</SelectItem>
              ))}
            </Select>
          </div>
        )}
        onConfirm={async () => {
          toast.promise(
            changeActivityStatus('SUSPENDED', kindOfActivity, activityForChangeId, scholarsEmails),
            {
              pending: 'Suspendiendo actividad...',
              success: 'Actividad suspendida exitosamente',
              error: 'Error al suspender actividad',
            }
          );
          suspendModal.onClose();
        }}
        confirmText="Suspender actividad"
      />
      <BasicModal
        isOpen={attendanceCheckedModal.isOpen}
        onOpenChange={attendanceCheckedModal.onOpenChange}
        isButtonDisabled={false}
        title="¿Estas seguro que deseas marcar la actividad como realizada?"
        Content={() => (
          <div className="flex flex-col gap-4">
            <p>
              Al marcar la actividad como realizada, se notificara a los becarios inscritos via
              correo electronico. Ademas, se habilitara la encuesta de satisfaccion de la actividad
            </p>
          </div>
        )}
        onConfirm={async () => {
          toast.promise(
            changeActivityStatus(
              'ATTENDANCE_CHECKED',
              kindOfActivity,
              activityForChangeId,
              scholarsEmails
            ),
            {
              pending: 'Marcando actividad como realizada...',
              success: 'Actividad marcada como realizada exitosamente',
              error: 'Error al marcar actividad como realizada',
            }
          );
          attendanceCheckedModal.onClose();
        }}
        confirmText="Marcar como realizado"
      />
    </>
  );
};

export default StatusUpdateButton;
