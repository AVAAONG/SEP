'use client';
import { XIcon, EditIcon } from '@/assets/svgs';
import { SUUID } from 'short-uuid';
import {
  Modality,
  Skill,
  Workshop,
  WorkshopSpeaker,
  WorkshopTempData,
} from '@prisma/client';
import { useForm } from 'react-hook-form';
import { BaseSyntheticEvent, useState } from 'react';
import WorkshopTooltip from '../WorkshopTooltip';

interface WorkshopsListProps {
  workshopData: (Workshop & {
    speaker: WorkshopSpeaker[];
    tempData: WorkshopTempData | null;
  })[];
  deleteEntry: (id: SUUID, calendarId: string) => void;
  editEntry: (id: SUUID) => void;
}

const mapWorkshopSkill = (skill: Skill): string => {
  switch (skill) {
    case 'CITIZEN_EXERCISE':
      return 'Ejercicio Ciudadano';
    case 'ENTREPRENEURSHIP':
      return 'Emprendimiento';
    case 'ICT':
      return 'TIC';
    case 'LEADERSHIP':
      return 'Liderazgo';
    case 'SELF_MANAGEMENT':
      return 'Gerencia de si mismo';
    default:
      return 'N/A';
  }
};

const mapWorkshopModality = (modality: Modality) => {
  switch (modality) {
    case 'HYBRID':
      return 'Híbrido';
    case 'VIRTUAL':
      return 'Virutual';
    case 'IN_PERSON':
      return 'Presencial';
    default:
      return 'N/A';
  }
};

const WorkshopsList: React.FC<WorkshopsListProps> = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<{ selectedWorkshopsToSend: string[] }>();
  const { workshopData, deleteEntry, editEntry } = props;

  const sendWorkshops = async (
    data: { selectedWorkshopsToSend: string[] },
    event: BaseSyntheticEvent<object, any, any> | undefined
  ) => {
    const { selectedWorkshopsToSend } = data;
    if (event === undefined) return;
    event.preventDefault();
    await fetch('/admin/api/workshops', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(selectedWorkshopsToSend),
    });
    reset();
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(
          async (data, event) => await sendWorkshops(data, event!)
        )}
        className="flow-root w-full "
      >
        <ul role="list" className="flex flex-col gap-2">
          {workshopData.map((workshop) => {
            const {
              speaker,
              start_dates,
              end_dates,
              title,
              id,
              skill,
              avalible_spots,
              year,
              platform,
              modality,
              calendar_id,
            } = workshop;
            console.log(id);
            return (
              <li
                key={id}
                className="py-2 focus:outline-none focus:outline-offset-0 px-3 rounded-md w-full bg-slate-900 flex items-center justify-center gap-2"
              >
                <div className="w-4">
                  <span className="sr-only">Enviar Taller</span>
                  <input
                    {...register('selectedWorkshopsToSend')}
                    type="checkbox"
                    className="w-3 h-3 bg-emerald-900 accent-green-500 text-emerald-600 border-gray-300 focus:ring-0"
                    value={id}
                  />
                </div>
                <button
                  onClick={() => {
                    editEntry(id as SUUID);
                  }}
                  type="button"
                  className="w-4"
                >
                  <EditIcon />
                  <span className="sr-only">Editar taller</span>
                </button>

                <WorkshopTooltip speaker={speaker} title={title} />
                <div className="flex-1 min-w-0 text-center">
                  <p className="text-sm font-medium truncate text-white">
                    {new Date(start_dates[0]).toLocaleString('es-ES', {
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                  <p className="text-xs text-gray-500 truncate ">
                    De{' '}
                    {new Date(end_dates[0]).toLocaleString('es-ES', {
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
                  <p className="text-sm font-medium truncate text-white">
                    {mapWorkshopSkill(skill)}
                  </p>
                  <p className="text-xs text-gray-500 truncate ">
                    {avalible_spots} cupos
                  </p>
                  <p className="text-xs text-gray-500 truncate ">
                    {year.toString().replaceAll(',', ' y ')} Año
                  </p>
                </div>
                <div className="flex-1 min-w-0 text-center">
                  <p className="text-sm font-medium truncate text-white">
                    {mapWorkshopModality(modality)}
                  </p>
                  <p className="text-xs text-gray-500 truncate ">{platform}</p>
                </div>
                <button
                  onClick={() => {
                    deleteEntry(id as SUUID, calendar_id!);
                  }}
                  type="button"
                  className="w-4"
                >
                  <XIcon />
                  <span className="sr-only">Eliminar taller</span>
                </button>
              </li>
            );
          })}
        </ul>
        <div className="w-full flex justify-center items-center">
          <button
            type="submit"
            className="bg-green-600 text-white rounded-lg col-span-2 max-w-fit px-5 py-2 self-center mt-4"
          >
            Enviar Talleres
          </button>
        </div>
      </form>
    </>
  );
};

export default WorkshopsList;
