'use client';
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ScrollShadow,
  useDisclosure,
} from '@nextui-org/react';
import { Prisma } from '@prisma/client';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

const scholarWithAllData = Prisma.validator<Prisma.ScholarDefaultArgs>()({
  include: {
    program_information: true,
    collage_information: true,
    cva_information: true,
  },
});
type ScholarWithAllData = Prisma.ScholarGetPayload<typeof scholarWithAllData>;

interface EditScholarFormProps {
  modalIsOpen: boolean;
  set: React.Dispatch<React.SetStateAction<boolean>>;
  scholar: ScholarWithAllData;
}

const EditScholarForm: React.FC<EditScholarFormProps> = ({ modalIsOpen, set, scholar }) => {
  const { isOpen, onOpenChange, onOpen } = useDisclosure();
  const { register, handleSubmit, control } = useForm<ScholarWithAllData>({
    defaultValues: {
      ...scholar,
    },
  });
  const onSubmit: SubmitHandler<ScholarWithAllData> = (data) => console.log(data);

  return (
    <>
      <Modal size="5xl" isOpen={true} onOpenChange={onOpenChange} isDismissable={false}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Editar becario</ModalHeader>
              <ModalBody className="w-full">
                <ScrollShadow className="h-[500px] lg:h-full w-full">
                  <form
                    id="edit-scholar-form"
                    onSubmit={handleSubmit(onSubmit)}
                    className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 w-full gap-3"
                  >
                    <Controller
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Input
                          className="col-span-3 w-full"
                          type="text"
                          label="Nombres"
                          {...field}
                        />
                      )}
                      name="first_names"
                    />

                    {/* <Controller
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Input className="col-span-3" type="text" label="Apellidos" {...field} />
                      )}
                      name="last_names"
                    />
                    <Controller
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Input
                          type="text"
                          label="Cédula de identidad"
                          {...field}
                          className="col-span-3"
                          startContent="v-"
                        />
                      )}
                      name="dni"
                    />
                    <Controller
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Select
                          className="col-span-3"
                          label="Género"
                          {...field}
                          defaultSelectedKeys={field.value ? [field.value] : []}
                        >
                          <SelectItem key={'M'} value="M">
                            Masculino
                          </SelectItem>
                          <SelectItem key={'F'} value="F">
                            Femenino
                          </SelectItem>
                        </Select>
                      )}
                      name="gender"
                    /> */}
                    {/* <Controller
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Input
                          className="col-span-3"
                          type="email"
                          label="Correo electronico"
                          {...field}
                          value={field.value || ''}
                        />
                      )}
                      name="allowedEmail"
                    />
                    <Controller
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Input
                          className="col-span-3"
                          type="text"
                          label="Número local"
                          {...field}
                          value={field.value || ''}
                        />
                      )}
                      name="local_phone_number"
                    />
                    <Controller
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Input
                          className="col-span-3"
                          type="text"
                          label="Número celular"
                          {...field}
                          value={field.value || ''}
                        />
                      )}
                      name="cell_phone_Number"
                    />
                    <Controller
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Input
                          className="col-span-3"
                          type="text"
                          label="Whatsapp"
                          {...field}
                          value={field.value || ''}
                        />
                      )}
                      name="whatsapp_number"
                    />
                    <Controller
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Input
                          type="date"
                          label="Fecha de nacimiento"
                          {...field}
                          className="col-span-3"
                          placeholder="YYYY-MM-DD"
                          value={field.value ? moment(field.value).format('YYYY-MM-DD') : ''}
                        />
                      )}
                      name="birthdate"
                    />
                    <Controller
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Select
                          className="col-span-3"
                          label="Estado de origen"
                          {...field}
                          defaultSelectedKeys={field.value ? [field.value] : []}
                          value={field.value ? field.value.toString() : ''}
                        >
                          {STATES_OF_VENEZUELA.map((state) => {
                            return (
                              <SelectItem key={state} value={state}>
                                {state}
                              </SelectItem>
                            );
                          })}
                        </Select>
                      )}
                      name="state_of_origin"
                    />
                    <Controller
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Input
                          className="col-span-3"
                          type="text"
                          label="Dirección"
                          {...field}
                          value={field.value || ''}
                        />
                      )}
                      name="address"
                    />

                    <Controller
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Select
                          className="col-span-3"
                          label="¿Trabaja?"
                          {...field}
                          value={field.value ? 'true' : 'false'}
                          defaultSelectedKeys={field.value ? [field.value ? 'true' : 'false'] : []}
                        >
                          <SelectItem key={'true'} value={'true'}>
                            Sí
                          </SelectItem>
                          <SelectItem key={'false'} value={'false'}>
                            No
                          </SelectItem>
                        </Select>
                      )}
                      name="is_working"
                    />
                    <Controller
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Select
                          className="col-span-3"
                          label="Modalidad de trabajo"
                          {...field}
                          value={field.value ? field.value.toString() : ''}
                          defaultSelectedKeys={field.value ? [field.value] : []}
                        >
                          <SelectItem key={'IN_PERSON'} value="IN_PERSON">
                            Presencial
                          </SelectItem>
                          <SelectItem key={'ONLINE'} value="ONLINE">
                            Virtual
                          </SelectItem>
                          <SelectItem key={'HYBRID'} value="HYBRID">
                            Híbrido
                          </SelectItem>
                        </Select>
                      )}
                      name="job_modality"
                    />
                    <Controller
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Input
                          className="col-span-3"
                          type="text"
                          label="Empresa/Organización"
                          {...field}
                          value={field.value || ''}
                        />
                      )}
                      name="job_company"
                    />
                    <Controller
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Input
                          className="col-span-3"
                          type="text"
                          label="Cargo"
                          {...field}
                          value={field.value || ''}
                        />
                      )}
                      name="job_title"
                    />

                    <Controller
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Input
                          className="col-span-3"
                          type="number"
                          label="Horas de trabajo a la semana"
                          {...field}
                          value={field.value || ''}
                        />
                      )}
                      name="job_amount_of_hours"
                    />

                    <Controller
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Input
                          className="col-span-3"
                          type="text"
                          label="Usuario de instagram"
                          {...field}
                          value={field.value || ''}
                        />
                      )}
                      name="instagram_user"
                    />
                    <Controller
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Input
                          className="col-span-3"
                          type="text"
                          label="Usuario de twitter"
                          {...field}
                          value={field.value || ''}
                        />
                      )}
                      name="twitter_user"
                    />
                    <Controller
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Input
                          className="col-span-3"
                          type="text"
                          label="Usuario de facebook"
                          {...field}
                          value={field.value || ''}
                        />
                      )}
                      name="facebook_user"
                    />

                    <Controller
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Input
                          className="col-span-3"
                          type="text"
                          label="Usuario de linkedin"
                          {...field}
                          value={field.value || ''}
                        />
                      )}
                      name="linkedin_user"
                    />
                    <Controller
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Input
                          className="col-span-3"
                          type="text"
                          label="Carrera"
                          {...field}
                          value={field.value || ''}
                        />
                      )}
                      name="collage_information.career"
                    />
                    <Controller
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Select
                          className="col-span-3"
                          label="Universidad"
                          {...field}
                          value={field.value ? field.value.toString() : ''}
                          defaultSelectedKeys={field.value ? [field.value] : []}
                        >
                          {COLLAGES.map((collage) => (
                            <SelectItem key={collage} value={collage}>
                              {collage}
                            </SelectItem>
                          ))}
                        </Select>
                      )}
                      name="collage_information.collage"
                    />
                    <Controller
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Input
                          className="col-span-3"
                          type="text"
                          label="Area de estudio"
                          {...field}
                          value={field.value || ''}
                        />
                      )}
                      name="collage_information.study_area"
                    />
                    <Controller
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Input
                          className="col-span-3"
                          type="text"
                          label="Escala de evaluación"
                          {...field}
                          value={field.value || ''}
                        />
                      )}
                      name="collage_information.evaluation_scale"
                    />

                    <Controller
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Select
                          className="col-span-3"
                          label="¿Se encuentra en el CVA?"
                          {...field}
                          value={field.value ? 'true' : 'false'}
                          defaultSelectedKeys={field.value ? [field.value ? 'true' : 'false'] : []}
                        >
                          <SelectItem key={'true'} value={'true'}>
                            Sí
                          </SelectItem>
                          <SelectItem key={'false'} value={'false'}>
                            No
                          </SelectItem>
                        </Select>
                      )}
                      name="cva_information.is_in_cva"
                    />
                    <Controller
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Select
                          className="col-span-3"
                          label="Cede del CVA"
                          {...field}
                          value={field.value ? field.value.toString() : ''}
                          defaultSelectedKeys={field.value ? [field.value] : []}
                        >
                          <SelectItem key={'centro'} value="CENTRO">
                            El centro
                          </SelectItem>
                          <SelectItem key={'mercedes'} value="MERCEDES">
                            Las mercedes
                          </SelectItem>
                        </Select>
                      )}
                      name="cva_information.cva_location"
                    />
                    <Controller
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Select
                          label="Modalidad"
                          {...field}
                          value={field.value ? field.value.toString() : ''}
                          defaultSelectedKeys={field.value ? [field.value] : []}
                          className="col-span-3"
                        >
                          <SelectItem key={'virtual'} value="VIRTUAL">
                            Virtual
                          </SelectItem>
                          <SelectItem key={'presencial'} value="PRESENCIAL">
                            Presencial
                          </SelectItem>
                        </Select>
                      )}
                      name="cva_information.cva_modality"
                    />
                    <Controller
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Input
                          type="date"
                          label="Fecha de ingreso a AVAA"
                          {...field}
                          className="col-span-3"
                          placeholder="YYYY-MM-DD"
                          value={field.value ? moment(field.value).format('YYYY-MM-DD') : ''}
                        />
                      )}
                      name="program_information.avaa_admission_year"
                    />
                    <Controller
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Select
                          className="col-span-3"
                          label="Capitulo"
                          {...field}
                          value={field.value ? field.value.toString() : ''}
                          defaultSelectedKeys={field.value ? [field.value] : []}
                        >
                          <SelectItem key="J4ZlF-eg2fTL9W7hnxRe3" value="J4ZlF-eg2fTL9W7hnxRe3">
                            CARACAS
                          </SelectItem>
                          <SelectItem key="CARABOBO" value="">
                            CARACAS
                          </SelectItem>
                          <SelectItem key="ZULIA" value="">
                            CARACAS
                          </SelectItem>
                        </Select>
                      )}
                      name="program_information.chapter_id"
                    /> */}
                  </form>
                </ScrollShadow>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={() => {
                    set(false);
                  }}
                >
                  Cancelar
                </Button>
                <Button type="submit" form="edit-scholar-form" color="success">
                  Editar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditScholarForm;
