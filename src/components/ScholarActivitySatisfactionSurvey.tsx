'use client';
import { updateWorkshopAttendanceSatisfactionForm } from '@/lib/db/utils/Workshops';
import activitySatisfactionFormSchema from '@/lib/schemas/acivitySatisFactionFormSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@nextui-org/button';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/modal';
import { Select, SelectItem } from '@nextui-org/react';
import { ActivityStatus } from '@prisma/client';
import { BaseSyntheticEvent } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';

const VALORATION = [
  { label: 'Excelente', value: '5' },
  { label: 'Bueno', value: '4' },
  { label: 'Regular', value: '3' },
  { label: 'Deficiente', value: '2' },
  { label: 'Malo', value: '1' },
];

const ScholarActivitySatisfactionSurvey = ({
  attendanceId,
  workshopStatus,
  satisfactionFormFilled,
}: {
  attendanceId: string | undefined;
  workshopStatus: ActivityStatus;
  satisfactionFormFilled: boolean | undefined | null;
}) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid },
    reset,
    setValue,
  } = useForm<z.infer<typeof activitySatisfactionFormSchema>>({
    resolver: zodResolver(activitySatisfactionFormSchema),
  });

  const handleFormSummision = async (
    data: z.infer<typeof activitySatisfactionFormSchema>,
    event: BaseSyntheticEvent<object, any, any> | undefined
  ) => {
    event?.preventDefault();
    if (!attendanceId) return;
    await updateWorkshopAttendanceSatisfactionForm(attendanceId, data);
    onClose();
  };

  return (
    <>
      <Button
        onPress={onOpen}
        color="success"
        className="text-white"
        isDisabled={workshopStatus !== 'ATTENDANCE_CHECKED' || satisfactionFormFilled}
      >
        {satisfactionFormFilled ? '✅ Encuesta de satisfacción llena' : 'Encuesta de satisfacción'}
      </Button>
      <Modal
        size="5xl"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior="outside"
        classNames={{
          backdrop: 'bg-secondary-dark bg-opacity-80',
          base: 'bg-light dark:bg-dark',
        }}
      >
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit(async (data, event) =>
            toast.promise(handleFormSummision(data, event), {
              pending: 'Confirmando llenado de encuesta...',
              success: 'Encuesta subida de forma correcta',
              error: 'Error al subir encuesta',
            })
          )}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="col-span-2 text-center w-full font-semibold text-2xl text-primary-light uppercase tracking-widest">
                  Encuesta de satisfacción de la actividad
                </ModalHeader>
                <ModalBody className="flex flex-col gap-4">
                  <div className="flex flex-col gap-4">
                    <h2 className="font-medium truncate text-primary-light">
                      Respecto a la actividad
                    </h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <Controller
                        name="activity_organization"
                        control={control}
                        rules={{ required: true }}
                        render={({ field, formState }) => {
                          return (
                            <Select
                              value={field.value}
                              isRequired
                              onChange={field.onChange}
                              isInvalid={!!formState.errors?.['activity_organization']?.message}
                              errorMessage={formState.errors?.[
                                'activity_organization'
                              ]?.message?.toString()}
                              radius="sm"
                              label="¿La actividad estuvo bien organizada? (información, horarios y atención)"
                              defaultSelectedKeys={[field.value]}
                            >
                              {VALORATION.map(({ label, value }) => (
                                <SelectItem key={value} value={value}>
                                  {label}
                                </SelectItem>
                              ))}
                            </Select>
                          );
                        }}
                      />
                      <Controller
                        name="activity_number_of_participants"
                        control={control}
                        rules={{ required: true }}
                        render={({ field, formState }) => {
                          return (
                            <Select
                              value={field.value}
                              isRequired
                              onChange={field.onChange}
                              isInvalid={
                                !!formState.errors?.['activity_number_of_participants']?.message
                              }
                              errorMessage={formState.errors?.[
                                'activity_number_of_participants'
                              ]?.message?.toString()}
                              radius="sm"
                              label="¿El número de participantes fue adecuado para la actividad?"
                              defaultSelectedKeys={[field.value]}
                            >
                              {VALORATION.map(({ label, value }) => (
                                <SelectItem key={value} value={value}>
                                  {label}
                                </SelectItem>
                              ))}
                            </Select>
                          );
                        }}
                      />
                      <Controller
                        name="activity_lenght"
                        control={control}
                        rules={{ required: true }}
                        render={({ field, formState }) => {
                          return (
                            <Select
                              value={field.value}
                              isRequired
                              onChange={field.onChange}
                              isInvalid={!!formState.errors?.['activity_lenght']?.message}
                              errorMessage={formState.errors?.[
                                'activity_lenght'
                              ]?.message?.toString()}
                              radius="sm"
                              label="¿La duración de la actividad fue suficiente?"
                              defaultSelectedKeys={[field.value]}
                            >
                              {VALORATION.map(({ label, value }) => (
                                <SelectItem key={value} value={value}>
                                  {label}
                                </SelectItem>
                              ))}
                            </Select>
                          );
                        }}
                      />
                      <Controller
                        name="activity_relevance_for_scholar"
                        control={control}
                        rules={{ required: true }}
                        render={({ field, formState }) => {
                          return (
                            <Select
                              value={field.value}
                              isRequired
                              onChange={field.onChange}
                              isInvalid={
                                !!formState.errors?.['activity_relevance_for_scholar']?.message
                              }
                              errorMessage={formState.errors?.[
                                'activity_relevance_for_scholar'
                              ]?.message?.toString()}
                              radius="sm"
                              label="Grado de relevancia de la actividad, para mi formación integral"
                              defaultSelectedKeys={[field.value]}
                            >
                              {VALORATION.map(({ label, value }) => (
                                <SelectItem key={value} value={value}>
                                  {label}
                                </SelectItem>
                              ))}
                            </Select>
                          );
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <h2 className="font-medium truncate text-primary-light">
                      Respecto al facilitador/a
                    </h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <Controller
                        name="speaker_theory_practice_mix"
                        control={control}
                        rules={{ required: true }}
                        render={({ field, formState }) => {
                          return (
                            <Select
                              value={field.value}
                              isRequired
                              onChange={field.onChange}
                              isInvalid={
                                !!formState.errors?.['speaker_theory_practice_mix']?.message
                              }
                              errorMessage={formState.errors?.[
                                'speaker_theory_practice_mix'
                              ]?.message?.toString()}
                              radius="sm"
                              label="Combinación adecuada de teoría y aplicación práctica"
                              defaultSelectedKeys={[field.value]}
                            >
                              {VALORATION.map(({ label, value }) => (
                                <SelectItem key={value} value={value}>
                                  {label}
                                </SelectItem>
                              ))}
                            </Select>
                          );
                        }}
                      />
                      <Controller
                        name="speaker_knowledge_of_activity"
                        control={control}
                        rules={{ required: true }}
                        render={({ field, formState }) => {
                          return (
                            <Select
                              value={field.value}
                              isRequired
                              onChange={field.onChange}
                              isInvalid={
                                !!formState.errors?.['speaker_knowledge_of_activity']?.message
                              }
                              errorMessage={formState.errors?.[
                                'speaker_knowledge_of_activity'
                              ]?.message?.toString()}
                              radius="sm"
                              label="Conocimiento de los temas impartidos en profundidad"
                              defaultSelectedKeys={[field.value]}
                            >
                              {VALORATION.map(({ label, value }) => (
                                <SelectItem key={value} value={value}>
                                  {label}
                                </SelectItem>
                              ))}
                            </Select>
                          );
                        }}
                      />
                      <Controller
                        name="speaker_foment_scholar_to_participate"
                        control={control}
                        rules={{ required: true }}
                        render={({ field, formState }) => {
                          return (
                            <Select
                              value={field.value}
                              isRequired
                              onChange={field.onChange}
                              isInvalid={
                                !!formState.errors?.['speaker_foment_scholar_to_participate']
                                  ?.message
                              }
                              errorMessage={formState.errors?.[
                                'speaker_foment_scholar_to_participate'
                              ]?.message?.toString()}
                              radius="sm"
                              label="Fomento a la participación de los asistentes"
                              defaultSelectedKeys={[field.value]}
                            >
                              {VALORATION.map(({ label, value }) => (
                                <SelectItem key={value} value={value}>
                                  {label}
                                </SelectItem>
                              ))}
                            </Select>
                          );
                        }}
                      />
                      <Controller
                        name="speaker_knowledge_transmition"
                        control={control}
                        rules={{ required: true }}
                        render={({ field, formState }) => {
                          return (
                            <Select
                              value={field.value}
                              isRequired
                              onChange={field.onChange}
                              isInvalid={
                                !!formState.errors?.['speaker_knowledge_transmition']?.message
                              }
                              errorMessage={formState.errors?.[
                                'speaker_knowledge_transmition'
                              ]?.message?.toString()}
                              radius="sm"
                              label="La forma de impartir la actividad ha facilitado el aprendizaje"
                              defaultSelectedKeys={[field.value]}
                            >
                              {VALORATION.map(({ label, value }) => (
                                <SelectItem key={value} value={value}>
                                  {label}
                                </SelectItem>
                              ))}
                            </Select>
                          );
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <h2 className="font-medium truncate text-primary-light">
                      Respecto al contenido
                    </h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <Controller
                        name="content_match_necesities"
                        control={control}
                        rules={{ required: true }}
                        render={({ field, formState }) => {
                          return (
                            <Select
                              value={field.value}
                              isRequired
                              onChange={field.onChange}
                              isInvalid={!!formState.errors?.['content_match_necesities']?.message}
                              errorMessage={formState.errors?.[
                                'content_match_necesities'
                              ]?.message?.toString()}
                              radius="sm"
                              label="El contenido de la actividad ha respondido a mis expectativas"
                              defaultSelectedKeys={[field.value]}
                            >
                              {VALORATION.map(({ label, value }) => (
                                <SelectItem key={value} value={value}>
                                  {label}
                                </SelectItem>
                              ))}
                            </Select>
                          );
                        }}
                      />
                      <Controller
                        name="content_knowledge_adquisition"
                        control={control}
                        rules={{ required: true }}
                        render={({ field, formState }) => {
                          return (
                            <Select
                              value={field.value}
                              isRequired
                              onChange={field.onChange}
                              isInvalid={
                                !!formState.errors?.['content_knowledge_adquisition']?.message
                              }
                              errorMessage={formState.errors?.[
                                'content_knowledge_adquisition'
                              ]?.message?.toString()}
                              radius="sm"
                              label="Me permitio adquirir nuevas habilidades que puedo aplicar en mi trabajo"
                              defaultSelectedKeys={[field.value]}
                            >
                              {VALORATION.map(({ label, value }) => (
                                <SelectItem key={value} value={value}>
                                  {label}
                                </SelectItem>
                              ))}
                            </Select>
                          );
                        }}
                      />
                      <Controller
                        name="content_knowledge_expansion"
                        control={control}
                        rules={{ required: true }}
                        render={({ field, formState }) => {
                          return (
                            <Select
                              value={field.value}
                              isRequired
                              onChange={field.onChange}
                              isInvalid={
                                !!formState.errors?.['content_knowledge_expansion']?.message
                              }
                              errorMessage={formState.errors?.[
                                'content_knowledge_expansion'
                              ]?.message?.toString()}
                              radius="sm"
                              label="He ampliado conocimientos para progresar en mi carrera profesional"
                              defaultSelectedKeys={[field.value]}
                            >
                              {VALORATION.map(({ label, value }) => (
                                <SelectItem key={value} value={value}>
                                  {label}
                                </SelectItem>
                              ))}
                            </Select>
                          );
                        }}
                      />
                      <Controller
                        name="content_personal_development"
                        control={control}
                        rules={{ required: true }}
                        render={({ field, formState }) => {
                          return (
                            <Select
                              value={field.value}
                              isRequired
                              onChange={field.onChange}
                              isInvalid={
                                !!formState.errors?.['content_personal_development']?.message
                              }
                              errorMessage={formState.errors?.[
                                'content_personal_development'
                              ]?.message?.toString()}
                              radius="sm"
                              label="Ha favorecido mi desarrollo personal"
                              defaultSelectedKeys={[field.value]}
                            >
                              {VALORATION.map(({ label, value }) => (
                                <SelectItem key={value} value={value}>
                                  {label}
                                </SelectItem>
                              ))}
                            </Select>
                          );
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <h2 className="font-medium truncate text-primary-light">
                      Grado de satisfacción general
                    </h2>
                    <Controller
                      name="general_satisfaction"
                      control={control}
                      rules={{ required: true }}
                      render={({ field, formState }) => {
                        return (
                          <Select
                            value={field.value}
                            isRequired
                            onChange={field.onChange}
                            isInvalid={!!formState.errors?.['general_satisfaction']?.message}
                            errorMessage={formState.errors?.[
                              'general_satisfaction'
                            ]?.message?.toString()}
                            radius="sm"
                            label="Grado de satisfacción general con la actividad"
                            defaultSelectedKeys={[field.value]}
                          >
                            {VALORATION.map(({ label, value }) => (
                              <SelectItem key={value} value={value}>
                                {label}
                              </SelectItem>
                            ))}
                          </Select>
                        );
                      }}
                    />
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button
                    isDisabled={isSubmitting}
                    color="danger"
                    radius="sm"
                    variant="light"
                    onPress={() => {
                      reset();
                      onClose();
                    }}
                  >
                    Cerrar
                  </Button>

                  <Button
                    type="submit"
                    radius="sm"
                    // isDisabled={! || isSubmitting}
                    className="bg-gradient-to-tr from-primary-1 to-emerald-500 text-white "
                  >
                    Agregar registro
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};

export default ScholarActivitySatisfactionSurvey;
