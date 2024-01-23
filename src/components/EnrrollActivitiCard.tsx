'use client';
import BasicModal from '@/components/BasicModal';
import { enrrrollScholarToWorkshop } from '@/lib/db/utils/Workshops';
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
import { workshopIcon } from 'public/svgs/svgs';
import React from 'react';
import { ChatsWithAllData } from './table/columns/chatsColumns';
import { WorkshopWithAllData } from './table/columns/workshopColumns';

interface EnrrollActivitiCardProps {
  activity: WorkshopWithAllData | ChatsWithAllData;
  scholarId: string;
}

const EnrrollActivitiCard: React.FC<EnrrollActivitiCardProps> = ({ activity, scholarId }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const speakers = activity.speaker.map((speaker) => {
    const firstNames = speaker.first_names.split(' ');
    const lastNames = speaker.last_names.split(' ');
    return `${firstNames[0]} ${lastNames[0]}`;
  });
  const startDates = activity.start_dates.map((date) => new Date(date));
  const endDates = activity.end_dates.map((date) => new Date(date));
  const enrrollScholar = async () => {
    await enrrrollScholarToWorkshop(activity.id, scholarId);
  };
  return (
    <>
      <Card className="min-w-[300px]" radius="sm">
        <CardHeader className="justify-between w-full">
          <div className="flex items-center gap-3 ">
            <div>
              <Avatar
                icon={workshopIcon()}
                radius="md"
                size="md"
                classNames={{
                  icon: 'bg-blue-500 text-white border-blue-500 p-1',
                  base: 'border-blue-500',
                  img: 'border-blue-500',
                }}
              />
            </div>
            <div className="flex flex-col gap-1 items-start justify-center">
              <h3 className="text-small font-semibold leading-none text-default-600">
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
              {startDates[0].toLocaleDateString('es-ES', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </h5>
          </div>
          <div className="flex gap-1">
            <ClockIcon className="w-4 h-4" />
            <h5 className=" tracking-tight text-default-400">
              {' '}
              {startDates[0].toLocaleTimeString('es-ES', {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
              })}{' '}
              a{' '}
              {endDates[0].toLocaleTimeString('es-ES', {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
              })}
            </h5>
          </div>
          <div className="flex gap-1">
            <div className="flex gap-1">
              <MapPinIcon className="w-4 h-4 " />
              <h5 className="tracking-tight text-default-400">{activity.modality}</h5>
            </div>
            <div className="flex gap-1">
              <MapPinIcon className="w-4 h-4" />
              <h5 className="tracking-tight text-default-400">{activity.platform}</h5>
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
                <h5 className=" tracking-tight text-default-400">{activity.year.join(', ')}</h5>
              </div>
              <div className="flex gap-1.5">
                <Tooltip content="Competencia asociada">
                  <InformationCircleIcon className="w-4 h-4 " />
                </Tooltip>
                <h5 className=" tracking-tight text-default-400">{activity.asociated_skill}</h5>
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
                <h5 className=" tracking-tight text-default-400">{activity.level}</h5>
              </div>
            </div>
            <Button onPress={onOpen} className="bg-red-500 text-white" radius="full" size="sm">
              ¡Inscribirse!
            </Button>
          </CardFooter>
        )}
      </Card>
      <BasicModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        title="Confirmación de inscripción"
        Content={() => {
          return (
            <div className="w-full flex flex-col gap-4 text-sm">
              <h1 className="text-center font-bold">
                ¿Estas seguro que quires inscribirte en la actividad de {activity.title}?
              </h1>
              <p>
                👀 Recuerda, inscribirse es un compromiso que adquieres con AVAA y contigo mismo.
              </p>
              <p>
                Al inscribirte, te comprometes a asistir a la actividad y cumplir con las
                responsabilidades y obligaciones que se te asignen.
              </p>
            </div>
          );
        }}
        isButtonDisabled={false}
        onConfirm={async () => {
          await enrrollScholar();
        }}
        confirmText="Confirmar inscripción"
      />
    </>
  );
};

export default EnrrollActivitiCard;
