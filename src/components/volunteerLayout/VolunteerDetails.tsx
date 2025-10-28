import { parsePlatformFromDatabase } from '@/lib/utils2';
import {
    CalendarDaysIcon,
    DocumentTextIcon,
    MapPinIcon,
    VideoCameraIcon,
} from '@heroicons/react/24/outline';
import { Button, Card, CardBody } from '@nextui-org/react';
import { Modality } from '@prisma/client';
import Link from 'next/link';
import { DateCards } from '../activitiesLayout/DateCards';
import { VolunteerWithDetails } from './types';

export const VolunteerDetails = ({
    volunteer,
    proofUrl,
}: {
    volunteer: VolunteerWithDetails;
    proofUrl: string | null;
}) => {
    const showConnectionInfo =
        volunteer.modality === Modality.ONLINE || volunteer.modality === Modality.HYBRID;
    const showLocationInfo =
        volunteer.modality === Modality.IN_PERSON || volunteer.modality === Modality.HYBRID;

    return (
        <div className="md:col-span-2 space-y-10">
            <div className="space-y-4">
                <h2 className="text-xl font-semibold text-emerald-600 flex items-center">
                    <CalendarDaysIcon className="mr-2 h-5 w-5" />
                    Fechas
                </h2>
                <div className="space-y-3">
                    <DateCards endDates={volunteer.end_dates} startDates={volunteer.start_dates} />
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-xl font-semibold text-emerald-600">
                    {volunteer.modality === Modality.ONLINE
                        ? 'Información de conexión'
                        : volunteer.modality === Modality.HYBRID
                            ? 'Ubicación e información de conexión'
                            : 'Ubicación'}
                </h2>

                {showLocationInfo && (
                    <Card radius="sm">
                        <CardBody>
                            <div className="flex items-start">
                                <MapPinIcon className="h-5 w-5 mr-3 text-emerald-600 mt-0.5" />
                                <p className="text-muted-foreground">
                                    {parsePlatformFromDatabase(volunteer.platform)}
                                </p>
                            </div>
                        </CardBody>
                    </Card>
                )}

                {showConnectionInfo && (
                    <Card radius="sm">
                        <CardBody>
                            <div className="flex items-start">
                                <VideoCameraIcon className="h-5 w-5 mr-3 text-emerald-600 mt-0.5" />
                                <div>
                                    <h3 className="font-medium mb-1">Plataforma</h3>
                                    <p className="text-muted-foreground">{volunteer.platform}</p>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                )}
            </div>


            {volunteer.description && (
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-emerald-600">Descripción</h2>
                    <p className="whitespace-pre-wrap text-muted-foreground text-sm leading-relaxed">
                        {volunteer.description}
                    </p>
                </div>
            )}

            {proofUrl && (
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-emerald-600 flex items-center">
                        <DocumentTextIcon className="mr-2 h-5 w-5" />
                        Carta de voluntariado
                    </h2>
                    <div className="p-4 rounded-lg bg-slate-50">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <DocumentTextIcon className="h-5 w-5 mr-3 text-emerald-600" />
                                <div>
                                    <h3 className="font-medium">Documentación</h3>
                                    <p className="text-sm text-muted-foreground">Carta aval del voluntariado</p>
                                </div>
                            </div>
                            <Button
                                variant="bordered"
                                size="sm"
                                as={Link}
                                href={proofUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Descargar
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
