'use client';
import ChatForm from '@/components/admin/forms/chat/form';
import VolunteerForm from '@/components/admin/forms/volunteer/form';
import WorkshopForm from '@/components/admin/forms/workshop/form';
import { ChatsWithAllData } from '@/components/table/columns/chatsColumns';
import { WorkshopWithAllData } from '@/components/table/columns/workshopColumns';
import { determineActivityKindByTipe } from '@/lib/activities/utils';
import { VolunteerWithAllData } from '@/lib/db/types';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { Button } from '@nextui-org/button';
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from '@nextui-org/react';
import React from 'react';

interface ActivityEditFormModalProps {
  activity: VolunteerWithAllData | ChatsWithAllData | WorkshopWithAllData
}

const ActivityEditFormModal: React.FC<ActivityEditFormModalProps> = ({ activity }) => {
  const { isOpen, onOpenChange, onOpen } = useDisclosure();
  const kindOfActivity = determineActivityKindByTipe(activity)
  return (
    <>
      <Button
        radius="sm"
        startContent={<PencilSquareIcon className="w-5 h-5" />}
        className="w-full"
        onPress={onOpen}
      >
        <span className='hidden md:block w-full'>
          Editar
        </span>
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
                  {

                    kindOfActivity === 'volunteer' && (
                      <VolunteerForm kind="edit" valuesToUpdate={activity as VolunteerWithAllData} />
                    )
                  }
                  {
                    kindOfActivity === 'workshop' && (
                      <WorkshopForm kind="edit" valuesToUpdate={activity as WorkshopWithAllData} />
                    )
                  }
                  {
                    kindOfActivity === 'chat' && (
                      <ChatForm kind="edit" valuesToUpdate={activity as ChatsWithAllData} />
                    )
                  }
                </ModalBody>
              </>
            );
          }}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ActivityEditFormModal;
