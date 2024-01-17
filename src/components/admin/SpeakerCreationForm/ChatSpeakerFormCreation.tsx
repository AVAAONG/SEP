'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Autocomplete,
  AutocompleteItem,
  Avatar,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tab,
  Tabs,
  useDisclosure,
} from '@nextui-org/react';
import { Prisma, Scholar } from '@prisma/client';
import moment from 'moment';
import React, { BaseSyntheticEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import BaseSpeakerFormCreation, { SpeakerCreationFormSchema } from './BaseForm';
import { createSpeaker, setScholarAsChatSpeaker } from '@/lib/db/utils/speaker';

interface ChatSpeakerFormCreationProps {
  scholars: Scholar[];
}

const ChatSpeakerFormCreation: React.FC<ChatSpeakerFormCreationProps> = ({ scholars }) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [selected, setSelected] = useState<React.Key>('SCHOLAR');
  const memoizedScholars = React.useMemo(() => scholars, [scholars]);
  const [scholar, setScholar] = useState<Scholar | null>();

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, isValid },
  } = useForm<z.infer<typeof SpeakerCreationFormSchema>>({
    resolver: zodResolver(SpeakerCreationFormSchema),

    defaultValues: {
      last_names: scholar?.last_names,
      email: scholar?.email!,
      ///@ts-ignore
      birthdate: scholar?.birthdate ? moment(scholar?.birthdate).format('YYYY-MM-DD') : undefined,
      actual_city: scholar?.city || undefined,
      first_names: scholar?.first_names,
      phone_number: scholar?.cell_phone_Number || undefined,
      image: scholar?.photo || undefined,
      instagram_user: scholar?.instagram_user || undefined,
      twitter_user: scholar?.twitter_user || undefined,
      linkedin_user: scholar?.linkedin_user || undefined,
      facebook_user: scholar?.facebook_user || undefined,
      gender: scholar?.gender,
    },
  });
  const handleFormSubmit = async (
    data: z.infer<typeof SpeakerCreationFormSchema>,
    event: BaseSyntheticEvent<object, any, any> | undefined
  ) => {
    event?.preventDefault();
    let speaker: Prisma.SpeakerCreateInput =
      selected === 'SCHOLAR'
        ? { speaker_kind: 'CHATS', id: scholar?.id, ...data }
        : { speaker_kind: 'CHATS', ...data };
    console.log(selected);
    await createSpeaker(speaker);
    await setScholarAsChatSpeaker(scholar?.id!);
    reset();
    onClose();
  };
  return (
    <>
      <Button color="success" onPress={onOpen}>
        Crear facilitador
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="5xl"
        radius="sm"
        scrollBehavior="outside"
        classNames={{
          backdrop: 'bg-secondary-dark bg-opacity-80',
          base: 'bg-light dark:bg-dark',
        }}
      >
        <ModalContent>
          {(onClose) => {
            return (
              <>
                <ModalHeader className="col-span-2 text-center w-full font-semibold text-2xl text-primary-light uppercase tracking-widest">
                  Crear Facilitador
                </ModalHeader>
                <form onSubmit={handleSubmit((data, event) => handleFormSubmit(data, event))}>
                  <ModalBody className="flex flex-col items-center">
                    <div className="flex flex-wrap gap-4">
                      <Tabs
                        color="success"
                        selectedKey={selected}
                        onSelectionChange={(key) => {
                          reset();
                          setScholar(null);
                          setSelected(key);
                        }}
                        aria-label="Tabs colors"
                        radius="full"
                      >
                        <Tab key="SCHOLAR" title="Es becario" />
                        <Tab key="NON_SCHOLAR" title="No es becario" />
                      </Tabs>
                    </div>
                    <div className="grid grid-cols-4 w-full items-center justify-center gap-4">
                      {selected === 'NON_SCHOLAR' && <BaseSpeakerFormCreation control={control} />}
                      {selected === 'SCHOLAR' && (
                        <>
                          <Autocomplete
                            defaultItems={memoizedScholars}
                            classNames={{
                              base: 'col-start-2 col-span-2',
                            }}
                            radius="sm"
                            label="Selecciona un becario"
                            labelPlacement="outside"
                            onSelectionChange={(key) => {
                              setScholar(memoizedScholars.find((scholar) => scholar.id === key));
                            }}
                          >
                            {(scholar) => (
                              <AutocompleteItem
                                classNames={{ base: 'col-span-2 md:col-span-1' }}
                                key={scholar.id}
                                textValue={`${scholar.first_names.split(' ')[0]} ${
                                  scholar.last_names.split(' ')[0]
                                }`}
                              >
                                <div className="flex gap-2 items-center">
                                  <Avatar
                                    alt={scholar.first_names}
                                    className="flex-shrink-0"
                                    size="sm"
                                    src={scholar.photo || ''}
                                  />
                                  <div className="flex flex-col">
                                    <span className="text-small">{`${
                                      scholar.first_names.split(' ')[0]
                                    } ${scholar.last_names.split(' ')[0]}`}</span>
                                    <span className="text-tiny text-default-400">
                                      {scholar.email}
                                    </span>
                                  </div>
                                </div>
                              </AutocompleteItem>
                            )}
                          </Autocomplete>
                          <div></div>
                          {scholar && <BaseSpeakerFormCreation control={control} />}
                        </>
                      )}
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      color="danger"
                      radius="sm"
                      variant="light"
                      isDisabled={isSubmitting}
                      onPress={() => {
                        reset();
                        setScholar(null);
                        onClose();
                      }}
                    >
                      Cerrar
                    </Button>
                    <Button
                      type="submit"
                      radius="sm"
                      isDisabled={!isValid || isSubmitting}
                      className=" bg-gradient-to-tr from-primary-1 to-emerald-500 text-white "
                    >
                      Crear facilitador
                    </Button>
                  </ModalFooter>
                </form>
              </>
            );
          }}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ChatSpeakerFormCreation;
