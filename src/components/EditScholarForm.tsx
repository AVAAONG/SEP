'use client';
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  useDisclosure,
} from '@nextui-org/react';
import { StudyRegime } from '@prisma/client';
import { Controller, useForm } from 'react-hook-form';

type ScholarForm = {
  first_names: string;
  last_names: string;
  allowedEmail: string;
  dni: string;
  birthdate: string;
  gender: 'M' | 'F';
  is_working: 'true' | 'false';
  job_company: string;
  job_title: string;
  local_phone_number: string;
  cell_phone_Number: string;
  whatsapp_number: string;
  state_of_origin: string;
  address: string;
  instagram_user: string;
  twitter_user: string;
  facebook_user: string;
  linkedin_user: string;
  avaa_admission_year: string;
  career: string;
  collage: string;
  study_area: string;
  evaluation_scale: string;
  study_regime: StudyRegime;
  is_in_cva: string;
  cva_location: 'CENTRO' | 'MERCEDES';
  cva_modality: 'VIRTUAL' | 'PRESENCIAL';
};

const EditScholarForm = ({ modalIsOpen, set, scholar }) => {
  const { isOpen, onOpenChange, onOpen } = useDisclosure();
  const { register, handleSubmit, reset, control } = useForm<ScholarForm>({
    defaultValues: {
      ...scholar,
    },
  });

  const updateScholar = async (data: any, event: any) => {
    event.preventDefault();
    reset();
  };

  return (
    <>
      <Modal size="5xl" isOpen={modalIsOpen} onOpenChange={onOpenChange} isDismissable={false}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Editar becario</ModalHeader>
              <ModalBody>
                <form
                  onSubmit={handleSubmit(async (data, event) => await updateScholar(data, event!))}
                  className="grid grid-cols-12 gap-4"
                >
                  <Controller
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Input className="col-span-6" type="text" label="Nombres" {...field} />
                    )}
                    name="first_names"
                  />

                  <Controller
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Input className="col-span-6" type="text" label="Apellidos" {...field} />
                    )}
                    name="last_names"
                  />
                  <Controller
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Input
                        className="col-span-10"
                        type="text"
                        label="Correo electronico"
                        {...field}
                      />
                    )}
                    name="allowedEmail"
                  />
                  <Controller
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select className="col-span-2" label="Genero" {...field}>
                        <SelectItem key={'m'} value="M">
                          Masculino
                        </SelectItem>
                        <SelectItem key={'f'} value="F">
                          Femenino
                        </SelectItem>
                      </Select>
                    )}
                    name="gender"
                  />
                  <Controller
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Input type="text" label="Cédula" {...field} className="col-span-3" />
                    )}
                    name="dni"
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
                        placeholder="dd/mm/aaaa"
                      />
                    )}
                    name="birthdate"
                  />
                  <Controller
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Input
                        type="date"
                        label="Año de ingreso a AVAA"
                        {...field}
                        className="col-span-3"
                        placeholder="dd/mm/aaaa"
                      />
                    )}
                    name="avaa_admission_year"
                  />
                  <Controller
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select className="col-span-3" label="Actualmente trabaja" {...field}>
                        <SelectItem key={'m'} value="true">
                          Sí
                        </SelectItem>
                        <SelectItem key={'f'} value="false">
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
                      <Input
                        className="col-span-6"
                        type="text"
                        label="Lugar de trabajo"
                        {...field}
                      />
                    )}
                    name="job_company"
                  />
                  <Controller
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Input className="col-span-6" type="text" label="Cargo" {...field} />
                    )}
                    name="job_title"
                  />
                  <Controller
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Input className="col-span-4" type="text" label="Telefono local" {...field} />
                    )}
                    name="local_phone_number"
                  />
                  <Controller
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Input
                        className="col-span-4"
                        type="text"
                        label="Telefono celular"
                        {...field}
                      />
                    )}
                    name="cell_phone_number"
                  />
                  <Controller
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Input className="col-span-4" type="text" label="Whatsapp" {...field} />
                    )}
                    name="whatsapp_number"
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
                        label="Usuario de facebook"
                        {...field}
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
                        label="Usuario de linkedin"
                        {...field}
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
                        label="Estado de origen"
                        {...field}
                      />
                    )}
                    name="state_of_origin"
                  />
                  <Controller
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Input className="col-span-9" type="text" label="Dirección" {...field} />
                    )}
                    name="address"
                  />
                  <Controller
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Input className="col-span-3" type="text" label="Carrera" {...field} />
                    )}
                    name="career"
                  />
                  <Controller
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Input className="col-span-3" type="text" label="Universidad" {...field} />
                    )}
                    name="collage"
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
                      />
                    )}
                    name="study_area"
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
                      />
                    )}
                    name="evaluation_scale"
                  />
                  <Controller
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select className="col-span-3" label="Actualmente trabaja" {...field}>
                        <SelectItem key={'m'} value="true">
                          Sí
                        </SelectItem>
                        <SelectItem key={'f'} value="false">
                          No
                        </SelectItem>
                      </Select>
                    )}
                    name="is_in_cva"
                  />
                  <Controller
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select className="col-span-4" label="Cede del CVA" {...field}>
                        <SelectItem key={'centro'} value="CENTRO">
                          El centro
                        </SelectItem>
                        <SelectItem key={'mercedes'} value="MERCEDES">
                          Las mercedes
                        </SelectItem>
                      </Select>
                    )}
                    name="cva_location"
                  />
                  <Select label="Modalidad" {...register('cva_modality')} className="col-span-4">
                    <SelectItem key={'virtual'} value="VIRTUAL">
                      Virtual
                    </SelectItem>
                    <SelectItem key={'presencial'} value="PRESENCIAL">
                      Presencial
                    </SelectItem>
                  </Select>
                </form>
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
                <Button onClick={handleSubmit(async (data, event) => updateScholar(data, event))}>
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
