'use client';
import { updateSpeaker } from '@/lib/db/utils/speaker';
import { EllipsisHorizontalCircleIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from "@heroui/button";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/dropdown";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/modal";
import { Prisma, Speaker } from '@prisma/client';
import moment from 'moment';
import { BaseSyntheticEvent } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import BaseSpeakerFormCreation, {
  SpeakerCreationFormSchema,
} from './admin/SpeakerCreationForm/BaseForm';

interface SpeakerPageDropdownProps {
  speaker: Speaker;
}

const SpeakerPageDropdown: React.FC<SpeakerPageDropdownProps> = ({ speaker }) => {
  const iconClasses = 'w-5 h-5 text-default-500 pointer-events-none flex-shrink-0';
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, isValid },
  } = useForm<z.infer<typeof SpeakerCreationFormSchema>>({
    resolver: zodResolver(SpeakerCreationFormSchema),
    defaultValues: {
      actual_city: speaker.actual_city || undefined,
      actual_country: speaker.actual_country || undefined,
      description: speaker.description || undefined,
      email: speaker.email || undefined,
      facebook_user: speaker.facebook_user || undefined,
      first_names: speaker.first_names,
      instagram_user: speaker.instagram_user || undefined,
      job_company: speaker.job_company || undefined,
      last_names: speaker.last_names,
      linkedin_user: speaker.linkedin_user || undefined,
      phone_number: speaker.phone_number || undefined,
      twitter_user: speaker.twitter_user || undefined,
      ///@ts-ignore
      birthdate: speaker?.birthdate ? moment(speaker?.birthdate).format('YYYY-MM-DD') : undefined,
      job_title: speaker.job_title || undefined,
      years_of_exp: speaker.years_of_exp || undefined,
      gender: speaker.gender || undefined,
    },
  });
  const id = speaker.id;
  const handleFormSubmit = async (
    inputData: z.infer<typeof SpeakerCreationFormSchema>,
    event: BaseSyntheticEvent<object, any, any> | undefined
  ) => {
    event?.preventDefault();
    const speaker: Prisma.SpeakerCreateInput = {
      id,
      speaker_kind: 'WORKSHOPS',
      ...inputData,
    };
    await updateSpeaker(speaker);
    reset();
    onClose();
  };

  return (
    <>
      <Dropdown>
        <DropdownTrigger>
          <Button radius="full" isIconOnly color="success" variant="light" size="sm" className="">
            <EllipsisHorizontalCircleIcon className="w-7 h-7 rotate-90" />
          </Button>
        </DropdownTrigger>
        <DropdownMenu variant="faded" aria-label="Funciones">
          <DropdownItem
            onPress={onOpen}
            startContent={<PencilSquareIcon className={iconClasses} />}
            key="edit"
          >
            Editar datos del facilitador
          </DropdownItem>
          {/* <DropdownItem
            target="_blank"
            href="https://www.google.com"
            startContent={<ArrowTopRightOnSquareIcon className={iconClasses} />}
            key="visit"
          >
            Visitar pagina publica
          </DropdownItem> */}
        </DropdownMenu>
      </Dropdown>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="5xl"
        scrollBehavior="outside"
        classNames={{
          backdrop: 'bg-secondary-dark bg-opacity-80',
          base: 'bg-light dark:bg-dark',
        }}
      >
        <form onSubmit={handleSubmit((data, event) => handleFormSubmit(data, event))}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="col-span-2 text-center w-full font-semibold text-2xl text-primary-light uppercase tracking-widest">
                  Crear Facilitador
                </ModalHeader>
                <ModalBody className="grid grid-cols-4 w-full items-center justify-center gap-4">
                  <BaseSpeakerFormCreation control={control} />
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
                    isDisabled={!isValid || isSubmitting}
                    className="bg-gradient-to-tr from-primary-1 to-emerald-500 text-white "
                  >
                    Guardar cambios
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

export default SpeakerPageDropdown;
