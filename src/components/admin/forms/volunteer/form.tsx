'use client';
import DateInput from '@/components/commons/DateInput';
import PlatformInput from '@/components/commons/PlatformInput';
import createVolunteerInvitationMessage from '@/components/emailTemplateMessage/VolunteerInvitationMessage';
import { MODALITY, VOLUNTEER_PROJECT } from '@/lib/constants';
import { createVolunteer, updateVolunteer } from '@/lib/db/utils/volunteer';
import volunteerSchema from '@/lib/schemas/volunteerSchema';
import { sendActivitiesEmail } from '@/lib/sendEmails';
import { revalidateSpecificPath } from '@/lib/serverAction';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input, Textarea } from '@nextui-org/input';
import { Select, SelectItem } from '@nextui-org/select';
import { Volunteer, VolunteerStatus } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Controller, useFieldArray, useForm, useWatch } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';
import FormButtonGroup, { ButtonGroupEventName } from '../commons/FormButtonGroup';
import { default as createVolunteerObject } from './createVolunteerObject';
import formatVolunteer from './formatVolunteerToEdit';

type Schema = z.infer<typeof volunteerSchema>;
interface IVolunteerForm {
  kind: 'edit' | 'create';
  valuesToUpdate?: Volunteer;
  showEdit: boolean;
  showSchedule: boolean;
  showCreate: boolean;
  showSend: boolean;
}

