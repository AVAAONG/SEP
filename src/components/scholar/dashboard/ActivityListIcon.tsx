import { chatIcon, volunterIcon, workshopIcon } from '../../../../public/svgs/svgs';

interface ActivityListIconProps {
  kindOfActivity: 'workshop' | 'chat' | 'volunteer';
}

const ActivityListIcon = ({ kindOfActivity }: ActivityListIconProps) => {
  if (kindOfActivity === 'workshop') {
    return (
      <div className="p-1 text-white inline-flex items-center justify-center flex-shrink-0 w-8 h-8 bg-blue-600 rounded-md dark:bg-blue-800">
        {workshopIcon()}
        <span className="sr-only">Check icon</span>
      </div>
    );
  } else if (kindOfActivity === 'chat') {
    return (
      <div className="p-1 text-white inline-flex items-center justify-center flex-shrink-0 w-8 h-8 bg-red-600 rounded-md dark:bg-red-800">
        {chatIcon()}
        <span className="sr-only">Check icon</span>
      </div>
    );
  } else if (kindOfActivity === 'volunteer') {
    return (
      <div className="p-1 text-white inline-flex items-center justify-center flex-shrink-0 w-8 h-8 bg-green-600 rounded-md dark:bg-green-800">
        {volunterIcon()}
        <span className="sr-only">Check icon</span>
      </div>
    );
  } else {
    return null;
  }
};

export default ActivityListIcon;
