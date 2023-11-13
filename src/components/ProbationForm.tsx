'use client';
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  useDisclosure,
} from '@nextui-org/react';
import React from 'react';

interface ProbationFormProps {
  isOpen: boolean;
  probationKind: 'PROBATION_I' | 'PROBATION_II' | undefined;
}

const ProbationForm: React.FC<ProbationFormProps> = ({ isOpen, probationKind }) => {
  const { onOpenChange } = useDisclosure();
  const title = probationKind === 'PROBATION_II' ? 'Probatorio II' : 'Probatorio I';
  return (
    <>
      <Modal size="5xl" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
              <ModalBody>
                <form action="" className="grid grid-cols-3 gap-4">
                  <Input
                    type="date"
                    label="Fecha de la reunion"
                    defaultValue={new Date().toISOString()}
                    color={probationKind === 'PROBATION_II' ? 'danger' : 'warning'}
                  />
                  <Input
                    color={probationKind === 'PROBATION_II' ? 'danger' : 'warning'}
                    type="text"
                    label="Año en la carrera"
                  />
                  <Input
                    color={probationKind === 'PROBATION_II' ? 'danger' : 'warning'}
                    type="text"
                    label="Promedio"
                  />
                  <Input
                    color={probationKind === 'PROBATION_II' ? 'danger' : 'warning'}
                    type="number"
                    label="Actividades de formativas "
                  />
                  <Input
                    color={probationKind === 'PROBATION_II' ? 'danger' : 'warning'}
                    type="number"
                    label="Chats clubs realizados"
                  />
                  <Input
                    color={probationKind === 'PROBATION_II' ? 'danger' : 'warning'}
                    type="number"
                    label="Horas de voluntariado externas"
                  />
                  <Input
                    color={probationKind === 'PROBATION_II' ? 'danger' : 'warning'}
                    type="number"
                    label="Horas de voluntariado internas"
                  />
                  <Input
                    color={probationKind === 'PROBATION_II' ? 'danger' : 'warning'}
                    type="text"
                    label="CVA"
                  />
                  <Input
                    color={probationKind === 'PROBATION_II' ? 'danger' : 'warning'}
                    type="date"
                    label="Fecha de proxima reunion"
                    defaultValue={new Date().toISOString()}
                  />
                  <Textarea
                    color={probationKind === 'PROBATION_II' ? 'danger' : 'warning'}
                    className="col-span-3"
                    label="Motivos por los cuales entra en probatorio"
                  />
                  <Textarea
                    color={probationKind === 'PROBATION_II' ? 'danger' : 'warning'}
                    className="col-span-3"
                    label="Acuerdo"
                  />
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancelar
                </Button>
                <Button
                  color={probationKind === 'PROBATION_II' ? 'danger' : 'warning'}
                  onPress={onClose}
                >
                  Pasar a {title}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProbationForm;
