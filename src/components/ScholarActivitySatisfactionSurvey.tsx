'use client';
import { Select, SelectItem } from '@nextui-org/react';
import { Controller } from 'react-hook-form';

const VALORATION = [
  { label: 'Excelente', value: '5' },
  { label: 'Bueno', value: '4' },
  { label: 'Regular', value: '3' },
  { label: 'Deficiente', value: '2' },
  { label: 'Malo', value: '1' },
];

const ScholarActivitySatisfactionSurvey = () => {
  return (
    <div>
      <h1>Encuesta de satisfacción</h1>
      <div>
        <h2>Respecto a la actividad</h2>
        <Controller
          name="organization"
          control={control}
          rules={{ required: true }}
          render={({ field, formState }) => {
            return (
              <Select
                value={field.value}
                onChange={field.onChange}
                isInvalid={!!formState.errors?.['asociated_skill']?.message}
                errorMessage={formState.errors?.['asociated_skill']?.message?.toString()}
                classNames={{ base: 'col-span-2 md:col-span-1' }}
                radius="sm"
                label="¿La actividad estuvo bien organizada?"
                description="(información, cumplimiento de fechas, horarios y atención)"
                defaultSelectedKeys={[field.value]}
                labelPlacement="outside"
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
                classNames={{ base: 'col-span-2 md:col-span-1' }}
                radius="sm"
                label="¿El número de participantes ha sido adecuado para el desarrollo de la actividad?"
                defaultSelectedKeys={[field.value]}
                labelPlacement="outside"
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
                classNames={{ base: 'col-span-2 md:col-span-1' }}
                radius="sm"
                label="¿La duración de la actividad fue suficiente, según los objetivos y contenidos de la misma?"
                defaultSelectedKeys={[field.value]}
                labelPlacement="outside"
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
                classNames={{ base: 'col-span-2 md:col-span-1' }}
                radius="sm"
                label="Grado de relevancia de la actividad, para mi formación integral"
                defaultSelectedKeys={[field.value]}
                labelPlacement="outside"
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
      <div>
        <h2>Respecto al facilitador/a</h2>
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
                classNames={{ base: 'col-span-2 md:col-span-1' }}
                radius="sm"
                label="Combinación adecuada de teoría y aplicación práctica"
                defaultSelectedKeys={[field.value]}
                labelPlacement="outside"
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
                classNames={{ base: 'col-span-2 md:col-span-1' }}
                radius="sm"
                label="Conocimiento de los temas impartidos en profundidad"
                defaultSelectedKeys={[field.value]}
                labelPlacement="outside"
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
                classNames={{ base: 'col-span-2 md:col-span-1' }}
                radius="sm"
                label="Fomento a la participación de los asistentes"
                defaultSelectedKeys={[field.value]}
                labelPlacement="outside"
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
                classNames={{ base: 'col-span-2 md:col-span-1' }}
                radius="sm"
                label="La forma de impartir la actividad ha facilitado el aprendizaje"
                defaultSelectedKeys={[field.value]}
                labelPlacement="outside"
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
      <div>
        <h2>Respecto al contenido</h2>
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
                classNames={{ base: 'col-span-2 md:col-span-1' }}
                radius="sm"
                label="El contenido de la actividad ha respondido a mis necesidades formativas"
                defaultSelectedKeys={[field.value]}
                labelPlacement="outside"
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
                classNames={{ base: 'col-span-2 md:col-span-1' }}
                radius="sm"
                label="Me ha permitido adquirir nuevas habilidades/capacidades que puedo aplicar al puesto de trabajo"
                defaultSelectedKeys={[field.value]}
                labelPlacement="outside"
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
                classNames={{ base: 'col-span-2 md:col-span-1' }}
                radius="sm"
                label="He ampliado conocimientos para progresar en mi carrera profesional"
                defaultSelectedKeys={[field.value]}
                labelPlacement="outside"
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
                classNames={{ base: 'col-span-2 md:col-span-1' }}
                radius="sm"
                label="Ha favorecido mi desarrollo personal"
                defaultSelectedKeys={[field.value]}
                labelPlacement="outside"
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
      <div>
        <h2>Grado de satisfacción general</h2>
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
                classNames={{ base: 'col-span-2 md:col-span-1' }}
                radius="sm"
                label="Grado de satisfacción general con la actividad"
                defaultSelectedKeys={[field.value]}
                labelPlacement="outside"
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
