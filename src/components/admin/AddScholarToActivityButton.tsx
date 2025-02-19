'use client';
import { addAttendaceToScholar } from '@/lib/db/utils/Workshops';
import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/modal";
import { Chip, Listbox, ListboxItem, ScrollShadow, Selection } from "@heroui/react";

import { ActivityStatus, Scholar } from '@prisma/client';
import { useMemo, useState } from 'react';
interface AddScholarToActivityButtonProps {
  scholars: Scholar[];
  workshopId: string;
  activitiStatis: ActivityStatus;
}

const AddScholarToActivityButton: React.FC<AddScholarToActivityButtonProps> = ({
  workshopId,
  scholars,
  activitiStatis,
}) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [values, setValues] = useState<Selection>(new Set([]));

  const arrayValues = Array.from(values);

  const onAddScholarToActivity = async () => {
    console.log(arrayValues);
    arrayValues.forEach(async (scholarId) => {
      const attendance = activitiStatis === 'SENT' ? 'ENROLLED' : 'NOT_ATTENDED';
      await addAttendaceToScholar('', scholarId as string, attendance);
    });
    onClose();
  };

  const topContent = useMemo(() => {
    if (!arrayValues.length) {
      return null;
    }

    return (
      <ScrollShadow
        hideScrollBar
        className="w-full flex flex-wrap py-0.5 px-2 gap-1"
        orientation="horizontal"
      >
        {arrayValues.map((value) => {
          const scholar = scholars!.find((scholar) => `${scholar.id}` === `${value}`);
          return (
            <Chip key={value}>
              {scholar?.first_names.split(' ')[0]} {scholar?.last_names.split(' ')[0]}
            </Chip>
          );
        })}
      </ScrollShadow>
    );
  }, [arrayValues.length]);

  return (
    <>
      <Button onPress={onOpen}>Agregar Becario</Button>
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="2xl"
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: 'easeOut',
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: 'easeIn',
              },
            },
          },
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col text-center gap-1">
                Agregar becarios a la actividad
              </ModalHeader>
              <ModalBody className="grid grid-cols-2 gap-16 w-full">
                <ScrollShadow className="h-[430px] w-full flex flex-col gap-4">
                  <Listbox
                    className="w-full"
                    items={scholars}
                    label="Assigned to"
                    selectionMode="multiple"
                    onSelectionChange={setValues}
                    variant="flat"
                  >
                    {(item) => (
                      <ListboxItem key={item.id} textValue={item.first_names}>
                        <div className="flex gap-2 items-center">
                          <Avatar
                            alt={item.first_names}
                            className="flex-shrink-0"
                            size="sm"
                            src={undefined}
                          />
                          <div className="flex flex-col">
                            <span className="text-small">
                              {item.first_names.split(' ')[0]} {item.last_names.split(' ')[0]}
                            </span>
                            <span className="text-tiny text-default-400">{item.allowedEmail}</span>
                          </div>
                        </div>
                      </ListboxItem>
                    )}
                  </Listbox>
                </ScrollShadow>
                <div className="flex w-full flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-row items-center justify-between">
                      <span className="text-default-500">Becarios agregados</span>
                      <span className="text-default-500">{arrayValues.length}</span>
                    </div>
                    {topContent}
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cerrar
                </Button>
                <Button color="success" onPress={onAddScholarToActivity}>
                  Agregar becarios
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddScholarToActivityButton;
