import { determineActivityKindByTipe, getEnrolledScholarsCount } from '@/lib/activities/utils';
import { getServerSession } from '@/lib/auth/authOptions';
import {
  getNotEnrolledScholarsInChat,
  getNotEnrolledScholarsInWorkshop,
} from '@/lib/db/utils/users';
import { Card, CardBody, Progress } from '@nextui-org/react';
import { Prisma } from '@prisma/client';
import React from 'react';
import CeaseSpotButtonProps from '../ceaseSpot/ceaseSpotButton';
import ScholarActivitySatisfactionForm from '../scholar/activitySatisfactionForm/ScholarActivitySatisfactionForm';
import { SpeakerCard } from './SpeakerCard';

const activityInclude = {
  speaker: true,
  scholar_attendance: {
    include: {
      scholar: {
        include: {
          scholar: true,
        },
      },
    },
  },
} satisfies Prisma.WorkshopInclude & Prisma.ChatInclude;

type WorkshopWithDetails = Prisma.WorkshopGetPayload<{
  include: typeof activityInclude;
}>;

type ChatWithDetails = Prisma.ChatGetPayload<{
  include: typeof activityInclude;
}>;

type ActivityType = WorkshopWithDetails | ChatWithDetails;

export const ActivitySidebar = async ({
  activity,
  children,
}: {
  activity: ActivityType;
  children?: React.ReactNode;
}) => {
  const session = await getServerSession();
  const currentScholarAttendance = activity.scholar_attendance.find(
    (a) => a.scholar.scholar.id === session?.id
  );
  const kindOfActivity = determineActivityKindByTipe(activity);

  let notEnrolledScholars;

  if (kindOfActivity === 'workshop') {
    notEnrolledScholars = await getNotEnrolledScholarsInWorkshop(activity.id);
  } else if (kindOfActivity === 'chat') {
    notEnrolledScholars = await getNotEnrolledScholarsInChat(activity.id);
  }

  const enrolledCount = getEnrolledScholarsCount(activity);

  return (
    <div className="space-y-8">
      {activity.speaker && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-emerald-600">
            {activity.speaker && activity.speaker.length && activity.speaker.length >= 2
              ? 'Facilitadores'
              : 'Facilitador'}
          </h2>
          <div
            className={
              activity.speaker.length >= 2
                ? 'grid gridcols-2 sm:grid-cols-3 md:grid-cols-2 gap-4'
                : 'grid grid-cols-1 gap-4'
            }
          >
            <SpeakerCard speakers={activity.speaker} />
          </div>
        </div>
      )}

      {/* Attendance */}

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-emerald-600">Asistencia</h2>
        <Card radius="sm">
          <CardBody>
            <div className="p-4 rounded-lg space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Capacidad</span>
                <span className="font-medium">
                  {enrolledCount} / {activity.avalible_spots}
                </span>
              </div>
              <Progress
                className="max-w-md"
                size="md"
                color="success"
                value={(enrolledCount / activity.avalible_spots) * 100}
              />
            </div>
          </CardBody>
        </Card>
      </div>
      {children}

      {session?.kindOfUser === 'SCHOLAR' && currentScholarAttendance && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-emerald-600">Acciones</h2>
          <div className="flex gap-4">
            {currentScholarAttendance.attendance === 'ENROLLED' && (
              <CeaseSpotButtonProps
                scholarWhoCeaseAttendance={currentScholarAttendance}
                kindOfActivity={kindOfActivity}
                activity={activity}
                scholarsToCeaseSpot={notEnrolledScholars}
              />
            )}
            {currentScholarAttendance.attendance === 'ATTENDED' && (
              <ScholarActivitySatisfactionForm
                attendanceId={currentScholarAttendance?.id}
                satisfactionFormFilled={currentScholarAttendance?.satisfaction_form_filled}
                workshopStatus={activity.activity_status}
                kindOfActivity={kindOfActivity}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};
