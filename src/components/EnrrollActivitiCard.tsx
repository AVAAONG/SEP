'use client';
import { enrrrollScholarToWorkshop } from '@/lib/db/utils/Workshops';
import { parseChatLevelFromDatabase, parseModalityFromDatabase, parsePlatformFromDatabase, parseSkillFromDatabase } from '@/lib/utils2';
import {
  CalendarDaysIcon,
  ClockIcon,
  InformationCircleIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline';
import { Avatar } from '@nextui-org/avatar';
import { Button } from '@nextui-org/button';
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { Tooltip, useDisclosure } from '@nextui-org/react';
import { chatIcon, workshopIcon } from 'public/svgs/svgs';
import React from 'react';
import DisplayDate from './DisplayDate';
import DisplayTime from './DisplayTime';
import { ChatsWithAllData } from './table/columns/chatsColumns';
import { WorkshopWithAllData } from './table/columns/workshopColumns';

interface EnrrollActivitiCardProps {
  activity: WorkshopWithAllData | ChatsWithAllData;
  scholarId: string;
}

const EnrrollActivitiCard: React.FC<EnrrollActivitiCardProps> = ({ activity, scholarId }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const confirmationModal = useDisclosure();
  const speakers = activity.speaker.map((speaker) => {
    const firstNames = speaker.first_names.split(' ');
    const lastNames = speaker.last_names.split(' ');
    return `${firstNames[0]} ${lastNames[0]}`;
  });
  const startDates = activity.start_dates.map((date) => new Date(date));
  const endDates = activity.end_dates.map((date) => new Date(date));

  const kindOfActivity = 'asociated_skill' in activity ? 'workshop' : 'chat';
  return (
    <>
      <Card className="min-w-[350px] max-w-[350px]" radius="sm">
        <CardHeader className="justify-between">
          <div className="flex items-center gap-3 max-w-fit truncate">
            <div>
              <Avatar
                icon={'asociated_skill' in activity ? workshopIcon() : chatIcon()}
                radius="sm"
                size="md"
                classNames={{
                  icon: `${kindOfActivity === 'workshop' ? ' border-blue-500 bg-blue-500' : 'border-red-500 bg-red-500'} text-white p-1`,
                  base: `${kindOfActivity === 'workshop' ? ' border-blue-500 ' : 'border-red-500 '}`,
                  img: `${kindOfActivity === 'workshop' ? ' border-blue-500 ' : 'border-red-500 '}`,
                }}
              />
            </div>
            <div className="flex flex-col gap-1 items-start justify-center">
              <h3 className="text-small font-semibold leading-none  text-ellipsis">
                {activity.title}
              </h3>
              <h4 className="text-small tracking-tight text-default-400">
                Por: {speakers.join(', ')}
              </h4>
            </div>
          </div>
        </CardHeader>
        <CardBody className="flex flex-col gap-2 px-3 py-2  text-tiny">
          <div className="flex gap-1">
            <CalendarDaysIcon className="w-4 h-4 " />
            <h5 className=" tracking-tight text-default-400">
              <DisplayDate date={startDates[0].toISOString()} />
            </h5>
          </div>
          <div className="flex gap-1">
            <ClockIcon className="w-4 h-4" />
            <h5 className=" tracking-tight text-default-400">
              <DisplayTime time={startDates[0].toISOString()} />
              {' '}a{' '}
              <DisplayTime time={endDates[0].toISOString()} />
            </h5>
          </div>
          <div className="flex gap-1">
            <div className="flex gap-1">
              <MapPinIcon className="w-4 h-4 " />
              <h5 className="tracking-tight text-default-400">{parseModalityFromDatabase(activity.modality)}</h5>
            </div>
            <div className="flex gap-1">
              <MapPinIcon className="w-4 h-4" />
              <h5 className="tracking-tight text-default-400">{parsePlatformFromDatabase(activity.platform)}</h5>
            </div>
          </div>
        </CardBody>
        {'asociated_skill' in activity ? (
          <CardFooter className="justify-between">
            <div className="flex flex-col space-y-1 text-tiny">
              <div className="flex gap-1.5">
                <Tooltip content="Año de la actividad formativa">
                  <InformationCircleIcon className="w-4 h-4 " />
                </Tooltip>
                <h5 className=" tracking-tight text-default-400">{activity.year.length > 4 ? 'Todos' : activity.year.join(', ')}</h5>
              </div>
              <div className="flex gap-1.5">
                <Tooltip content="Competencia asociada">
                  <InformationCircleIcon className="w-4 h-4 " />
                </Tooltip>
                <h5 className=" tracking-tight text-default-400">{parseSkillFromDatabase(activity.asociated_skill)}</h5>
              </div>
            </div>
            <Button onPress={onOpen} className="bg-blue-500 text-white" radius="full" size="sm">
              ¡Inscribirse!
            </Button>
          </CardFooter>
        ) : (
          <CardFooter className="justify-between">
            <div className="flex flex-col space-y-1 text-tiny">
              <div className="flex gap-1.5">
                <Tooltip content="Nivel del chat">
                  <InformationCircleIcon className="w-4 h-4 " />
                </Tooltip>
                <h5 className="tracking-tight text-default-400">{parseChatLevelFromDatabase(activity.level)}</h5>
              </div>
            </div>
            <Button onPress={onOpen} className="bg-red-500 text-white" radius="full" size="sm">
              ¡Inscribirse!
            </Button>
          </CardFooter>
        )}
      </Card>
      {/* <BasicModal
        isOpen={confirmationModal.isOpen}
        onOpenChange={confirmationModal.onOpenChange}
        title="¿Estas seguro de que deseas inscribirte en esta actividad?"
        Content={() => (
          <>
            <div>
              Al inscribirte te comprometes a asistir, participar activamente y cumplir con las
              responsabilidades y obligaciones que se te asignen en la actividad.
            </div>
            <div>Recuerda, tu participación es vital para el éxito de la actividad. ✨ </div>
          </>
        )}
        isButtonDisabled={selectedEvent?.isFull}
        onConfirm={async () => {
          toast.promise(
            handleEnrollment(
              selectedEvent.id,
              scholarId,
              selectedEvent.eventId,
              selectedEvent.kindOfActivity,
              d.data.user?.email
            ),
            {
              pending: 'Confirmando',
              success: 'Inscripción exitosa',
              error: 'Error al inscribirte en la actividad. Inténtalo de nuevo más tarde.',
            }
          );
          await sendGenericEmail(
            createEnrollementConfirmationMessage(
              scholarName,
              `www.programaexcelencia.org/becario/actividadesFormativas/${selectedEvent.id}`,
              selectedEvent.originalTitle
            ),
            d.data.user?.email,
            'Confirmacion de inscripción'
          );
          confirmationModal.onClose();
        }}
        confirmText="Confirmar Inscripción"
      />  */}
    </>
  );
};

export default EnrrollActivitiCard;
