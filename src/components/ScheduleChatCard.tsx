'use client';
import { deleteCalendarEvent } from '@/lib/calendar/calendar';
import { CHAT_CALENDAR_ID, WORKSHOP_CALENDAR_ID } from '@/lib/constants';
import { ChatWithSpeaker, WorkshopWithSpeaker } from '@/lib/db/types';
import { changeWorkshopStatus, deleteWorkshopFromDatabase } from '@/lib/db/utils/Workshops';
import { changeChatStatus, deleteChatFromDatabase } from '@/lib/db/utils/chats';
import { revalidateSpecificPath } from '@/lib/serverAction';
import {
  parseChatLevelFromDatabase,
  parseModalityFromDatabase,
  parseSkillFromDatabase,
} from '@/lib/utils2';
import { deleteZoomMeeting } from '@/lib/zoom';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { Button } from '@nextui-org/button';
import { Checkbox, CheckboxGroup } from '@nextui-org/checkbox';
import { useDisclosure } from '@nextui-org/modal';
import { cn } from '@nextui-org/react';
import { ScrollShadow } from '@nextui-org/scroll-shadow';
import { Tooltip } from '@nextui-org/tooltip';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import BasicModal from './BasicModal';

type ScheduleChatCardProps = {
  activities: ChatWithSpeaker[] | WorkshopWithSpeaker[];
};

