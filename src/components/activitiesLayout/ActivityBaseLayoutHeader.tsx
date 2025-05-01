import { getActivitySpanishPathByType, getEnrolledScholarsCount } from '@/lib/activities/utils';
import { getServerSession } from '@/lib/auth/authOptions';
import {
  parseChatLevelFromDatabase,
  parseModalityFromDatabase,
  parseScholarAttendanceFromDatabase,
  parseSkillFromDatabase,
  parseWorkshopKindFromDatabase,
  parseWorkshopStatusFromDatabase,
  parseWorkshopYearFromDatabase,
} from '@/lib/utils2';
import {
  ArrowLeftIcon,
  BriefcaseIcon,
  InformationCircleIcon,
  UsersIcon,
  VideoCameraIcon,
} from '@heroicons/react/24/outline';
import { Chip, Divider, Tooltip } from '@nextui-org/react';
import { ActivityStatus, Modality, Prisma, ScholarAttendance } from '@prisma/client';
import Link from 'next/link';

const getStatusColor = (status: string) => {
  switch (status) {
    case ActivityStatus.SCHEDULED:
    case ActivityStatus.SENT:
    case ScholarAttendance.ENROLLED:
      return 'bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-300';
    case ScholarAttendance.ATTENDED:
    case ActivityStatus.ATTENDANCE_CHECKED:
      return 'bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-300';
    case ActivityStatus.SUSPENDED:
    case ScholarAttendance.CANCELLED:
    case ScholarAttendance.NOT_ATTENDED:
      return 'bg-red-50 text-red-700 dark:bg-red-900 dark:text-red-300';
    case ScholarAttendance.JUSTIFY:
      return 'bg-orange-50 text-orange-700 dark:bg-orange-900 dark:text-orange-300';
    default:
      return 'bg-slate-50 text-slate-700 dark:bg-slate-800 dark:text-slate-300';
  }
};

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

export const ActivityBaseLayoutHeader = async ({ activity }: { activity: ActivityType }) => {
  const session = await getServerSession();
  const currentScholarAttendance = activity.scholar_attendance.find(
    (a) => a.scholar.scholar.id === session?.id
  );

  const link = getActivitySpanishPathByType(activity);

  return (
    <>
      {/* Breadcrumb */}
      <div>
        <Link
          href={`/becario/${link}`}
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeftIcon className="mr-2 h-3.5 w-3.5" />
          Regresar al historial de actividades
        </Link>
      </div>

      <div className="space-y-5">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              {'kindOfWorkshop' in activity && (
                <Tooltip content="Tipo de actividad formativa" size="sm" radius="sm">
                  <Chip size="sm" variant="bordered">
                    {parseWorkshopKindFromDatabase(activity.kindOfWorkshop)}
                  </Chip>
                </Tooltip>
              )}
              <Tooltip content="Estatus de la actividad" radius="sm" size="sm">
                <Chip
                  size="sm"
                  className={`rounded-full font-medium ${getStatusColor(activity.activity_status)}`}
                >
                  {parseWorkshopStatusFromDatabase(activity.activity_status)}
                </Chip>
              </Tooltip>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-emerald-600 mt-2">
              {activity.title}
            </h1>
          </div>
          {session?.kindOfUser === 'SCHOLAR' && currentScholarAttendance && (
            <Tooltip content="Estatus de la asistencia" radius="sm" size="sm">
              <Chip
                size="sm"
                className={`rounded-full text-sm px-4 py-1 font-medium ${getStatusColor(currentScholarAttendance.attendance)}`}
              >
                {parseScholarAttendanceFromDatabase(currentScholarAttendance.attendance)}
              </Chip>
            </Tooltip>
          )}
        </div>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 text-sm">
          <div className="flex items-center">
            <InformationCircleIcon className="h-4 w-4 mr-2 text-emerald-600" />
            <span className="text-muted-foreground">Modalidad:</span>
            <span className="ml-1 font-medium">{parseModalityFromDatabase(activity.modality)}</span>
          </div>

          {'asociated_skill' in activity && (
            <div className="flex items-center">
              <BriefcaseIcon className="h-4 w-4 mr-2 text-emerald-600" />
              <span className="text-muted-foreground">Competencia:</span>
              <span className="ml-1 font-medium">
                {parseSkillFromDatabase(activity.asociated_skill)}
              </span>
            </div>
          )}
          {'year' in activity && (
            <div className="flex items-center">
              <InformationCircleIcon className="h-4 w-4 mr-2 text-emerald-600" />
              <span className="text-muted-foreground">Año:</span>
              <span className="ml-1 font-medium">
                {parseWorkshopYearFromDatabase(activity.year)}
              </span>
            </div>
          )}
          {'level' in activity && (
            <div className="flex items-center">
              <InformationCircleIcon className="h-4 w-4 mr-2 text-emerald-600" />
              <span className="text-muted-foreground">Nivel:</span>
              <span className="ml-1 font-medium">{parseChatLevelFromDatabase(activity.level)}</span>
            </div>
          )}

          <div className="flex items-center">
            <UsersIcon className="h-4 w-4 mr-2 text-emerald-600" />
            <span className="text-muted-foreground">Capacidad:</span>
            <span className="ml-1 font-medium">
              {getEnrolledScholarsCount(activity)} / {activity.avalible_spots}
            </span>
          </div>

          {(activity.modality === Modality.ONLINE || activity.modality === Modality.HYBRID) && (
            <div className="flex items-center">
              <VideoCameraIcon className="h-4 w-4 mr-2 text-emerald-600" />
              <span className="text-muted-foreground">Plataforma:</span>
              <span className="ml-1 font-medium">{activity.platform}</span>
            </div>
          )}
        </div>

        <Divider />
      </div>
    </>
  );
};
