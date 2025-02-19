import {
  parseModalityFromDatabase,
  parsePlatformFromDatabase,
  parseVolunteerProject,
} from '@/lib/utils2';
import { Button, Checkbox, Tooltip, cn } from "@heroui/react";
import { Volunteer } from '@prisma/client';
import moment from 'moment-timezone';
import 'moment/locale/es';
interface ScheduledVolunteerCardI {
  Volunteer: Volunteer;
  children: React.ReactNode;
}

const ScheduledVolunteerCard: React.FC<ScheduledVolunteerCardI> = ({ Volunteer, children }) => {
  const {
    id,
    title,
    start_dates,
    end_dates,
    avalible_spots,
    modality,
    platform,
    kind_of_volunteer,
    VolunteerProject,
  } = Volunteer;
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
      <div className="w-full grid grid-cols-6 content-between place-content-between gap-2 items-center">
        <div className="col-span-2 text-start">
          <Tooltip showArrow={true} content={title}>
            <Button
              className="bg-transparent h-unit-5 p-0 m-0 font-medium text-start"
              variant="flat"
            >
              {title}
            </Button>
          </Tooltip>
          <div className="p-0 h-unit-5 text-sm">
            {kind_of_volunteer === 'INTERNAL' ? 'Interno' : 'Externo'}
          </div>
        </div>
        <div className="text-center">
          <p className="text-sm font-medium ">
            {moment(start_dates[0]).tz('America/Caracas').locale('es').format('D MMMM')}
          </p>
          <p className="text-xs   ">
            De {moment(start_dates[0]).tz('America/Caracas').format('hh:mm A')} a{' '}
            {moment(end_dates[0]).tz('America/Caracas').format('hh:mm A')}
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs">{parseVolunteerProject(VolunteerProject)}</p>
          <p className="text-xs">{avalible_spots} cupos</p>
        </div>
        <div className="text-center">
          <p className="text-sm font-medium ">{parseModalityFromDatabase(modality)} </p>
          <p className="text-xs">{parsePlatformFromDatabase(platform)}</p>
        </div>
        <div className="w-full flex flex-col items-end">{children}</div>
      </div>
    </Checkbox>
  );
};

export default ScheduledVolunteerCard;
