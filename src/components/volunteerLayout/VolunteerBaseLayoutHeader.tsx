import { getEnrolledScholarsCount } from '@/lib/activities/utils';
import { getServerSession } from '@/lib/auth/authOptions';
import {
    parseKindOfVolunteerFromDatabase,
    parseModalityFromDatabase,
    parseScholarAttendanceFromDatabase,
    parseVolunteerProject,
    parseVolunteerStatusFromDatabase,
} from '@/lib/utils2';
import {
    ArrowLeftIcon,
    InformationCircleIcon,
    UserPlusIcon,
    UsersIcon
} from '@heroicons/react/24/outline';
import { Chip, Divider, Tooltip } from '@nextui-org/react';
import { ScholarAttendance, VolunteerStatus } from '@prisma/client';
import Link from 'next/link';
import { VolunteerWithDetails } from './types';

type VolunteerWithAttendance = VolunteerWithDetails;

const getStatusColor = (status: VolunteerStatus | ScholarAttendance) => {
    switch (status) {
        case 'APPROVED':
        case 'ATTENDED':
            return 'bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-300';
        case 'PENDING':
        case 'SENT':
        case 'SCHEDULED':
        case 'ENROLLED':
            return 'bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-300';
        case 'JUSTIFY':
            return 'bg-orange-50 text-orange-700 dark:bg-orange-900 dark:text-orange-300';
        case 'REJECTED':
        case 'NOT_ATTENDED':
        case 'CANCELLED':
            return 'bg-red-50 text-red-700 dark:bg-red-900 dark:text-red-300';
        default:
            return 'bg-slate-50 text-slate-700 dark:bg-slate-800 dark:text-slate-300';
    }
};

export const VolunteerBaseLayoutHeader = async ({
    volunteer,
}: {
    volunteer: VolunteerWithAttendance;
}) => {
    const session = await getServerSession();

    const currentScholarAttendance = volunteer.volunteer_attendance.find(
        (attendance) => attendance.scholar.scholar.id === session?.id
    );

    return (
        <>
            <div>
                <Link
                    href="/becario/voluntariado"
                    className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                    <ArrowLeftIcon className="mr-2 h-3.5 w-3.5" />
                    Regresar al historial de voluntariados
                </Link>
            </div>

            <div className="space-y-5">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                            <Tooltip content="Tipo de voluntariado" size="sm" radius="sm">
                                <Chip size="sm" variant="bordered">
                                    {parseKindOfVolunteerFromDatabase(volunteer.kind_of_volunteer)}
                                </Chip>
                            </Tooltip>

                            {volunteer.VolunteerProject && (
                                <Tooltip content="Proyecto" size="sm" radius="sm">
                                    <Chip size="sm" variant="bordered" color="default">
                                        {parseVolunteerProject(volunteer.VolunteerProject)}
                                    </Chip>
                                </Tooltip>
                            )}

                            <Tooltip content="Estatus del voluntariado" radius="sm" size="sm">
                                <Chip size="sm" className={`rounded-full font-medium ${getStatusColor(volunteer.status)}`}>
                                    {parseVolunteerStatusFromDatabase(volunteer.status)}
                                </Chip>
                            </Tooltip>
                        </div>
                        <h1 className="text-2xl md:text-3xl font-bold text-emerald-600 mt-2">
                            {volunteer.title}
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
                        <span className="ml-1 font-medium">{parseModalityFromDatabase(volunteer.modality)}</span>
                    </div>

                    <div className="flex items-center">
                        <UsersIcon className="h-4 w-4 mr-2 text-emerald-600" />
                        <span className="text-muted-foreground">Capacidad:</span>
                        <span className="ml-1 font-medium">
                            {getEnrolledScholarsCount(volunteer)} / {volunteer.avalible_spots}
                        </span>
                    </div>

                    {volunteer.beneficiary && (
                        <div className="flex items-center">
                            <UserPlusIcon className="h-4 w-4 mr-2 text-emerald-600" />
                            <span className="text-muted-foreground">Beneficiario:</span>
                            <span className="ml-1 font-medium">{volunteer.beneficiary}</span>
                        </div>
                    )}
                </div>

                <Divider />
            </div>
        </>
    );
};
