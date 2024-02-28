'use client';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import './calendar.css';

import { createEnrollementConfirmationMessage } from '@/lib/htmlConfirmationTemplate';
import { sendGenericEmail } from '@/lib/sendEmails';
import { handleEnrollment } from '@/lib/serverAction';
import { ActivitiesForEnrollement } from '@/lib/utils';
import { BigCalendarEventType } from '@/types/Calendar';
import { useDisclosure } from '@nextui-org/react';
import moment from 'moment';
import 'moment/locale/es';
import { useSession } from 'next-auth/react';
import { useMemo, useState } from 'react';
import { Calendar as BigCalendar, Views, momentLocalizer } from 'react-big-calendar';
import { toast } from 'react-toastify';
import BasicModal from '../BasicModal';
import DisplayDate from '../DisplayDate';
import DisplayTime from '../DisplayTime';
import SpeakersColumnWidget from '../SpeakerColumnWidget';

/**
 * Defines the style for each event in the calendar.
 * @param event The event to style.
 * @returns The style object for the event.
 */
const styleEvent = (event: BigCalendarEventType) => {
  const style = {
    background: event.bgColor,
    borderRadius: '4px',
    border: '0px',
    display: 'block',
    fontSize: '13px',
    color: '#ffffff',
    textDecoration: event.isSuspended ? 'line-through' : 'none',
  };
  return {
    style: style,
  };
};

/**
 * The Calendar component.
 * @param events The events to display in the calendar.
 * @see {@link https://github.com/jquense/react-big-calendar} for more information about the react-big-calendar component.
 * @returns The Calendar component.
 */
const CalendarForEnrrolling = ({
  events,
  scholar,
}: {
  events: ActivitiesForEnrollement[];
  scholar: {
    id: string;
    name: string;
    email: string;
  };
}) => {
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);
  const [isCharging, setIsCharging] = useState(false);
  const d = useSession();

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const confirmationModal = useDisclosure();
  type T = keyof typeof Views;
  const localizer = momentLocalizer(moment);
  const { defaultDate, views } = useMemo(
    () => ({
      defaultDate: new Date(),
      views: Object.keys(Views).map((value: string) => Views[value as T]),
    }),
    []
  );
  return (
    <>
      <BigCalendar
        className="h-full w-full overflow-y-scroll overflow:-moz-scrollbars-none"
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        defaultDate={defaultDate}
        views={views}
        showMultiDayTimes
        eventPropGetter={styleEvent}
        popup
        onSelectEvent={(event) => {
          setSelectedEvent(event);
          onOpen();
        }}
        messages={{
          month: 'Mes',
          day: 'Día',
          today: 'Hoy',
          week: 'Semana',
          work_week: 'Semana Laboral',
          previous: 'Atrás',
          next: 'Siguiente',
        }}
      />
      <BasicModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="lg"
        link={`/becario/${
          selectedEvent?.level ? 'chats' : 'actividadesFormativas'
        }/${selectedEvent?.id}`}
        title={`${selectedEvent?.title}`}
        Content={() => (
          <div className="flex flex-col gap-2 px-4">
            <div className="flex gap-2">
              <p className="font-bold">Fecha:</p>
              <p>
                <DisplayDate date={selectedEvent?.start} />
              </p>
            </div>
            <div className="flex gap-1">
              <p className="font-bold">Horario:</p>
              <p>
                de <DisplayTime time={selectedEvent.start} /> hasta las{' '}
                <DisplayTime time={selectedEvent.end} />
              </p>
            </div>

            <div>
              <p className="font-bold">
                {selectedEvent.speakerIds.length > 1 ? 'Facilitadores' : 'Facilitador'}
              </p>
              <SpeakersColumnWidget
                speakerIds={selectedEvent.speakerIds}
                speakerImages={selectedEvent.speakerImages}
                speakerNames={selectedEvent.speakerNames}
                speakersCompany={selectedEvent.speakersCompany}
                speakerKind={selectedEvent.speakerKind}
              />
            </div>
            <div className="flex gap-1">
              <p className="font-bold">Modalidad:</p>
              <p>{selectedEvent.modality}</p>
            </div>
            <div className="flex gap-1">
              <p className="font-bold">
                {selectedEvent.modality === 'ONLINE' ? 'Plataforma' : 'Lugar'}
              </p>
              <span className="inline">{selectedEvent.platform}</span>
            </div>

            {selectedEvent.level && (
              <div className="flex gap-1">
                <p className="font-bold">Nivel</p>
                <span className="inline">{selectedEvent.level}</span>
              </div>
            )}
            {selectedEvent.skill && (
              <>
                <div className="flex gap-1">
                  <p className="font-bold">Competencia:</p>
                  <p>{selectedEvent.skill}</p>
                </div>
                <div className="flex gap-1">
                  <p className="font-bold">Año:</p>
                  <p>{selectedEvent.year}</p>
                </div>
              </>
            )}
            <div className="flex gap-1">
              <p className="font-bold">Cupos disponibles:</p>
              <p>{selectedEvent.avalibleSpots}</p>
            </div>
            <div className="flex gap-1">
              <p className="font-bold">Cupos ocupados:</p>
              <p>{selectedEvent.enrolledScholars}</p>
            </div>
            <p>{selectedEvent?.description}</p>
          </div>
        )}
        isButtonDisabled={selectedEvent?.isFull}
        onConfirm={async () => confirmationModal.onOpen()}
        confirmText={selectedEvent?.isFull ? 'Cupos agotados' : 'Inscribirse'}
      />
      <BasicModal
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
        isButtonDisabled={selectedEvent?.isFull || isCharging}
        onConfirm={async () => {
          setIsCharging(true)
          toast.promise(
            handleEnrollment(
              selectedEvent.id,
              scholar.id,
              selectedEvent.eventId,
              selectedEvent.kindOfActivity,
              scholar.email
            ),
            {
              pending: 'Confirmando',
              success: 'Inscripción exitosa',
              error: 'Error al inscribirte en la actividad. Inténtalo de nuevo más tarde.',
            }
          );
          await sendGenericEmail(
            createEnrollementConfirmationMessage(
              scholar.name,
              `www.programaexcelencia.org/becario/actividadesFormativas/${selectedEvent.id}`,
              selectedEvent.originalTitle
            ),
            scholar.email,
            'Confirmacion de inscripción'
          );
          
          confirmationModal.onClose();
          onClose();
          setIsCharging(false)
        }}
        confirmText="Confirmar Inscripción"
      />
    </>
  );
};

export default CalendarForEnrrolling;
