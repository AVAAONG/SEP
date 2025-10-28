import { getEnrolledScholarsCount } from '@/lib/activities/utils';
import {
    EnvelopeIcon
} from '@heroicons/react/24/outline';
import { Avatar, Card, CardBody, Progress } from '@nextui-org/react';
import Link from 'next/link';
import { VolunteerWithDetails } from './types';

export const VolunteerSidebar = ({
    volunteer,
    children,
}: {
    volunteer: VolunteerWithDetails;
    children?: React.ReactNode;
}) => {
    const enrolledCount = getEnrolledScholarsCount(volunteer);
    const capacityPercentage = volunteer.avalible_spots
        ? Math.min(100, (enrolledCount / volunteer.avalible_spots) * 100)
        : 0;

    return (
        <div className="space-y-8">
            {(volunteer.supervisor || volunteer.supervisor_email) && (
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-emerald-600">Encargado</h2>
                    <Card radius="sm">
                        <CardBody className="flex flex-row items-center gap-3">
                            <Avatar
                                alt={volunteer.supervisor ?? undefined}
                            />
                            <div className="space-y-1">
                                <p className="text-sm font-semibold">
                                    {volunteer.supervisor ?? 'Por definir'}
                                </p>
                                {volunteer.supervisor_email && (
                                    <Link
                                        href={`mailto:${volunteer.supervisor_email}`}
                                        className="inline-flex items-center text-xs text-emerald-600 hover:underline"
                                    >
                                        <EnvelopeIcon className="h-4 w-4 mr-1" />
                                        {volunteer.supervisor_email}
                                    </Link>
                                )}
                            </div>
                        </CardBody>
                    </Card>
                </div>
            )}
            <div className="space-y-4">

                <h2 className="text-xl font-semibold text-emerald-600">Asistencia</h2>
                <Card radius="sm">
                    <CardBody>
                        <div className="p-4 rounded-lg space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">Capacidad</span>
                                <span className="font-medium">
                                    {enrolledCount} / {volunteer.avalible_spots}
                                </span>
                            </div>
                            <Progress
                                className="max-w-md"
                                size="md"
                                color="success"
                                value={capacityPercentage}
                            />
                        </div>
                    </CardBody>
                </Card>
            </div>



            {children}
        </div>
    );
};


// {volunteer.VolunteerProject && (
//     <div className="flex items-center">
//         <BriefcaseIcon className="h-5 w-5 mr-3 text-emerald-600" />
//         <div>
//             <p className="text-sm text-muted-foreground">Proyecto</p>
//             <p className="font-medium">
//                 {parseVolunteerProject(volunteer.VolunteerProject)}
//             </p>
//         </div>
//     </div>
// )}