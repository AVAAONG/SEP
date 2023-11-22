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
import { useForm } from 'react-hook-form';

interface EditScholarFormProps {
  isOpen: boolean;
}

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

const EditScholarForm: React.FC<EditScholarFormProps> = ({ isOpen }) => {
  const { onOpenChange } = useDisclosure();
  const { register, handleSubmit, reset } = useForm<ScholarForm>();
  const updateScholar = async (data: any, event: any) => {
    event.preventDefault();
    console.log(data);
    reset();
  };

  return (
    <>
      <Modal size="5xl" isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Editar becario</ModalHeader>
              <ModalBody>
                <form
                  onSubmit={handleSubmit(async (data, event) => await updateScholar(data, event!))}
                  className="grid grid-cols-12 gap-4"
                >
                  <Input
                    className="col-span-6"
                    type="text"
                    label="Nombres"
                    {...register('first_names')}
                  />
                  <Input
                    className="col-span-6"
                    type="text"
                    label="Apellidos"
                    {...register('last_names')}
                  />
                  <Input
                    className="col-span-10"
                    type="text"
                    label="Correo electronico"
                    {...register('allowedEmail')}
                  />
                  <Select className="col-span-2" label="Genero" {...register('gender')}>
                    <SelectItem key={'m'} value="M">
                      Masculino
                    </SelectItem>
                    <SelectItem key={'f'} value="F">
                      Femenino
                    </SelectItem>
                  </Select>
                  <Input type="text" label="Cédula" {...register('dni')} className="col-span-3" />
                  <Input
                    type="date"
                    label="Fecha de nacimiento"
                    {...register('birthdate')}
                    className="col-span-3"
                  />
                  <Input
                    type="date"
                    label="Año de ingreso a AVAA"
                    {...register('avaa_admission_year')}
                    className="col-span-3"
                  />
                  <Select
                    label="Actualmente trabaja"
                    {...register('is_working')}
                    className="col-span-3"
                  >
                    <SelectItem key={'m'} value="true">
                      Sí
                    </SelectItem>
                    <SelectItem key={'f'} value="false">
                      No
                    </SelectItem>
                  </Select>

                  <Input
                    type="text"
                    label="Lugar de trabajo"
                    {...register('job_company')}
                    className="col-span-6"
                  />
                  <Input
                    type="text"
                    label="Cargo"
                    {...register('job_title')}
                    className="col-span-6"
                  />
                  <Input
                    type="text"
                    label="Telefono local"
                    {...register('local_phone_number')}
                    className="col-span-4"
                  />
                  <Input
                    type="text"
                    label="Telefono celular"
                    {...register('cell_phone_Number')}
                    className="col-span-4"
                  />
                  <Input
                    type="text"
                    label="Whatsapp"
                    {...register('whatsapp_number')}
                    className="col-span-4"
                  />
                  <Input
                    type="text"
                    label="Usuario de instagram"
                    {...register('instagram_user')}
                    className="col-span-3"
                  />
                  <Input
                    type="text"
                    label="Usuario de facebook"
                    {...register('twitter_user')}
                    className="col-span-3"
                  />
                  <Input
                    type="text"
                    label="Usuario de twitter"
                    {...register('facebook_user')}
                    className="col-span-3"
                  />
                  <Input
                    type="text"
                    label="Usuario de linkedin"
                    {...register('linkedin_user')}
                    className="col-span-3"
                  />
                  <Input
                    type="text"
                    label="Estado de origen"
                    {...register('state_of_origin')}
                    className="col-span-3"
                  />
                  <Input
                    type="text"
                    label="Dirección"
                    {...register('address')}
                    className="col-span-9"
                  />
                  <Input
                    type="text"
                    label="Carrera"
                    {...register('career')}
                    className="col-span-3"
                  />
                  <Input
                    type="text"
                    label="Universidad"
                    {...register('collage')}
                    className="col-span-3"
                  />
                  <Input
                    type="text"
                    label="Area de estudio"
                    {...register('study_area')}
                    className="col-span-3"
                  />
                  <Input
                    type="text"
                    label="Escala de evaluación"
                    {...register('evaluation_scale')}
                    className="col-span-3"
                  />
                  <Input
                    type="date"
                    label="¿Se encuentra en el CVA?"
                    {...register('is_in_cva')}
                    className="col-span-4"
                  />
                  <Select label="Cede del CVA" {...register('cva_location')} className="col-span-4">
                    <SelectItem key={'centro'} value="CENTRO">
                      El centro
                    </SelectItem>
                    <SelectItem key={'mercedes'} value="MERCEDES">
                      Las mercedes
                    </SelectItem>
                  </Select>
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
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancelar
                </Button>
                <Button onPress={onClose}>Editar</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditScholarForm;
