import { Avatar, Card, CardHeader } from '@nextui-org/react';
import React from 'react';

interface ISpeakerColumnWidgetCardProps {
  speakerName: string | null;
  speakerCompany: string | null;
  speakerImage: string | undefined;
}

export const SpeakerColumnWidgetCard: React.FC<ISpeakerColumnWidgetCardProps> = ({
  speakerName,
  speakerCompany,
  speakerImage,
}) => {
  return (
    <Card shadow="none" className="max-w-[300px] border-none bg-transparent">
      <CardHeader className="justify-between">
        <div className="flex gap-3">
          <Avatar
            classNames={{ base: 'text-white dark:text-secondary-dark' }}
            isBordered
            radius="full"
            size="md"
            src={speakerImage}
          />
          <div className="flex flex-col items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">
              {speakerName}
            </h4>
            <h5 className="text-small tracking-tight text-default-500 capitalize">
              {speakerCompany}
            </h5>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};