const ScheduleChatCard: React.FC<ScheduleChatCardProps> = ({ activities }) => {
  const [groupSelected, setGroupSelected] = useState<string[]>([]);
  const [buttonIsDisabled, setbuttonIsDisabled] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<
    ChatWithSpeaker | WorkshopWithSpeaker | null
  >(null);

  const editModal = useDisclosure();
  const deleteModal = useDisclosure();
  const sendModal = useDisclosure();
  let router;

  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
  }, []);
  if (mounted.current) {
    router = useRouter();
  }
  const editWorkshop = async (chatId: string) => {
    router.push(`?activityToEdit=${chatId}`);
  };

  const deleteActivity = async (activityId: string) => {
    const activity = activities.find((activity) => activity.id === activityId);
    if ('level' in activity) await deleteChatFromDatabase(activityId);
    else 'year' in activity && (await deleteWorkshopFromDatabase(activityId));

    activity?.calendar_ids.map(async (eventId: string, index: number) => {
      const calendarId = 'level' in activity ? CHAT_CALENDAR_ID : WORKSHOP_CALENDAR_ID;
      await deleteCalendarEvent(calendarId, eventId);
      if (activity?.modality === 'ONLINE') {
        if (activity.platform === 'ZOOM') await deleteZoomMeeting(activity.meeting_id[index]!);
      }
    });
  };
  const sendActivities = async () => {
    setbuttonIsDisabled(true);
    sendModal.onClose();
    groupSelected.map(async (id) => {
      if ('level' in activities[0]) await changeChatStatus(id, 'SENT');
      else if ('year' in activities[0]) await changeWorkshopStatus(id, 'SENT');
    });
    setbuttonIsDisabled(false);
    if ('level' in activities[0]) await revalidateSpecificPath('/admin/chats/crear');
    else if ('year' in activities[0])
      await revalidateSpecificPath('/admin/actividadesFormativas/crear');
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
            label: ' italic text-sm w-full text-center text-primary-1',
            base: 'w-full',
          }}
        >
          {activities.map((activity: ChatWithSpeaker | WorkshopWithSpeaker) => {
            const {
              title,
              id,
              avalible_spots,
              platform,
              level,
              asociated_skill,
              year,
              modality,
              speaker,
              start_dates,
              end_dates,
            } = activity;
            return (
              <Checkbox
                radius="sm"
                aria-label={title}
                key={id}
                classNames={{
                  base: cn(
                    'inline-flex max-w-full w-full bg-content1 m-0',
                    'hover:bg-content2 items-center justify-start',
                    'cursor-pointer rounded-lg gap-2 p-2 px-4 border-2 border-transparent',
                    'data-[selected=true]:border-primary-light'
                  ),
                  label: 'w-full',
                }}
                value={id}
              >
                <div className="w-full flex justify-between gap-2 items-center">
                  <div className="flex-1 w-1/6 overflow-hidden">
                    <Tooltip showArrow={true} content={title}>
                      <Button
                        className="bg-transparent h-unit-5 p-0 m-0 font-medium"
                        variant="flat"
                      >
                        {title}
                      </Button>
                    </Tooltip>
                    <p className="text-xs  ">
                      <Tooltip
                        showArrow={true}
                        content={
                          <div className="flex flex-col gap-2">
                            {speaker.map((speaker, index) => {
                              return (
                                <div key={index}>
                                  {speaker.first_names.split(' ')[0] +
                                    ' ' +
                                    speaker.last_names.split(' ')[0]}
                                </div>
                              );
                            })}
                          </div>
                        }
                      >
                        <Button className="bg-transparent p-0 h-unit-5" variant="flat">
                          Por:{' '}
                          {speaker[0].first_names.split(' ')[0] +
                            ' ' +
                            speaker[0].last_names.split(' ')[0]}
                        </Button>
                      </Tooltip>
                    </p>
                  </div>
                  <div className="flex-1 min-w-0 text-center">
                    <p className="text-sm font-medium ">
                      {new Date(start_dates[0]).toLocaleString('es-ES', {
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                    <p className="text-xs   ">
                      De{' '}
                      {new Date(start_dates[0]).toLocaleString('es-ES', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}{' '}
                      a{' '}
                      {new Date(end_dates[0]).toLocaleString('es-ES', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                  {asociated_skill && (
                    <div className="flex-1 min-w-0 text-center">
                      <p className="text-xs">{parseSkillFromDatabase(asociated_skill)}</p>
                      <p className="text-xs">{avalible_spots} cupos</p>
                      <p className="text-xs">{year.join(', ')} Año</p>
                    </div>
                  )}
                  {level && (
                    <div className="flex-1 min-w-0 text-center">
                      <p className="text-xs">{parseChatLevelFromDatabase(level)}</p>
                      <p className="text-xs">{avalible_spots} cupos</p>
                    </div>
                  )}
                  <div className="flex-1 min-w-0 text-center">
                    <p className="text-sm font-medium ">{parseModalityFromDatabase(modality)} </p>
                    <p className="text-xs">{platform}</p>
                  </div>
                  <div className=" flex flex-col w-6">
                    <Button
                      variant="light"
                      color="danger"
                      radius="full"
                      size="sm"
                      isIconOnly
                      className="w-4 font-medium"
                      onPress={() => {
                        setSelectedActivity(activity);
                        deleteModal.onOpen();
                      }}
                    >
                      X<span className="sr-only">Eliminar actividad</span>
                    </Button>
                    <BasicModal
                      isOpen={deleteModal.isOpen}
                      onOpenChange={deleteModal.onOpenChange}
                      title="¿Estas seguro que deseas eliminar esta actividad?"
                      isButtonDisabled={buttonIsDisabled}
                      Content={() => {
                        return (
                          <>
                            <div className="flex flex-col gap-4 items-center justify-center w-full">
                              <p>
                                La actividad{' '}
                                <span className="font-medium italic">
                                  {selectedActivity!.title}
                                </span>{' '}
                                pautada para el dia{' '}
                                <span className="font-medium ">
                                  {new Date(selectedActivity!.start_dates[0]).toLocaleDateString(
                                    'es-ES',
                                    { day: 'numeric', month: 'long', year: 'numeric' }
                                  )}
                                </span>{' '}
                                a las{' '}
                                <span className="font-medium ">
                                  {new Date(selectedActivity!.start_dates[0]).toLocaleTimeString(
                                    'es-ES',
                                    {
                                      hour: '2-digit',
                                      minute: '2-digit',
                                      hour12: true,
                                    }
                                  )}
                                </span>{' '}
                                sera eliminada de forma permanente
                              </p>
                              <p>
                                En el caso de querer agendar una actividad con los mismos datos
                                deberas crearla nuevamente
                              </p>
                            </div>
                          </>
                        );
                      }}
                      onConfirm={() => {
                        toast.promise(deleteActivity(selectedActivity!.id), {
                          pending: 'Eliminando actividad...',
                          success: 'Actividad eliminada de forma correcta👌',
                          error: 'ERROR: No se pudo eliminar la actividad🤯',
                        });

                        deleteModal.onClose();
                        revalidateSpecificPath('/admin/chats/crear');
                      }}
                      confirmText="Eliminar"
                    />
                    <Button
                      variant="light"
                      color="success"
                      radius="full"
                      size="sm"
                      isIconOnly
                      className="w-4 font-medium"
                      onPress={() => {
                        setSelectedActivity(activity);
                        editModal.onOpen();
                      }}
                    >
                      <PencilSquareIcon className="w-5 h-5" />
                      <span className="sr-only">Editar actividad</span>
                    </Button>

                    <BasicModal
                      isOpen={editModal.isOpen}
                      onOpenChange={editModal.onOpenChange}
                      title="¿Estas seguro que deseas editar esta actividad formativa?"
                      Content={() => {
                        return (
                          <>
                            <div className="flex flex-col gap-4 items-center justify-center w-full">
                              <p>
                                La actividad{' '}
                                <span className="font-medium italic">
                                  {selectedActivity!.title}
                                </span>{' '}
                                pautada para el dia{' '}
                                <span className="font-medium ">
                                  {new Date(selectedActivity!.start_dates[0]).toLocaleDateString(
                                    'es-ES',
                                    { day: 'numeric', month: 'long', year: 'numeric' }
                                  )}
                                </span>{' '}
                                a las{' '}
                                <span className="font-medium ">
                                  {new Date(selectedActivity!.start_dates[0]).toLocaleTimeString(
                                    'es-ES',
                                    {
                                      hour: '2-digit',
                                      minute: '2-digit',
                                      hour12: true,
                                    }
                                  )}
                                </span>{' '}
                                sera editada
                              </p>
                            </div>
                          </>
                        );
                      }}
                      isButtonDisabled={buttonIsDisabled}
                      onConfirm={() => {
                        editWorkshop(selectedActivity?.id!);
                        editModal.onClose();
                      }}
                      confirmText="Editar"
                    />
                  </div>
                </div>
              </Checkbox>
            );
          })}
        </CheckboxGroup>
      </ScrollShadow>
      <Button
        isDisabled={groupSelected?.length === 0}
        className="bg-gradient-to-tr from-primary-1 to-emerald-500 text-white w-1/2 mt-12"
        radius="sm"
        onPress={() => {}}
      >
        Enviar
      </Button>
      <BasicModal
        isOpen={sendModal.isOpen}
        onOpenChange={sendModal.onOpenChange}
        title="¿Estas seguro que deseas enviar las sigientes? 🤨"
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
        }}
        confirmText="Enviar"
      />
    </div>
  );
};

export default ScheduleChatCard;
