'use client';
import { deleteCalendarEvent } from '@/lib/calendar/calendar';
import { WORKSHOP_CALENDAR_ID } from '@/lib/constants';
import { deleteWorkshopFromDatabase, sendWorkshopsToScholar } from '@/lib/db/utils/Workshops';
import { revalidateSpecificPath } from '@/lib/serverAction';
import { parseModalityFromDatabase, parseSkillFromDatabase } from '@/lib/utils2';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { Button } from '@nextui-org/button';
import { Checkbox, CheckboxGroup } from '@nextui-org/checkbox';
import { useDisclosure } from '@nextui-org/modal';
import { cn } from '@nextui-org/react';
import { Tooltip } from '@nextui-org/tooltip';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import BasicModal from './BasicModal';
import { WorkshopWithSpeaker } from './admin/ChatFormCreation';

type WorkshopsListProps = {
  workshops: WorkshopWithSpeaker[];
};

const ScheduledWorkshopsList: React.FC<WorkshopsListProps> = ({ workshops }) => {
  const [groupSelected, setGroupSelected] = useState<string[]>();
  const [buttonIsDisabled, setbuttonIsDisabled] = useState(false);
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

  const sendWorkshops = async () => {
    if (groupSelected) {
      groupSelected.map(async (id) => {
        await sendWorkshopsToScholar(id);
      });
    }
  };

  const editWorkshop = async (workshopId: string) => {
    router.push(`?editWorkshopId=${workshopId}`);
  };
  const deleteWorkshop = async (workshopId: string) => {
    //borrar del calendario
    //borar del zoom (si existe)
    // borrar de la base de datos.
    const workshop = workshops.find((workshop) => workshop.id === workshopId);
    workshop?.calendar_ids.map(async (eventId) => {
      await deleteCalendarEvent(WORKSHOP_CALENDAR_ID, eventId);
    });
    await deleteWorkshopFromDatabase(shortUUID.SUUID);
  };
  return (
    <div className="flex flex-col w-full items-center">
      <h1 className="col-span-2 mb-3 text-center w-full font-semibold text-2xl text-primary-light uppercase tracking-widest">
        Actividades agendadas
      </h1>
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
        {workshops.map((workshop: WorkshopWithSpeaker, index) => {
          const {
            title,
            id,
            avalible_spots,
            platform,
            asociated_skill,
            year,
            modality,
            speaker,
            start_dates,
            end_dates,
          } = workshop;
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
                    <Button className="bg-transparent h-unit-4 p-0 m-0 font-medium" variant="flat">
                      {title}
                    </Button>
                  </Tooltip>
                  <p className="text-xs  ">
                    <Tooltip
                      showArrow={true}
                      content={`${speaker[0].first_names + ' ' + speaker[0].last_names}`}
                    >
                      <Button className="bg-transparent p-0 h-unit-4" variant="flat">
                        Por: {speaker[0].first_names + ' ' + speaker[0].last_names}
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
                <div className="flex-1 min-w-0 text-center">
                  <p className="text-sm font-medium ">{parseSkillFromDatabase(asociated_skill)}</p>
                  <p className="text-xs">{avalible_spots} cupos</p>
                  <p className="text-xs">{year.toString().replaceAll(',', ', ')} Año</p>
                </div>
                <div className="flex-1 min-w-0 text-center">
                  <p className="text-sm font-medium ">{parseModalityFromDatabase(modality)} </p>
                  <p className="text-xs   ">{platform}</p>
                </div>
                <div className=" flex flex-col w-6">
                  <Button
                    variant="light"
                    color="danger"
                    radius="full"
                    size="sm"
                    isIconOnly
                    className="w-4 font-medium"
                    onPress={deleteModal.onOpen}
                  >
                    X<span className="sr-only">Eliminar actividad formativa</span>
                  </Button>
                  <BasicModal
                    isOpen={deleteModal.isOpen}
                    onOpenChange={deleteModal.onOpenChange}
                    title="¿Estas seguro que deseas eliminar esta actividad formativa?"
                    isButtonDisabled={buttonIsDisabled}
                    Content={() => {
                      return (
                        <>
                          <div className="text-9xl w-full text-center">🤨</div>
                        </>
                      );
                    }}
                    onConfirm={deleteModal.onClose}
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
                      editWorkshop(id);
                    }}
                  >
                    <PencilSquareIcon className="w-5 h-5" />{' '}
                    <span className="sr-only">Editar actividad formativa</span>
                  </Button>

                  <BasicModal
                    isOpen={editModal.isOpen}
                    onOpenChange={editModal.onOpenChange}
                    title="¿Estas seguro que deseas editar esta actividad formativa?"
                    Content={() => {
                      return (
                        <>
                          <div className="text-9xl w-full text-center">🤨</div>
                        </>
                      );
                    }}
                    isButtonDisabled={buttonIsDisabled}
                    onConfirm={() => {
                      editWorkshop(id);
                    }}
                    confirmText="Editar"
                  />
                </div>
              </div>
            </Checkbox>
          );
        })}
      </CheckboxGroup>
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
        title="¿Estas seguro que deseas enviar las sigientes actividades formativas? 🤨"
        Content={() => {
          return (
            <ul className="flex flex-col gap-3">
              {groupSelected?.map((id) => {
                const workshop = workshops.find((workshop) => workshop.id === id);
                return (
                  <li key={workshop?.id}>
                    <p>✔ {workshop?.title}</p>
                  </li>
                );
              })}
            </ul>
          );
        }}
        isButtonDisabled={buttonIsDisabled}
        onConfirm={async () => {
          setbuttonIsDisabled(true);
          await sendWorkshops();
          sendModal.onClose();
          setbuttonIsDisabled(false);
          await revalidateSpecificPath('/admin/actividadesFormativas/crear');
        }}
        confirmText="Enviar"
      />
    </div>
  );
};

export default ScheduledWorkshopsList;
