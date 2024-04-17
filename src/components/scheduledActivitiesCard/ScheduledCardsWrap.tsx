'use client';
import BasicModal from '@/components/BasicModal';
import createChatInvitationMessage from '@/components/emailTemplateMessage/ChatInvitationMessage';
import createWorkshopInvitationMessage from '@/components/emailTemplateMessage/WorkshopInvitationMessage';
import { ChatWithSpeaker, WorkshopWithSpeaker } from '@/lib/db/types';
import { changeWorkshopStatusInBulk } from '@/lib/db/utils/Workshops';
import { changeChatStatusInBulk } from '@/lib/db/utils/chats';
import { changeVolunteerStatusInBulk } from '@/lib/db/utils/volunteer';
import { sendActivitiesEmail } from '@/lib/sendEmails';
import { revalidateSpecificPath } from '@/lib/serverAction';
import { Button } from '@nextui-org/button';
import { CheckboxGroup } from '@nextui-org/checkbox';
import { useDisclosure } from '@nextui-org/modal';
import { ScrollShadow } from '@nextui-org/scroll-shadow';
import { Volunteer } from '@prisma/client';
import 'moment/locale/es';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import ScheduledCard from './ScheduledCard';
type ScheduledCardsWrapI = {
  activities: ChatWithSpeaker[] | WorkshopWithSpeaker[] | Volunteer[];
};

const ScheduledCardsWrap: React.FC<ScheduledCardsWrapI> = ({ activities }) => {
  const [groupSelected, setGroupSelected] = useState<string[]>([]);
  const [buttonIsDisabled, setbuttonIsDisabled] = useState(false);

  const sendModal = useDisclosure();

  const sendActivities = async () => {
    setbuttonIsDisabled(true);

    const isLevelActivity = 'level' in activities[0];
    const isYearActivity = 'year' in activities[0];
    const isVolunteerActivity = 'kind_of_volunteer' in activities[0];

    if (isLevelActivity) await changeChatStatusInBulk(groupSelected, 'SENT');
    if (isYearActivity) await changeWorkshopStatusInBulk(groupSelected, 'SENT');
    if (isVolunteerActivity) await changeVolunteerStatusInBulk(groupSelected, 'SENT');

    setbuttonIsDisabled(false);
    if (isLevelActivity) {
      await revalidateSpecificPath('/admin/chats/crear');
      const chatInvitationMessage = createChatInvitationMessage();
      await sendActivitiesEmail(chatInvitationMessage, '¡Se han agregado chat clubs de ingles!');
    }

    if (isYearActivity) {
      await revalidateSpecificPath('/admin/actividadesFormativas/crear');
      const workshopInvitationMessage = createWorkshopInvitationMessage();
      await sendActivitiesEmail(
        workshopInvitationMessage,
        '¡Se han agregado actividades formativas!'
      );
    }
    if (isVolunteerActivity) {
      await revalidateSpecificPath('/admin/voluntarios/crear');
      const volunteerInvitationMessage = createWorkshopInvitationMessage();
      await sendActivitiesEmail(
        volunteerInvitationMessage,
        '¡Se han agregado actividades de voluntarios!'
      );
    }
    setbuttonIsDisabled(false);
  };

  return (
    <div className="flex flex-col w-full items-center">
      <h1 className="col-span-2 mb-3 text-center w-full font-semibold text-2xl text-primary-light uppercase tracking-widest">
        Actividades agendadas
      </h1>
      <ScrollShadow hideScrollBar className="w-full h-[550px]">
        <CheckboxGroup
          label="Selecciona las actividades que deseas enviar"
          value={groupSelected}
          onValueChange={setGroupSelected}
          color="success"
          classNames={{
            label: 'italic text-sm w-full text-center text-primary-1',
            base: 'w-full',
          }}
        >
          <ScheduledCard activities={activities} />
        </CheckboxGroup>
      </ScrollShadow>
      <Button
        isDisabled={groupSelected?.length === 0}
        className="bg-gradient-to-tr from-primary-1 to-emerald-500 text-white w-1/2 mt-12"
        radius="sm"
        onPress={sendModal.onOpen}
      >
        Enviar
      </Button>
      <BasicModal
        isOpen={sendModal.isOpen}
        onOpenChange={sendModal.onOpenChange}
        title="¿Estas seguro que deseas enviar las sigientes actividades? 🤨"
        Content={() => {
          return (
            <ul className="flex flex-col gap-3">
              {groupSelected?.map((id) => {
                const activity = activities.find((activity) => activity.id === id);
                return (
                  <li key={activity?.id}>
                    <p>✔ {activity?.title}</p>
                  </li>
                );
              })}
            </ul>
          );
        }}
        isButtonDisabled={buttonIsDisabled}
        onConfirm={async () => {
          toast.promise(sendActivities(), {
            pending: 'Enviando actividades...',
            success: 'Actividades enviadas de forma correcta 👌',
            error: 'ERROR: No se pudieron enviar las actividades 🤯',
          });
          sendModal.onClose();
        }}
        confirmText="Enviar"
      />
    </div>
  );
};

export default ScheduledCardsWrap;
