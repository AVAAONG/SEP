import {
  ArrowDownOnSquareIcon,
  CalendarDaysIcon,
  DocumentTextIcon,
  LinkIcon,
  MapPinIcon,
  VideoCameraIcon,
} from '@heroicons/react/24/outline';
import { Button, Card, CardBody } from '@nextui-org/react';
import {
  Chat,
  ChatAttendance,
  Modality,
  Speaker,
  Workshop,
  WorkshopAttendance,
} from '@prisma/client';
import Link from 'next/link';
import CopyToClipboardButton from '../commons/CopyToClipboardButton';
import { DateCards } from './DateCards';

type ActivityType = (Workshop | Chat) & {
  speaker: Speaker[];
  scholar_attendance: WorkshopAttendance[] | ChatAttendance[];
};

export const ActivityDetails = ({ activity }: { activity: ActivityType }) => {
  return (
    <div className="md:col-span-2 space-y-10">
      {/* Dates */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-emerald-600 flex items-center">
          <CalendarDaysIcon className="mr-2 h-5 w-5" />
          Fechas
        </h2>
        <div className="space-y-3">
          <DateCards endDates={activity.end_dates} startDates={activity.start_dates} />
        </div>
      </div>

      {/* Location based on modality */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-emerald-600">
          {activity.modality === Modality.ONLINE
            ? 'Información de Conexión'
            : activity.modality === Modality.HYBRID
              ? 'Ubicación e Información de Conexión'
              : 'Ubicación'}
        </h2>

        {(activity.modality === Modality.IN_PERSON || activity.modality === Modality.HYBRID) && (
          <Card radius="sm">
            <CardBody>
              <div className="flex items-start">
                <MapPinIcon className="h-5 w-5 mr-3 text-emerald-600 mt-0.5" />
                <div>
                  <p className="text-muted-foreground">{activity.platform}</p>
                </div>
              </div>
            </CardBody>
          </Card>
        )}

        {(activity.modality === Modality.ONLINE || activity.modality === Modality.HYBRID) && (
          <div className="space-y-4">
            {activity.meeting_link.map((link, index) => (
              <>
                <div className="flex items-start">
                  <VideoCameraIcon className="h-5 w-5 mr-3 text-emerald-600 mt-0.5" />
                  <div>
                    <h3 className="font-medium mb-1">Plataforma</h3>
                    <p className="text-muted-foreground">{activity.platform}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <LinkIcon className="h-5 w-5 mr-3 text-emerald-600 mt-0.5" />
                  <div className="flex-1">
                    <h3 className="font-medium mb-1">Enlace de Reunión</h3>
                    <div className="flex items-center justify-between">
                      <Link
                        href={link}
                        className="text-muted-foreground truncate max-w-[250px] sm:max-w-md"
                      >
                        {link}
                      </Link>
                      <CopyToClipboardButton textToCopy={link} />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-start">
                    <div className="mr-3 w-5 flex justify-center">
                      <span className="font-medium text-emerald-600">#</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium mb-1">ID de Reunión</h3>
                      <div className="flex items-center justify-between">
                        <p className="text-muted-foreground">{activity.meeting_id[index]}</p>
                        <CopyToClipboardButton textToCopy={activity.meeting_id[index]} />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="mr-3 w-5 flex justify-center">
                      <span className="font-medium text-emerald-600">*</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium mb-1">Contraseña</h3>
                      <div className="flex items-center justify-between">
                        <p className="text-muted-foreground">{activity.meeting_password[index]}</p>
                        <CopyToClipboardButton textToCopy={activity.meeting_password[index]} />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>
        )}
      </div>

      {/* Description - Optional */}
      {activity.description && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-emerald-600">Descripción</h2>
          <p className="whitespace-pre-wrap text-muted-foreground text-sm space-y-sm w-full">
            {activity.description}
          </p>
        </div>
      )}

      {/* Slides - if available */}
      {activity.slides && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-emerald-600 flex items-center">
            <DocumentTextIcon className="mr-2 h-5 w-5" />
            Materiales
          </h2>
          <div className="p-4 rounded-lg bg-slate-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <DocumentTextIcon className="h-5 w-5 mr-3 text-emerald-600" />
                <div>
                  <h3 className="font-medium">Presentación del Taller</h3>
                  <p className="text-sm text-muted-foreground">PDF - Diapositivas del taller</p>
                </div>
              </div>
              <Button
                variant="bordered"
                size="sm"
                as={Link}
                href={activity.slides}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ArrowDownOnSquareIcon className="h-4 w-4 mr-2" />
                Descargar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
