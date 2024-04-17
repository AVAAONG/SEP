import { WorkshopWithSpeaker } from '@/lib/db/types';
import {
  parseModalityFromDatabase,
  parsePlatformFromDatabase,
  parseSkillFromDatabase,
} from '@/lib/utils2';
import { Button, Checkbox, Tooltip, cn } from '@nextui-org/react';
import moment from 'moment-timezone';
import 'moment/locale/es';
interface ScheduledWorkshopCardI {
  workshop: WorkshopWithSpeaker;
  children: React.ReactNode;
}

const ScheduledWorkshopCard: React.FC<ScheduledWorkshopCardI> = ({ workshop, children }) => {
  const {
    title,
    id,
    start_dates,
    end_dates,
    speaker,
    avalible_spots,
    asociated_skill,
    year,
    modality,
    platform,
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
            <Button className="bg-transparent h-unit-5 p-0 m-0 font-medium" variant="flat">
              {title}
            </Button>
          </Tooltip>
          {speaker && (
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
                  {speaker[0].first_names.split(' ')[0] + ' ' + speaker[0].last_names.split(' ')[0]}
                </Button>
              </Tooltip>
            </p>
          )}
        </div>
        <div className="flex-1 min-w-0 text-center">
          <p className="text-sm font-medium ">
            {moment(start_dates[0]).tz('America/Caracas').locale('es').format('D MMMM')}
          </p>
          <p className="text-xs   ">
            De {moment(start_dates[0]).tz('America/Caracas').format('hh:mm A')} a{' '}
            {moment(end_dates[0]).tz('America/Caracas').format('hh:mm A')}
          </p>
        </div>
        <div className="flex-1 min-w-0 text-center">
          <p className="text-xs">{parseSkillFromDatabase(asociated_skill)}</p>
          <p className="text-xs">{avalible_spots} cupos</p>
          <p className="text-xs">{year.join(', ')} Año</p>
        </div>
        <div className="flex-1 min-w-0 text-center">
          <p className="text-sm font-medium ">{parseModalityFromDatabase(modality)} </p>
          <p className="text-xs">{parsePlatformFromDatabase(platform)}</p>
        </div>
        <div className=" flex flex-col w-6">{children}</div>
      </div>
    </Checkbox>
  );
};

export default ScheduledWorkshopCard;
