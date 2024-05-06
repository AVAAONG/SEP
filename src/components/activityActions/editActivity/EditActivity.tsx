'use client';
import VolunteerForm from '@/components/admin/forms/volunteer/form';
import { VolunteerWithAllData } from '@/lib/db/types';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { Button } from '@nextui-org/button';
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from '@nextui-org/react';
import React from 'react';

interface EditActivityProps {
  speakers?: {
    id: string;
    first_names: string;
    last_names: string;
    email: string | null;
    image?: string | null;
  }[];
  kindOfActivity: 'workshop' | 'chat' | 'volunteer';
  valuesToUpdate: VolunteerWithAllData;
}

const EditActivity: React.FC<EditActivityProps> = ({ valuesToUpdate, speakers }) => {
  const { isOpen, onOpenChange, onOpen } = useDisclosure();

  return (
    <>
      <Button
        startContent={<PencilSquareIcon className="w-5 h-5" />}
        className="w-full"
        onPress={onOpen}
      >
        Editar Actividad
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="5xl"
        radius="sm"
        scrollBehavior="outside"
        classNames={{
          backdrop: 'bg-secondary-dark bg-opacity-80',
          base: 'bg-light dark:bg-dark',
        }}
      >
        <ModalContent>
          {(onClose) => {
            return (
              <>
                <ModalHeader className="col-span-2 text-center w-full font-semibold text-2xl text-primary-light uppercase tracking-widest">
                  Editar actividad
                </ModalHeader>
                <ModalBody className="flex flex-col items-center">
                  <VolunteerForm kind="edit" valuesToUpdate={valuesToUpdate} />
                </ModalBody>
              </>
            );
          }}
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditActivity;