const VolunteerForm: React.FC<IVolunteerForm> = ({
  kind,
  valuesToUpdate,
  showCreate,
  showEdit,
  showSend,
  showSchedule,
}) => {
  const router = useRouter();
  const methods = useForm<Schema>({
    resolver: zodResolver(volunteerSchema),
  });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid, isDirty },
    setValue,
    reset,
  } = methods;

  const onReset = () => {
    // Reset the form state
    reset({
      dates: [{ date: '', startHour: '', endHour: '' }],
      description: '',
    });
  };

  const modality = useWatch({
    control,
    name: 'modality',
  });
  const fieldArray = useFieldArray({
    control,
    name: 'dates',
  });

  useEffect(() => {
    if (!valuesToUpdate) return;
    const formatedWorkshop = formatVolunteer(valuesToUpdate);
    Object.entries(formatedWorkshop).forEach(([key, value]) => {
      if (value !== undefined) {
        setValue(key as keyof Schema, value);
      }
      revalidateSpecificPath('/admin/actividadesFormativas/crear/**');
    });
  }, [valuesToUpdate, setValue, isDirty]);

  const handleFormSubmit = async (data: Schema, event: any) => {
    const buttonType = ((event?.nativeEvent as SubmitEvent)?.submitter as HTMLButtonElement)
      ?.name as ButtonGroupEventName;
    let status = '' as VolunteerStatus;
    switch (buttonType) {
      case 'create':
        status = 'APPROVED';
        break;
      case 'schedule':
        status = 'SCHEDULED';
        break;
      case 'send':
        status = 'SENT';
        break;
      case 'edit':
        status = valuesToUpdate?.status as VolunteerStatus; // if volunteer is already created, keep the status as it is
        break;
    }
    const volunteer = await createVolunteerObject(data, status);
    if (kind === 'edit' && valuesToUpdate) {
      await updateVolunteer(valuesToUpdate.id, volunteer);
      revalidateSpecificPath('/admin/voluntariado/valuesToUpdate.id');
    }
    if (kind === 'create') {
      if (buttonType === 'send') {
        const volunteerInvitationMessage = createVolunteerInvitationMessage();
        await sendActivitiesEmail(
          volunteerInvitationMessage,
          '¡Se han agregado actividades de voluntariado!'
        );
      }
      revalidateSpecificPath('/admin/voluntariado/crear/**');
      const createdVolunteer = await createVolunteer(volunteer);
      if (buttonType === 'create') router.push(`/admin/voluntariado/${createdVolunteer.id}`);
    }
    onReset();
  };

  return (
    <>
      <form
        onSubmit={handleSubmit((data, event) =>
          toast.promise(handleFormSubmit(data, event), {
            pending: `${kind === 'edit' ? 'Editando' : 'Creando'} actividad...`,
            success: `Actividad ${kind === 'edit' ? 'editada' : 'creada'} con éxito`,
            error: `Ocurrió un error al ${kind === 'edit' ? 'editar' : 'crear'} la actividad`,
          })
        )}
        className="grid grid-cols-2 w-full items-center justify-center gap-4"
      >
        <Controller
          name="title"
          control={control}
          rules={{ required: true }}
          render={({ field, formState }) => {
            return (
              <Input
                {...field}
                isInvalid={!!formState.errors.title?.message}
                errorMessage={formState.errors.title?.message?.toString()}
                autoFocus
                type="text"
                label="Título"
                radius="sm"
                classNames={{ base: 'col-span-2 h-fit' }}
                labelPlacement="outside"
              />
            );
          }}
        />
        <DateInput control={control} fieldArray={fieldArray} haveClosedDate={true} />
        <Controller
          name="beneficiary"
          control={control}
          rules={{ required: true }}
          render={({ field, formState }) => {
            return (
              <Input
                {...field}
                isInvalid={!!formState.errors?.['beneficiary']?.message}
                errorMessage={formState.errors?.['beneficiary']?.message?.toString()}
                type="text"
                label="Beneficiario"
                radius="sm"
                classNames={{ base: 'col-span-2 md:col-span-1' }}
                labelPlacement="outside"
              />
            );
          }}
        />
        <Controller
          name="supervisor"
          control={control}
          rules={{ required: true }}
          render={({ field, formState }) => {
            return (
              <Input
                {...field}
                isInvalid={!!formState.errors?.['supervisor']?.message}
                errorMessage={formState.errors?.['supervisor']?.message?.toString()}
                type="text"
                label="Supervisor"
                radius="sm"
                classNames={{ base: 'col-span-2 md:col-span-1' }}
                labelPlacement="outside"
              />
            );
          }}
        />
        <Controller
          name="kindOfVolunteer"
          control={control}
          rules={{ required: true }}
          render={({ field, formState }) => (
            <Select
              value={field.value}
              onChange={field.onChange}
              isInvalid={!!formState.errors.kindOfVolunteer?.message}
              errorMessage={formState.errors.kindOfVolunteer?.message?.toString()}
              classNames={{ base: 'col-span-2 md:col-span-1' }}
              radius="sm"
              label="Tipo de voluntariado"
              labelPlacement="outside"
              defaultSelectedKeys={[field.value]}
              selectedKeys={[field.value]}
            >
              {[
                { label: 'Externo', value: 'EXTERNAL' },
                { label: 'Interno', value: 'INTERNAL' },
              ].map((chatLevel) => (
                <SelectItem key={chatLevel.value} value={chatLevel.value}>
                  {chatLevel.label}
                </SelectItem>
              ))}
            </Select>
          )}
        />
        <Controller
          name="avalible_spots"
          control={control}
          rules={{ required: true }}
          render={({ field, formState }) => {
            return (
              <Input
                value={field.value?.toString()}
                onChange={field.onChange}
                isInvalid={!!formState.errors?.avalible_spots?.message}
                errorMessage={formState.errors?.avalible_spots?.message?.toString()}
                type="number"
                label="Cupos disponibles"
                radius="sm"
                classNames={{ base: 'col-span-2 md:col-span-1' }}
                labelPlacement="outside"
              />
            );
          }}
        />
        <Controller
          name="modality"
          control={control}
          rules={{ required: true }}
          render={({ field, formState }) => {
            return (
              <Select
                value={field.value}
                onChange={field.onChange}
                isInvalid={!!formState.errors?.['modality']?.message}
                errorMessage={formState.errors?.['modality']?.message?.toString()}
                classNames={{ base: 'col-span-2 md:col-span-1' }}
                radius="sm"
                label="Modalidad"
                labelPlacement="outside"
                defaultSelectedKeys={[field.value]}
                selectedKeys={[field.value]}
              >
                {MODALITY.map((modality) => (
                  <SelectItem key={modality.value} value={modality.value}>
                    {modality.label}
                  </SelectItem>
                ))}
              </Select>
            );
          }}
        />
        <Controller
          name="volunteerProject"
          control={control}
          rules={{ required: true }}
          render={({ field, formState }) => {
            return (
              <Select
                value={field.value}
                onChange={field.onChange}
                isInvalid={!!formState.errors?.['volunteerProject']?.message}
                errorMessage={formState.errors?.['volunteerProject']?.message?.toString()}
                classNames={{ base: 'col-span-2 md:col-span-1' }}
                radius="sm"
                label="Proyecto de voluntariado"
                labelPlacement="outside"
                defaultSelectedKeys={[field.value]}
                selectedKeys={[field.value]}
              >
                {VOLUNTEER_PROJECT.map((modality) => (
                  <SelectItem key={modality.value} value={modality.value}>
                    {modality.label}
                  </SelectItem>
                ))}
              </Select>
            );
          }}
        />
        <PlatformInput modality={modality} control={control} />
        <Controller
          name="description"
          control={control}
          render={({ field, formState }) => {
            return (
              <Textarea
                radius="sm"
                {...field}
                isInvalid={!!formState.errors?.description?.message}
                errorMessage={formState.errors?.description?.message?.toString()}
                label="Descripción"
                labelPlacement="outside"
                classNames={{
                  base: 'col-span-2 h-fit w-full',
                }}
                placeholder="(Opcional) Coloca la descripcion de la actividad"
              />
            );
          }}
        />
        <div className="flex gap-4 col-span-2">
          <FormButtonGroup
            isDisabled={!isValid || isSubmitting}
            showCreate={showCreate}
            showEdit={showEdit}
            showSend={showSend}
            showSchedule={showSchedule}
          />
        </div>
      </form>
    </>
  );
};

export default VolunteerForm;
