import { UsersIcon } from '@heroicons/react/24/outline';
import { Card, CardBody } from '@nextui-org/react';

import { ChatAttendance, VolunteerAttendance, WorkshopAttendance } from '@prisma/client';

type ScholarActivityAttendance = WorkshopAttendance[] | ChatAttendance[] | VolunteerAttendance[];

export const countScholarStatusesInActivity = (
  scholarActivityAtendance: ScholarActivityAttendance
) => {
  const attendanceCounts = scholarActivityAtendance?.reduce(
    (counts, scholar_att) => {
      switch (scholar_att.attendance) {
        case 'ATTENDED':
          counts.attendedScholarsCount++;
          break;
        case 'NOT_ATTENDED':
          counts.unAttendedScholarsCount++;
          break;
        case 'CANCELLED':
          counts.cancelledScholarsCount++;
          break;
        case 'ENROLLED':
          counts.enroledScholars++;
          break;
        case 'JUSTIFY':
          counts.justifiedScolars++;
          break;
        default:
          break;
      }
      counts.total++;
      return counts;
    },
    {
      attendedScholarsCount: 0,
      unAttendedScholarsCount: 0,
      cancelledScholarsCount: 0,
      enroledScholars: 0,
      justifiedScolars: 0,
      total: 0,
    }
  );
  return attendanceCounts;
};

const ScholarAttendanceStatusCount = ({
  attendance,
}: {
  attendance: ScholarActivityAttendance;
}) => {
  const stats = countScholarStatusesInActivity(attendance);
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
      <Card radius="sm">
        <CardBody>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-500">Inscritos</span>
            <div className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 p-1.5 rounded-full">
              <UsersIcon className="h-4 w-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-blue-600">{stats.enroledScholars}</p>
        </CardBody>
      </Card>
      <Card radius="sm">
        <CardBody>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-500">Asistieron</span>
            <div className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300 p-1.5 rounded-full">
              <UsersIcon className="h-4 w-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-emerald-600">{stats.attendedScholarsCount}</p>
        </CardBody>
      </Card>

      <Card radius="sm">
        <CardBody>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-500">Cancelados</span>
            <div className="bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300 p-1.5 rounded-full">
              <UsersIcon className="h-4 w-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-orange-600">{stats.cancelledScholarsCount}</p>
        </CardBody>
      </Card>
      <Card radius="sm">
        <CardBody>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-500">No Asistieron</span>
            <div className="bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300 p-1.5 rounded-full">
              <UsersIcon className="h-4 w-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-red-600">{stats.unAttendedScholarsCount}</p>
          <div className="flex items-center mt-1">
            <span className="text-xs text-slate-500">Justificados:</span>
            <span className="text-xs font-medium ml-1 text-emerald-600">
              {stats.justifiedScolars}
            </span>
          </div>
        </CardBody>
      </Card>
      <Card radius="sm">
        <CardBody>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-500">Total</span>
            <div className="bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 p-1.5 rounded-full">
              <UsersIcon className="h-4 w-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-700 dark:text-slate-300">{stats.total}</p>
        </CardBody>
      </Card>
    </div>
  );
};

export default ScholarAttendanceStatusCount;
