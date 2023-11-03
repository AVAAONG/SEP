'use client';
import WorkshopCreationForm from '@/components/admin/WorkshopForm';
import ScheduledWorkshopsList from '@/components/admin/lists/2';
import { Workshop } from '@/types/Workshop';
import { BaseSyntheticEvent } from 'react';
import { useForm } from 'react-hook-form';
import shortUUID from 'short-uuid';

interface WorkshopForm extends Workshop {
  subject?: string;
  group?: string;
}

const Page = () => {
  const fetcher = (...args: RequestInfo[] | URL[]) => fetch([...args]).then((res) => res.json());
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<WorkshopForm>();
  // const workshopResponse = useSWR('/admin/api/workshops', fetcher, {
  //   fallbackData: [],
  //   refreshInterval: 10000,
  // });

  const dumyData = [
    {
      id: '1',
      title: 'Taller de prueba',
      pensum: 'Pensum 1',
      date: '2021-09-10',
      startHour: '10:00',
      endHour: '12:00',
      speaker: 'Kevin',
      asociated_skill: 'LEADERSHIP',
      spots: 20,
      year: ['I', 'II', 'III', 'IV', 'V', 'V+'],
      modality: 'ONLINE',
      platform: 'ZOOM',
      workshopYear: 'Becarios I',
      description: 'Taller de prueba',
    },
    {
      id: '2',
      title: 'Taller de prueba 2',
      pensum: 'Pensum 1',
      date: '2021-09-10',
      startHour: '10:00',
      endHour: '12:00',
      speaker: 'Kevin',
      asociated_skill: 'LEADERSHIP',
      spots: 20,
      year: ['I', 'II', 'III', 'IV', 'V', 'V+'],
      modality: 'ONLINE',
      platform: 'ZOOM',
      workshopYear: 'Becarios I',
      description: 'Taller de prueba',
    },
    {
      id: '3',
      title: 'Taller de prueba 2',
      pensum: 'Pensum 1',
      date: '2021-09-10',
      startHour: '10:00',
      endHour: '12:00',
      speaker: 'Kevin',
      asociated_skill: 'LEADERSHIP',
      spots: 20,
      year: ['I', 'II', 'III', 'IV', 'V', 'V+'],
      modality: 'ONLINE',
      platform: 'ZOOM',
      workshopYear: 'Becarios I',
      description: 'Taller de prueba',
    },
  ];

  const deleteEntry = async (inputId: shortUUID.SUUID, calendarId: string) => {
    await fetch('/admin/api/workshops/delete', {
      method: 'POST',
      body: JSON.stringify({ id: inputId, calendarId }),
    });
  };

  const editEntry = (inputId: shortUUID.SUUID) => {
    const workshops = workshopResponse.data.filter((workshop: Workshop) => workshop.id === inputId);
    const {
      title,
      pensum,
      date,
      startHour,
      endHour,
      speaker,
      spots,
      modality,
      platform,
      workshopYear,
      description,
    } = workshops[0];
    reset({
      title,
      pensum,
      date,
      startHour,
      endHour,
      speaker,
      spots,
      modality,
      platform,
      workshopYear,
      description,
    });
    deleteEntry(inputId);
  };

  const sendWorkshops = async (data: any, event: BaseSyntheticEvent) => {
    event.preventDefault();
    const payload = {
      group: data.group,
      workshops: workshopResponse.data,
    };
    const respin = await fetch('/api/google/form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
  };

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className=" w-full md:w-1/2">
        <WorkshopCreationForm />
      </div>
      <div className="w-full md:w-1/2 p-4 pt-0 flex flex-col items-center">
        {/* {workshopResponse.isLoading || workshopResponse.data.length === 0 ? (
          <></>
        ) : ( */}
        <ScheduledWorkshopsList workshops={dumyData || []} />
        {/* )} */}
      </div>
    </div>
  );
};

export default Page;
