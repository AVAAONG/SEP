'use client';
import { ChatsWithAllData } from '@/components/table/columns/chatsColumns';
import { WorkshopWithAllData } from '@/components/table/columns/workshopColumns';
import { VolunteerWithAllData } from '@/lib/db/types';
import generateAdminActivityWhatsappMessage from '@/lib/utils/generateAdminActivityWhatsappMessage';
import { Button, useDisclosure } from '@nextui-org/react';
import BasicModal from '../../BasicModal';
interface GenerateWhatsAppMessageButtonProps {
  activity: WorkshopWithAllData | ChatsWithAllData | VolunteerWithAllData;
}

const GenerateWhatsAppMessageButton: React.FC<GenerateWhatsAppMessageButtonProps> = ({
  activity,
}) => {
  const attendanceCheckedModal = useDisclosure();

  return (
    <>
      <Button className="w-full" onPress={attendanceCheckedModal.onOpen}>
        Mensaje WhatsApp
      </Button>
      <BasicModal
        scroll={true}
        size="4xl"
        isOpen={attendanceCheckedModal.isOpen}
        onOpenChange={attendanceCheckedModal.onOpenChange}
        isButtonDisabled={false}
        title="Mensaje para WhatsApp"
        Content={() => (
          <div className="flex flex-col">
            <pre>{generateAdminActivityWhatsappMessage(activity)}</pre>
          </div>
        )}
        onConfirm={() => {
          attendanceCheckedModal.onClose();
        }}
        confirmText="Cerrar"
      />
    </>
  );
};

export default GenerateWhatsAppMessageButton;
