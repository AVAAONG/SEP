'use client';
import { addApplicantComment } from '@/lib/db/utils/applicant';
import { revalidateSpecificPath } from '@/lib/serverAction';
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Textarea,
} from '@nextui-org/react';
import { RecruitmentStatus } from '@prisma/client';
import React from 'react';
import { toast } from 'react-toastify';

export const animals = [
  { key: 'PHASE_II_APPROVED', label: 'Aplica', color: 'green' },
  { key: 'PHASE_II_WITH_RESERVE', label: 'Aplica con reserva', color: 'yellow' },
  { key: 'PHASE_II_REJECTED', label: 'No aplica', color: 'red' },
];

export default function ApplicantStatusButton({
  applicantId,
  status,
}: {
  applicantId: string;
  status: RecruitmentStatus;
}) {
  const [value, setValue] = React.useState(new Set<RecruitmentStatus>([status]));
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [comment, setComment] = React.useState('');

  const handleSelectionChange = (newSelection: any) => {
    setValue(newSelection);
    setIsModalOpen(true);
  };

  const handleConfirm = async () => {
    const selectedStatus = Array.from(value)[0];
    if (selectedStatus) {
      await addApplicantComment(applicantId, comment, selectedStatus);
    }
    setIsModalOpen(false);
    setComment('');
    toast.success('Estado actualizado correctamente');
    await revalidateSpecificPath('/admin/captacion/**');
  };

  const handleCancel = async () => {
    const selectedStatus = Array.from(value)[0];
    if (selectedStatus) {
      await addApplicantComment(applicantId, '', selectedStatus);
    }
    setIsModalOpen(false);
    setComment('');
    toast.success('Estado actualizado correctamente');
    await revalidateSpecificPath('/admin/captacion/**');
  };

  const handleMinimalCancel = async () => {
    setIsModalOpen(false);
  };
  return (
    <div className="flex w-full max-w-xs flex-col gap-2">
      <Select
        size="sm"
        radius="sm"
        className="max-w-xs"
        label="Estado del solicitante"
        selectedKeys={value}
        defaultSelectedKeys={status}
        variant="flat"
        onSelectionChange={handleSelectionChange}
      >
        {animals.map((animal) => (
          <SelectItem key={animal.key} classNames={{ base: animal.color }}>
            {animal.label}
          </SelectItem>
        ))}
      </Select>

      <Modal isOpen={isModalOpen} onClose={handleMinimalCancel}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Deja una observación</ModalHeader>
              <ModalBody>
                <Textarea
                  placeholder="Deja una observación"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </ModalBody>

              <ModalFooter>
                <Button color="default" onClick={handleCancel}>
                  Continuar sin observación
                </Button>
                <Button onClick={handleConfirm}>Confirmar</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
