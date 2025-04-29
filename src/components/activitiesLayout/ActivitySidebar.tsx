import { determineActivityKindByTipe, getEnrolledScholarsCount } from '@/lib/activities/utils';
import { getServerSession } from '@/lib/auth/authOptions';
import {
  getNotEnrolledScholarsInChat,
  getNotEnrolledScholarsInWorkshop,
} from '@/lib/db/utils/users';
import { Progress } from '@nextui-org/react';
import { Prisma } from '@prisma/client';
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

export const ActivitySidebar = async ({ activity }: { activity: ActivityType }) => {
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
  return (
    <div className="space-y-8">
      {activity.speaker && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-emerald-600">
            {activity.speaker && activity.speaker.length && activity.speaker.length >= 2
              ? 'Facilitadores'
              : 'Facilitador'}
          </h2>
          <div className="space-y-3">
            <SpeakerCard speakers={activity.speaker} />
          </div>
        </div>
      )}

      {/* Attendance */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-emerald-600">Asistencia</h2>
        <div className="p-4 bg-slate-50 rounded-lg space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Capacidad</span>
            <span className="font-medium">
              {getEnrolledScholarsCount(activity)} / {activity.avalible_spots}
            </span>
          </div>
          <Progress
            className="max-w-md"
            size="md"
            color="success"
            value={(getEnrolledScholarsCount(activity) / activity.avalible_spots) * 100}
          />
        </div>
      </div>

      {session?.kindOfUser === 'SCHOLAR' && currentScholarAttendance && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-emerald-600">Acciones</h2>
          <div className="flex gap-4">
            {currentScholarAttendance.attendance === 'ENROLLED' && (
              <CeaseSpotButtonProps
                scholarWhoCeaseAttendance={currentScholarAttendance}
                kindOfActivity="workshop"
                activity={activity}
                scholarsToCeaseSpot={notEnrolledScholars}
              />
            )}
            {currentScholarAttendance.attendance === 'ATTENDED' && (
              <ScholarActivitySatisfactionForm
                attendanceId={currentScholarAttendance?.id}
                satisfactionFormFilled={currentScholarAttendance?.satisfaction_form_filled}
                workshopStatus={activity.activity_status}
                kindOfActivity="workshop"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};
