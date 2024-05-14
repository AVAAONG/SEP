'use client';
import { ChatsWithAllData } from '@/components/table/columns/chatsColumns';
import { WorkshopWithAllData } from '@/components/table/columns/workshopColumns';
import { VolunteerWithAllData } from '@/lib/db/types';
import generateAdminActivityWhatsappMessage from '@/lib/utils/generateAdminActivityWhatsappMessage';
import { Button, useDisclosure } from '@nextui-org/react';
import { WhatsAppIcon } from 'public/svgs/SocialNetworks';
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
      <Button startContent={<div className='w-5 h-5'> <WhatsAppIcon /></div>} className="w-full" radius='sm' onPress={attendanceCheckedModal.onOpen}>
        <span className='hidden md:block w-full'>
          Mensaje WhatsApp
        </span>
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
            <pre style={{
              width: '80%',
            }}>{generateAdminActivityWhatsappMessage(activity)}</pre>
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
