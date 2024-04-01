import { Avatar, AvatarGroup, Tooltip } from '@nextui-org/react';
import { KindOfSpeaker } from '@prisma/client';
import Link from 'next/link';
import { SpeakerColumnWidgetCard } from './SpeakerWidgetImage';

type SpeakersColumnWidgetProps = {
  speakerNames: string[];
  speakerIds: (string | null)[];
  speakersCompany: (string | null)[];
  speakerImages: (string | undefined)[];
  speakerKind: (KindOfSpeaker | null)[];
};
const SpeakersColumnWidget: React.FC<SpeakersColumnWidgetProps> = ({
  speakerNames,
  speakerIds,
  speakersCompany,
  speakerImages,
  speakerKind,
}) => {
  const baseLink =
    speakerKind && speakerKind[0] === 'WORKSHOPS' ? 'actividadesFormativas' : 'chats';
  if (speakerNames?.length < 2)
    return (
      <Link
        href={speakerIds[0] ? `${baseLink}/facilitadores/${speakerIds[0]}` : ''}
        className="flex items-center"
      >
        <div className="flex-shrink-0 w-8 h-8">
          <Avatar
            src={speakerImages[0]}
            className="w-8 h-8"
            classNames={{ base: 'text-white dark:text-secondary-dark' }}
          />
        </div>
        <div className="ml-2 text-start">
          <span className="text-sm font-medium text-gray-900 dark:text-slate-100">
            {speakerNames?.[0]}
          </span>
          <div className="w-32 overflow-x-scroll text-xs font-medium text-gray-400 dark:text-slate-400 uppercase">
            {speakersCompany?.[0]}
          </div>
        </div>
      </Link>
    );
  else {
    return (
      <AvatarGroup max={2}>
        {speakerNames?.map((speakerName: string, index: number) => {
          return (
            <Tooltip
              key={index}
              showArrow
              content={
                <SpeakerColumnWidgetCard
                  speakerCompany={speakersCompany[index]}
                  speakerImage={speakerImages[index]}
                  speakerName={speakerName}
                />
              }
            >
              <AvatarGroup max={2}>
                <Link
                  href={speakerIds[index] ? `${baseLink}/facilitadores/${speakerIds[index]}` : ''}
                >
                  <Avatar
                    classNames={{ base: 'text-white dark:text-secondary-dark' }}
                    className="w-8 h-8"
                    src={speakerImages[index]}
                  ></Avatar>
                </Link>
              </AvatarGroup>
            </Tooltip>
          );
        })}
      </AvatarGroup>
    );
  }
};

export default SpeakersColumnWidget;
