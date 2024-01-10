import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  useDisclosure,
} from '@nextui-org/react';

export default function App() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Button onPress={onOpen}>Open Modal</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Solicitud de carta de incorporacion al CVA
              </ModalHeader>
              <ModalBody>
                <Select label="Select an animal" className="max-w-xs">
                  <SelectItem key="MERCEDES" value="MERCEDES">
                    Las mercedes
                  </SelectItem>
                  <SelectItem key="CENTRO" value="CENTRO">
                    El centro
                  </SelectItem>
                </Select>
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  Una vez que le des al boton de "Solicitar carta" se creara tu carta para solicitar
                  el ingreso en la cede que seleccionaste. Esta te llegara via correo electronico,
                  con el fin de que puedas verificar que tus datos esten bien escritos.
                </p>
                <p className="text-base leading-relaxed text-green-700 dark:text-emerald-700">
                  Una vez realizado esto, pueden venir en cualquier momento a la oficina (dentro del
                  horario laboral) para hacer el retiro de su carta. Ya que para ser entregada al
                  CVA esta debe de contar con sello y firma húmeda.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  Cerrar
                </Button>
                <Button color="success" onPress={onClose}>
                  Solicitar carta
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
