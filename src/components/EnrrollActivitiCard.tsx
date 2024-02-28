'use client';
import { createEnrollementConfirmationMessage } from '@/lib/htmlConfirmationTemplate';
import { sendGenericEmail } from '@/lib/sendEmails';
import { handleEnrollment } from '@/lib/serverAction';
import { ActivitiesForEnrollement } from '@/lib/utils';
import {
  CalendarDaysIcon,
  ClockIcon,
  InformationCircleIcon,
  MapPinIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Avatar } from '@nextui-org/avatar';
import { Button } from '@nextui-org/button';
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { Tooltip, useDisclosure } from '@nextui-org/react';
import { chatIcon, workshopIcon } from 'public/svgs/svgs';
import React from 'react';
import { toast } from 'react-toastify';
import BasicModal from './BasicModal';
import DisplayDate from './DisplayDate';
import DisplayTime from './DisplayTime';

interface EnrrollActivitiCardProps {
  activity: ActivitiesForEnrollement;
  scholar: {
    id: string;
    name: string;
    email: string;
  };
}

const EnrrollActivitiCard: React.FC<EnrrollActivitiCardProps> = ({ activity, scholar }) => {
  const {
    kindOfActivity,
    start,
    end,
    modality,
    platform,
    speakerNames,
    year,
    title,
    skill,
    avalibleSpots,
    level,
    isFull,
    id,
    eventId,
  } = activity;
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const activityIsInThePast = start < new Date();

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
                  icon: `${
                    kindOfActivity === 'workshop'
                      ? ' border-blue-500 bg-blue-500'
                      : 'border-red-500 bg-red-500'
                  } text-white p-1`,
                  base: `${
                    kindOfActivity === 'workshop' ? ' border-blue-500 ' : 'border-red-500 '
                  }`,
                  img: `${kindOfActivity === 'workshop' ? ' border-blue-500 ' : 'border-red-500 '}`,
                }}
              />
            </div>
            <div className="flex flex-col gap-1 items-start justify-center">
              <Tooltip content={title}>
                <h3 className="text-small font-semibold leading-none  text-ellipsis">{title}</h3>
              </Tooltip>
              <h4 className="text-small tracking-tight text-default-400">Por: {speakerNames}</h4>
            </div>
          </div>
        </CardHeader>
        <CardBody className="flex flex-col gap-2 px-3 py-2  text-tiny">
          <div className="flex gap-1">
            <CalendarDaysIcon className="w-4 h-4 " />
            <h5 className=" tracking-tight text-default-400">
              <DisplayDate date={start.toISOString()} />
            </h5>
          </div>
          <div className="flex gap-1">
            <ClockIcon className="w-4 h-4" />
            <h5 className=" tracking-tight text-default-400">
              <DisplayTime time={start.toISOString()} /> a <DisplayTime time={end.toISOString()} />
            </h5>
          </div>
          <div className="flex gap-1">
            <UserCircleIcon className="w-4 h-4" />
            <h5 className="tracking-tight text-default-400">
              {avalibleSpots === 0
                ? 'No hay cupos disponibles :('
                : `${avalibleSpots} cupos disponibles`}{' '}
            </h5>
          </div>
          <div className="flex gap-1">
            <div className="flex gap-1">
              <MapPinIcon className="w-4 h-4 " />
              <h5 className="tracking-tight text-default-400">{modality}</h5>
            </div>
            <div className="flex gap-1">
              <MapPinIcon className="w-4 h-4" />
              <h5 className="tracking-tight text-default-400">{platform}</h5>
            </div>
          </div>
        </CardBody>
        {kindOfActivity === 'workshop' ? (
          <CardFooter className="justify-between">
            <div className="flex flex-col space-y-1 text-tiny">
              <div className="flex gap-1.5">
                <Tooltip content="Año de la actividad formativa">
                  <InformationCircleIcon className="w-4 h-4 " />
                </Tooltip>
                <h5 className=" tracking-tight text-default-400">{year}</h5>
              </div>
              <div className="flex gap-1.5">
                <Tooltip content="Competencia asociada">
                  <InformationCircleIcon className="w-4 h-4 " />
                </Tooltip>
                <h5 className=" tracking-tight text-default-400">{skill}</h5>
              </div>
            </div>
            <Button
              isDisabled={isFull || activityIsInThePast}
              onPress={onOpen}
              className="bg-blue-500 text-white"
              radius="full"
              size="sm"
            >
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
                <h5 className="tracking-tight text-default-400">{level}</h5>
              </div>
            </div>
            <Button
              isDisabled={isFull || activityIsInThePast}
              onPress={onOpen}
              className="bg-red-500 text-white"
              radius="full"
              size="sm"
            >
              ¡Inscribirse!
            </Button>
          </CardFooter>
        )}
      </Card>
      <BasicModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
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
        isButtonDisabled={isFull}
        onConfirm={async () => {
          toast.promise(handleEnrollment(id, scholar.id, eventId, kindOfActivity, scholar.email), {
            pending: 'Confirmando',
            success: 'Inscripción exitosa',
            error: 'Error al inscribirte en la actividad. Inténtalo de nuevo más tarde.',
          });
          await sendGenericEmail(
            createEnrollementConfirmationMessage(
              scholar.name,
              `www.programaexcelencia.org/becario/actividadesFormativas/${id}`,
              title
            ),
            scholar.email,
            'Confirmación de inscripción'
          );
          onClose();
        }}
        confirmText="Confirmar Inscripción"
      />
    </>
  );
};

export default EnrrollActivitiCard;
