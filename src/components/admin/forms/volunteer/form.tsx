'use client';
import DateInput from '@/components/commons/DateInput';
import PlatformInput from '@/components/commons/PlatformInput';
import createVolunteerInvitationMessage from '@/components/emailTemplateMessage/VolunteerInvitationMessage';
import InputField from '@/components/fields/InputFormField';
import SelectFormField from '@/components/fields/SelectFormField';
import TextAreaFormField from '@/components/fields/TextAreaFormField';
import { MODALITY, VOLUNTEER_PROJECT } from '@/lib/constants';
import { createVolunteer, updateVolunteer } from '@/lib/db/utils/volunteer';
import volunteerSchema from '@/lib/schemas/volunteerSchema';
import { sendActivitiesEmail } from '@/lib/sendEmails';
import { revalidateSpecificPath } from '@/lib/serverAction';
import { zodResolver } from '@hookform/resolvers/zod';
import { Volunteer, VolunteerStatus } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { FormProvider, useFieldArray, useForm, useWatch } from 'react-hook-form';
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
      revalidateSpecificPath('/admin/voluntariado/crear/**');
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
      revalidateSpecificPath(`/admin/voluntariado/${valuesToUpdate.id}`);
      revalidateSpecificPath('/admin/voluntariado/crear/**');
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
    <FormProvider {...methods}>
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
        <InputField
          isRequired
          type="text"
          label="Título"
          name="title"
          autoFocus
          className="col-span-2 "
        />
        <DateInput control={control} fieldArray={fieldArray} haveClosedDate={true} />
        <InputField isRequired type="text" label="Beneficiario" name="beneficiary" />
        <InputField isRequired type="text" label="Supervisor" name="supervisor" />
        <SelectFormField
          isRequired
          label="Tipo de voluntariado"
          name="kindOfVolunteer"
          selectItems={[
            { label: 'Externo', value: 'EXTERNAL' },
            { label: 'Interno', value: 'INTERNAL' },
          ]}
        />
        <InputField isRequired type="number" label="Cupos disponibles" name="avalible_spots" />
        <SelectFormField isRequired label="Modalidad" name="modality" selectItems={MODALITY} />
        <SelectFormField
          isRequired
          label="Proyecto de voluntariado"
          name="volunteerProject"
          selectItems={VOLUNTEER_PROJECT}
        />
        <PlatformInput modality={modality} control={control} />
        <TextAreaFormField
          label="Descripción"
          name="description"
          placeholder="(Opcional) Coloca la descripcion de la actividad"
          className="col-span-2 "
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
    </FormProvider>
  );
};

export default VolunteerForm;
