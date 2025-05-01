import { Avatar, Card, CardBody } from '@nextui-org/react';
import { Speaker } from '@prisma/client';

export const SpeakerCard = ({ speakers }: { speakers: Speaker[] }) => (
  <>
    {speakers.map((speaker) => (
      <Card radius="sm">
        <CardBody>
          <div className="flex items-center">
            <Avatar
              size="sm"
              className="mr-2"
              src={speaker.image ?? undefined}
              alt={`${speaker.first_names} ${speaker.last_names}`}
              fallback={speaker.first_names.charAt(0)}
            />
            <div>
              <p className="font-medium text-sm">{`${speaker.first_names.split(' ')[0]} ${speaker.last_names.split(' ')[0]}`}</p>
              {speaker.job_title && (
                <p className="text-xs text-muted-foreground">{speaker.job_title}</p>
              )}
              {speaker.job_company && (
                <p className="text-xs text-muted-foreground">{speaker.job_company}</p>
              )}
            </div>
          </div>
        </CardBody>
      </Card>
    ))}
  </>
);
