'use client';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import './calendar.css';

import { createEnrollementConfirmationMessage } from '@/lib/htmlConfirmationTemplate';
import { sendGenericEmail } from '@/lib/sendEmails';
import { handleEnrollment } from '@/lib/serverAction';
import {
  parseChatLevelFromDatabase,
  parseModalityFromDatabase,
  parseSkillFromDatabase,
} from '@/lib/utils2';
import { BigCalendarEventType } from '@/types/Calendar';
import { useDisclosure } from '@nextui-org/react';
import moment from 'moment';
import 'moment/locale/es';
import { useSession } from 'next-auth/react';
import { useMemo, useState } from 'react';
import { Calendar as BigCalendar, Views, momentLocalizer } from 'react-big-calendar';
import { toast } from 'react-toastify';
import BasicModal from '../BasicModal';
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
const CalendarForEnrrolling = ({ events, scholarName }: { events: any[]; scholarName: string }) => {
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);
  const d = useSession();

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
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
        title={`Inscribirse en: ${selectedEvent?.originalTitle}`}
        Content={() => (
          <div className="flex flex-col gap-2 px-4">
            <div className="flex gap-2">
              <p className="font-bold">Fecha:</p>
              <p>
                {selectedEvent?.start?.toLocaleDateString('es-ES', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </p>
            </div>
            <div className="flex gap-1">
              <p className="font-bold">Horario:</p>
              <p>
                de{' '}
                {selectedEvent?.start?.toLocaleTimeString('es-ES', {
                  hour: 'numeric',
                  minute: '2-digit',
                  hour12: true,
                })}{' '}
                hasta las{' '}
                {selectedEvent?.end?.toLocaleTimeString('es-ES', {
                  hour: 'numeric',
                  minute: '2-digit',
                  hour12: true,
                })}
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
              />
            </div>
            <div className="flex gap-1">
              <p className="font-bold">Modalidad:</p>
              <p>{parseModalityFromDatabase(selectedEvent.modality)}</p>
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
                <span className="inline">{parseChatLevelFromDatabase(selectedEvent.level)}</span>
              </div>
            )}
            {selectedEvent.skill && (
              <div className="flex gap-1">
                <p className="font-bold">Competencia:</p>
                <span>{parseSkillFromDatabase(selectedEvent.skill)}</span>
                <p className="font-bold">Año:</p>
                <span>{selectedEvent.year.join(', ')}</span>
                <p>{selectedEvent?.description}</p>
              </div>
            )}
            <div className="flex gap-1">
              <p className="font-bold">Cupos disponibles:</p>
              <p>{selectedEvent.spots}</p>
            </div>
            <div className="flex gap-1">
              <p className="font-bold">Cupos ocupados:</p>
              <p>{selectedEvent.attendees}</p>
            </div>
          </div>
        )}
        isButtonDisabled={selectedEvent?.isFull}
        onConfirm={async () => {
          toast.promise(
            handleEnrollment(
              selectedEvent.id,
              d.data.scholarId,
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
          onClose();
        }}
        confirmText={selectedEvent?.isFull ? 'Cupos agotados' : 'Inscribirse'}
      />
    </>
  );
};

export default CalendarForEnrrolling;
