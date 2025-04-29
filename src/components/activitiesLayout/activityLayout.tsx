import CeaseSpotButtonProps from '@/components/ceaseSpot/ceaseSpotButton';
import { ActivityBaseLayoutHeader } from '@/components/activitiesLayout/ActivityBaseLayoutHeader';
import { DateCards } from '@/components/activitiesLayout/DateCards';
import ScholarActivitySatisfactionForm from '@/components/scholar/activitySatisfactionForm/ScholarActivitySatisfactionForm';
import { ArrowDownOnSquareIcon, ArrowLeftIcon, CalendarDaysIcon, ClipboardIcon, DocumentTextIcon, LinkIcon, MapPinIcon, VideoCameraIcon } from '@heroicons/react/24/outline';
import { Avatar, Button, Card, CardBody, Link } from '@nextui-org/react';
import { Modality, ScholarAttendance } from '@prisma/client';


export const ActivityLayout = (
    {
        kindOfActivity,
        activity
        returnLink,

    }: {

    }
) =>{
    return (
          <div className="container mx-auto">
            <div className="space-y-10">
              {/* Breadcrumb */}
              <div>
                <Link
                  href={returnLink}
                  className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ArrowLeftIcon className="mr-2 h-3.5 w-3.5" />
                  Regresar al historial de actividades
                </Link>
              </div>
        
              <ActivityBaseLayoutHeader currentUserAttendance={currentUserAttendance} workshop={workshop} />
        
              <div className="grid md:grid-cols-3 gap-10">
                <div className="md:col-span-2 space-y-10">
        
                  {/* Dates */}
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-emerald-600 flex items-center">
                      <CalendarDaysIcon className="mr-2 h-5 w-5" />
                      Fechas
                    </h2>
                    <div className="space-y-3">
                    <DateCards endDates={workshop.end_dates} startDates={workshop.start_dates} />
                    </div>
                  </div>
        
                  {/* Location based on modality */}
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-emerald-600">
                      {workshop.modality === Modality.ONLINE
                        ? "Información de Conexión"
                        : workshop.modality === Modality.HYBRID
                          ? "Ubicación e Información de Conexión"
                          : "Ubicación"}
                    </h2>
        
                    {(workshop.modality === Modality.IN_PERSON || workshop.modality === Modality.HYBRID) && (
                      <Card radius='sm' >
                        <CardBody>
                          <div className="flex items-start">
                          <MapPinIcon className="h-5 w-5 mr-3 text-emerald-600 mt-0.5" />
                          <div>
                            {/* <h3 className="font-medium mb-1">Ubicación</h3> */}
                            <p className="text-muted-foreground">{workshop.platform}</p>
                          </div>
                        </div>
                          </CardBody>                
                      </Card>
                    )}
        
                    {(workshop.modality === Modality.ONLINE || workshop.modality === Modality.HYBRID) && (
                      <div className="space-y-4">
                      
                          {workshop.meeting_link.map((link, index) => (
                            <>
                              <div className="flex items-start">
                                <VideoCameraIcon className="h-5 w-5 mr-3 text-emerald-600 mt-0.5" />
                                <div>
                                  <h3 className="font-medium mb-1">Plataforma</h3>
                                  <p className="text-muted-foreground">{workshop.platform}</p>
                                </div>
                              </div>
        
                              <div className="flex items-start">
                                <LinkIcon className="h-5 w-5 mr-3 text-emerald-600 mt-0.5" />
                                <div className="flex-1">
                                  <h3 className="font-medium mb-1">Enlace de Reunión</h3>
                                  <div className="flex items-center justify-between">
                                    <p className="text-muted-foreground truncate max-w-[250px] sm:max-w-md">{link}</p>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-8 px-2"
                                      onClick={() => copyToClipboard(link, "Enlace copiado al portapapeles")}
                                    >
                                      <ClipboardIcon className="h-4 w-4" />
                                    </Button>
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
                                      <p className="text-muted-foreground">{workshop.meeting_id[index]}</p>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-8 px-2"
                                        onClick={() =>
                                          copyToClipboard(workshop.meeting_id[index], "ID copiado al portapapeles")
                                        }
                                      >
                                        <ClipboardIcon className="h-4 w-4" />
                                      </Button>
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
                                      <p className="text-muted-foreground">{workshop.meeting_password[index]}</p>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-8 px-2"
                                        onClick={() =>
                                          copyToClipboard(
                                            workshop.meeting_password[index],
                                            "Contraseña copiada al portapapeles",
                                          )
                                        }
                                      >
                                        <ClipboardIcon className="h-4 w-4" />
                                      </Button>
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
                            {workshop.description && (
                    <div className="space-y-4">
                      <h2 className="text-xl font-semibold text-emerald-600">Descripción</h2>
                      <p className="text-muted-foreground leading-relaxed">{workshop.description}</p>
                    </div>
                  )}
        
                  {/* Slides - if available */}
                  {workshop.slides && (
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
                          <Button variant="bordered" size="sm"  as={Link} href={workshop.slides}  target="_blank" rel="noopener noreferrer">
                              <ArrowDownOnSquareIcon className="h-4 w-4 mr-2" />
                              Descargar
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
        
                {/* Sidebar */}
                <div className="space-y-8">
                  {/* Speakers */}
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-emerald-600">           
                       {workshop.speaker && workshop.speaker.length && workshop.speaker.length >= 2 ? 'Facilitadores' : 'Facilitador'}
                    </h2>
                    <div className="space-y-3">
                      {workshop.speaker.map((speaker) => (
                        <Card radius='sm' key={speaker.id}>
                          <CardBody>
                          <div className="flex items-center">
                            <Avatar className="h-12 w-12 mr-4" src={speaker.image ?? undefined}  
                            alt={`${speaker.first_names} ${speaker.last_names}`} 
                            fallback={speaker.first_names.charAt(0)}/>
                            <div>
                              <p className="font-medium">{`${speaker.first_names} ${speaker.last_names}`}</p>
                              {speaker.job_title && <p className="text-sm text-muted-foreground">{speaker.job_title}</p>}
                              {speaker.job_company && <p className="text-sm text-muted-foreground">{speaker.job_company}</p>}
                            </div>
                          </div>
                          </CardBody>
                        </Card>
                      ))}
                    </div>
                  </div>
        
                  {/* Attendance */}
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-emerald-600">Asistencia</h2>
                    <div className="p-4 bg-slate-50 rounded-lg space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Capacidad</span>
                        <span className="font-medium">
                          {
                            workshop.scholar_attendance.filter(
                              (a) =>
                                a.attendance === ScholarAttendance.ENROLLED || a.attendance === ScholarAttendance.ATTENDED,
                            ).length
                          }{" "}
                          / {workshop.avalible_spots}
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div
                          className="bg-emerald-500 h-2 rounded-full"
                          style={{
                            width: `${(workshop.scholar_attendance.filter((a) => a.attendance === ScholarAttendance.ENROLLED || a.attendance === ScholarAttendance.ATTENDED).length / workshop.avalible_spots) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
        
                  {/* Action Buttons - Moved to sidebar */}
                  {currentUserAttendance && (
                    <div className="space-y-4">
                      <h2 className="text-xl font-semibold text-emerald-600">Acciones</h2>
                      <div className="flex gap-4">
                    {/* {scholarAttendance === 'ENROLLED' && ( */}
                      <CeaseSpotButtonProps
                        scholarWhoCeaseAttendance={currentUserAttendance}
                        kindOfActivity="workshop"
                        activity={workshop}
                        scholarsToCeaseSpot={notEnrolledScholars}
                      />
                    {/* )} */}
                    {scholarAttendance === 'ATTENDED' && (
                      <ScholarActivitySatisfactionForm
                        attendanceId={currentUserAttendance?.id}
                        satisfactionFormFilled={currentUserAttendance?.satisfaction_form_filled}
                        workshopStatus={workshop.activity_status}
                        kindOfActivity="workshop"
                      />
                    )}
                  </div>
                    </div>
                  )}
                </div>
              </div>
        
              {/* Attendees Table */}
              <div className="space-y-4 pt-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-emerald-600">Becarios inscritos</h2>
                  <span className="text-sm text-muted-foreground">{workshop.scholar_attendance.length} becarios</span>
                </div>

    {/* table  */}
    as components
                </div>
            </div>
          </div>
    )

}