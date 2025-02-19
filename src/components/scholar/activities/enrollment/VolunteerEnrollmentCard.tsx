'use client';
import DisplayDate from '@/components/DisplayDate';
import DisplayTime from '@/components/DisplayTime';
import {
  CalendarDaysIcon,
  ClockIcon,
  InformationCircleIcon,
  MapPinIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Avatar } from "@heroui/avatar";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Tooltip } from "@heroui/react";
import Link from 'next/link';
import { volunterIcon } from 'public/svgs/svgs';
import React from 'react';
import EnrollmentDialog from './common/EnrollmentDialog';
import { VolunteerEnrollePage } from './lib/formatActivities';

interface VolunteerEnrollmentPageProps {
  activity: VolunteerEnrollePage;
  scholar: {
    id: string;
    name: string;
    email: string;
  };
}

const VolunteerEnrollmentCard: React.FC<VolunteerEnrollmentPageProps> = ({ activity, scholar }) => {
  const {
    id,
    title,
    modality,
    platform,
    start_dates,
    end_dates,
    description,
    kindOfActivity,
    eventId,
    availableSpots,
    enroledScholars,
    activityStatus,
    project,
    beneficiary,
    kind_of_volunteer,
    supervisor,
  } = activity;

  return (
    <>
      <Card className="min-w-[350px] max-w-[350px]" radius="sm">
        <CardHeader className="justify-between">
          <Link className="max-w-fit truncate" href={`/becario/voluntariado/${id}`}>
            <div className="flex items-center gap-3 max-w-fit truncate">
              <div>
                <Avatar
                  icon={volunterIcon()}
                  radius="sm"
                  size="md"
                  classNames={{
                    icon: 'border-green-500 bg-green-500  text-white p-1',
                    base: 'border-green-500',
                    img: 'border-green-500',
                  }}
                />
              </div>
              <div className="flex flex-col gap-1 items-start justify-center">
                <Tooltip content={title}>
                  <h3 className="text-small font-semibold leading-none  text-ellipsis">{title}</h3>
                </Tooltip>
                <h4 className="text-small tracking-tight text-default-400">
                  Supervisor: {supervisor} ({project})
                </h4>
              </div>
            </div>
          </Link>
        </CardHeader>
        <CardBody className="flex flex-col gap-2 px-3 py-2  text-tiny">
          <div className="flex gap-1">
            <CalendarDaysIcon className="w-4 h-4 " />
            <h5 className=" tracking-tight text-default-400">
              <DisplayDate date={start_dates[0].toISOString()} />
            </h5>
          </div>
          <div className="flex gap-1">
            <ClockIcon className="w-4 h-4" />
            <h5 className=" tracking-tight text-default-400">
              <DisplayTime time={start_dates[0].toISOString()} /> a{' '}
              <DisplayTime time={end_dates[0].toISOString()} />
            </h5>
          </div>
          <div className="flex gap-1">
            <UserCircleIcon className="w-4 h-4" />
            <h5 className="tracking-tight text-default-400">
              {availableSpots <= 0
                ? 'No hay cupos disponibles :('
                : `${availableSpots} cupos disponibles`}{' '}
            </h5>
          </div>
          <div className="flex gap-1">
            <div className="flex gap-1">
              <MapPinIcon className="w-4 h-4 " />
              <h5 className="tracking-tight text-default-400">{modality}</h5>
            </div>
            <div className="flex gap-1">
              <MapPinIcon className="w-4 h-4" />
              <h5 className="tracking-tight text-default-400">{platform}</h5>
            </div>
          </div>
        </CardBody>
        <CardFooter className="justify-between">
          <div className="flex flex-col space-y-1 text-tiny">
            <div className="flex gap-1.5">
              <Tooltip content="Tipo de voluntariado">
                <InformationCircleIcon className="w-4 h-4 " />
              </Tooltip>
              <h5 className="tracking-tight text-default-400">{kind_of_volunteer}</h5>
            </div>
          </div>
          <EnrollmentDialog
            activityId={id}
            activityTitle={title}
            eventId={eventId}
            isButtonDisabled={availableSpots <= 0}
            kindOfActivity={kindOfActivity}
            scholarEmail={scholar.email}
            scholarId={scholar.id}
            scholarName={scholar.name}
          />
        </CardFooter>
      </Card>
    </>
  );
};

export default VolunteerEnrollmentCard;
