'use client';
import BasicModal from '@/components/BasicModal';
import { Button } from '@nextui-org/button';
import { useDisclosure } from '@nextui-org/react';

interface EditActivityProps {
  activityId: string;
  speakers: {
    id: string;
    first_names: string;
    last_names: string;
    email: string | null;
    image?: string | null;
  }[];
}

const EditActivity: React.FC<EditActivityProps> = ({ activityId, speakers }) => {
  const attendanceCheckedModal = useDisclosure();

  return (
    <>
      <Button className="w-full" onPress={attendanceCheckedModal.onOpen}>
        Editar Actividad
      </Button>
      <BasicModal
        size="5xl"
        scroll={true}
        isOpen={attendanceCheckedModal.isOpen}
        onOpenChange={attendanceCheckedModal.onOpenChange}
        isButtonDisabled={false}
        title="Editar actividad"
        Content={() => <></>}
        onConfirm={() => {}}
        confirmText="Cerrar"
      />
    </>
  );
};

export default EditActivity;
