'use client';
import { Select, SelectItem } from '@nextui-org/react';
import { Controller, useForm } from 'react-hook-form';

const VALORATION = [
  { label: 'Excelente', value: '5' },
  { label: 'Bueno', value: '4' },
  { label: 'Regular', value: '3' },
  { label: 'Deficiente', value: '2' },
  { label: 'Malo', value: '1' },
];

const ScholarActivitySatisfactionSurvey = () => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid },
    reset,
    setValue,
  } = useForm({
    // resolver: zodResolver(workshopCreationFormSchema),
  });
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <h2 className="font-medium truncate text-primary-light">Respecto a la actividad</h2>
        <div className="grid grid-cols-2 gap-4">
          <Controller
            name="activity_organization"
            control={control}
            rules={{ required: true }}
            render={({ field, formState }) => {
              return (
                <Select
                  value={field.value}
                  onChange={field.onChange}
                  isInvalid={!!formState.errors?.['activity_organization']?.message}
                  errorMessage={formState.errors?.['activity_organization']?.message?.toString()}
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
            name="number_of_participants"
            control={control}
            rules={{ required: true }}
            render={({ field, formState }) => {
              return (
                <Select
                  value={field.value}
                  onChange={field.onChange}
                  isInvalid={!!formState.errors?.['asociated_skill']?.message}
                  errorMessage={formState.errors?.['asociated_skill']?.message?.toString()}
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
                  onChange={field.onChange}
                  isInvalid={!!formState.errors?.['asociated_skill']?.message}
                  errorMessage={formState.errors?.['asociated_skill']?.message?.toString()}
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
            name="relevance_for_scholar"
            control={control}
            rules={{ required: true }}
            render={({ field, formState }) => {
              return (
                <Select
                  value={field.value}
                  onChange={field.onChange}
                  isInvalid={!!formState.errors?.['asociated_skill']?.message}
                  errorMessage={formState.errors?.['asociated_skill']?.message?.toString()}
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
        <h2 className="font-medium truncate text-primary-light">Respecto al facilitador/a</h2>
        <div className="grid grid-cols-2 gap-4">
          <Controller
            name="theory_practice_mix"
            control={control}
            rules={{ required: true }}
            render={({ field, formState }) => {
              return (
                <Select
                  value={field.value}
                  onChange={field.onChange}
                  isInvalid={!!formState.errors?.['asociated_skill']?.message}
                  errorMessage={formState.errors?.['asociated_skill']?.message?.toString()}
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
            name="knowledge_of_activity"
            control={control}
            rules={{ required: true }}
            render={({ field, formState }) => {
              return (
                <Select
                  value={field.value}
                  onChange={field.onChange}
                  isInvalid={!!formState.errors?.['asociated_skill']?.message}
                  errorMessage={formState.errors?.['asociated_skill']?.message?.toString()}
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
            name="scholars_want_to_asist"
            control={control}
            rules={{ required: true }}
            render={({ field, formState }) => {
              return (
                <Select
                  value={field.value}
                  onChange={field.onChange}
                  isInvalid={!!formState.errors?.['asociated_skill']?.message}
                  errorMessage={formState.errors?.['asociated_skill']?.message?.toString()}
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
            name="knowledge_transmition"
            control={control}
            rules={{ required: true }}
            render={({ field, formState }) => {
              return (
                <Select
                  value={field.value}
                  onChange={field.onChange}
                  isInvalid={!!formState.errors?.['asociated_skill']?.message}
                  errorMessage={formState.errors?.['asociated_skill']?.message?.toString()}
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
        <h2 className="font-medium truncate text-primary-light">Respecto al contenido</h2>
        <div className="grid grid-cols-2 gap-4">
          <Controller
            name="content_match_necesities"
            control={control}
            rules={{ required: true }}
            render={({ field, formState }) => {
              return (
                <Select
                  value={field.value}
                  onChange={field.onChange}
                  isInvalid={!!formState.errors?.['content_match_necesities']?.message}
                  errorMessage={formState.errors?.['content_match_necesities']?.message?.toString()}
                  radius="sm"
                  label="El contenido de la actividad ha respondido a mis necesidades formativas"
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
            name="knowledge_adquisition"
            control={control}
            rules={{ required: true }}
            render={({ field, formState }) => {
              return (
                <Select
                  value={field.value}
                  onChange={field.onChange}
                  isInvalid={!!formState.errors?.['knowledge_adquisition']?.message}
                  errorMessage={formState.errors?.['knowledge_adquisition']?.message?.toString()}
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
            name="knowledge_expansion"
            control={control}
            rules={{ required: true }}
            render={({ field, formState }) => {
              return (
                <Select
                  value={field.value}
                  onChange={field.onChange}
                  isInvalid={!!formState.errors?.['knowledge_expansion']?.message}
                  errorMessage={formState.errors?.['knowledge_expansion']?.message?.toString()}
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
            name="personal_development"
            control={control}
            rules={{ required: true }}
            render={({ field, formState }) => {
              return (
                <Select
                  value={field.value}
                  onChange={field.onChange}
                  isInvalid={!!formState.errors?.['personal_development']?.message}
                  errorMessage={formState.errors?.['personal_development']?.message?.toString()}
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
        <h2 className="font-medium truncate text-primary-light">Grado de satisfacción general</h2>
        <Controller
          name="general_satisfaction"
          control={control}
          rules={{ required: true }}
          render={({ field, formState }) => {
            return (
              <Select
                value={field.value}
                onChange={field.onChange}
                isInvalid={!!formState.errors?.['general_satisfaction']?.message}
                errorMessage={formState.errors?.['general_satisfaction']?.message?.toString()}
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
    </div>
  );
};

export default ScholarActivitySatisfactionSurvey;
