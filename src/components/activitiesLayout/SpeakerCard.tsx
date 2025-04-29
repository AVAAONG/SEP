import { SpeakerColumnWidgetCard } from '@/components/SpeakerWidgetImage';
import { Avatar, AvatarGroup, Card, CardBody, Tooltip } from '@nextui-org/react';
import { Speaker } from '@prisma/client';
import Link from 'next/link';

export const SpeakerCard = ({ speakers }: { speakers: Speaker[] }) => {
  if (speakers.length === 1) {
    return (
      <Card radius="sm">
        <CardBody>
          <div className="flex items-center">
            <Avatar
              className="mr-4"
              src={speakers[0].image ?? undefined}
              alt={`${speakers[0].first_names} ${speakers[0].last_names}`}
              fallback={speakers[0].first_names.charAt(0)}
            />
            <div>
              <p className="font-medium">{`${speakers[0].first_names} ${speakers[0].last_names}`}</p>
              {speakers[0].job_title && (
                <p className="text-sm text-muted-foreground">{speakers[0].job_title}</p>
              )}
              {speakers[0].job_company && (
                <p className="text-sm text-muted-foreground">{speakers[0].job_company}</p>
              )}
            </div>
          </div>
        </CardBody>
      </Card>
    );
  } else {
    return (
      <>
        <Card radius="sm">
          <CardBody>
            <div className="flex items-center">
              <AvatarGroup max={2}>
                {speakers.map((speaker, index) => {
                  return (
                    <Tooltip
                      key={index}
                      showArrow
                      content={
                        <SpeakerColumnWidgetCard
                          speakerCompany={speaker.job_company}
                          speakerImage={speaker.image ?? undefined}
                          speakerName={`${speaker.first_names} ${speaker.last_names}`}
                        />
                      }
                    >
                      <AvatarGroup max={2}>
                        <Link href={speaker.id ? `becario/facilitadores/${speaker.id}` : ''}>
                          <Avatar
                            classNames={{ base: 'text-white dark:text-secondary-dark' }}
                            className="w-8 h-8"
                            src={speaker.image ?? undefined}
                          ></Avatar>
                        </Link>
                      </AvatarGroup>
                    </Tooltip>
                  );
                })}
              </AvatarGroup>
            </div>
          </CardBody>
        </Card>
      </>
    );
  }
};
