'use client';
import { Button, useDisclosure } from "@heroui/react";
import { useEffect, useState } from 'react';
import BasicModal from '../BasicModal';
import CollageInformation from './collage/CollageInformation';
import CVAInformation from './cva/CVAInformation';

const AdminScholarDialogsButtons: React.FC<{ scholarId: string }> = ({ scholarId }) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [modalInfo, setModalInfo] = useState({ title: '', type: '' });

  useEffect(() => {
    if (isOpen) {
      switch (modalInfo.type) {
        case 'collage':
          setModalInfo({ title: '🎓 Información universitaria', type: 'collage' });
          break;
        case 'cva':
          setModalInfo({ title: '🙋‍♂️ Información sobre el CVA', type: 'cva' });
          break;
        default:
          break;
      }
    }
  }, [isOpen]);

  return (
    <>
      <Button
        onPress={() => {
          onOpen();
          setModalInfo({ title: '🎓 Información universitaria', type: 'collage' });
        }}
        radius="sm"
      >
        Universidad
      </Button>
      <Button
        radius="sm"
        onPress={() => {
          onOpen();
          setModalInfo({ title: '🙋‍♂️ Información sobre el CVA', type: 'cva' });
        }}
      >
        CVA
      </Button>

      <BasicModal
        size="2xl"
        isOpen={isOpen}
        scroll={true}
        onOpenChange={onOpenChange}
        title={modalInfo.title}
        Content={() => (
          <>
            {modalInfo.type === 'collage' && <CollageInformation scholarId={scholarId} />}
            {modalInfo.type === 'cva' && <CVAInformation scholarId={scholarId} />}
          </>
        )}
        isButtonDisabled={false}
        onConfirm={() => {}}
        confirmText=""
      />
    </>
  );
};

export default AdminScholarDialogsButtons;
