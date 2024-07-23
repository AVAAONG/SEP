import { CalendarDaysIcon } from '@heroicons/react/24/outline';
import { JsonValue } from '@prisma/client/runtime/library';

const PROBATION_KEYS_MAP: Record<string, string> = {
  cva: 'CVA',
  chats: 'Chat clubs de inglés',
  average: 'Promedio',
  workshops: 'Actividades formativas',
  year_in_career: 'Año en la carrera',
  internal_volunteering_hours: 'Horas de voluntariado',
};

export const renderDateInfo = (label: string, date: Date) => (
  <div>
    <h3 className="text-base md:text-lg font-semibold leading-none tracking-tight">{label}</h3>
    <p>
      <CalendarDaysIcon className="inline w-5 h-5" /> {formatDate(date)}
    </p>
  </div>
);

export const formatDate = (date: string | Date): string => {
  return new Date(date).toLocaleDateString('es-VE', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
};

export const renderInfoSection = (title: string, data: JsonValue) => (
  <div>
    <h3 className="text-base md:text-lg font-semibold leading-none tracking-tight">{title}</h3>
    <div className="flex flex-col md:flex-row gap-2 divide-x-4 divide-yellow-800 mt-2">
      {Object.entries(data).map(([key, value], index) => (
        <div key={index} className="px-2 flex flex-col gap-1">
          <h4 className="text-base font-semibold leading-none tracking-tight">
            {PROBATION_KEYS_MAP[key] || key}
          </h4>
          <p>{value}</p>
        </div>
      ))}
    </div>
  </div>
);
