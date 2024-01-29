import { Button } from '@nextui-org/button';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/modal';

interface BasicModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  title: string;
  Content: React.FC;
  onConfirm: () => void;
  confirmText: string;
  isButtonDisabled: boolean;
  scroll?: boolean;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "full" | "xs" | "3xl" | "4xl" | "5xl" | undefined
}

const BasicModal: React.FC<BasicModalProps> = ({
  isOpen,
  onOpenChange,
  title,
  Content,
  onConfirm,
  confirmText,
  isButtonDisabled,
  scroll,
  size,
}) => {
  return (
    <Modal
      classNames={{
        backdrop: 'bg-secondary-dark bg-opacity-30',

      }}
      scrollBehavior={scroll ? 'outside' : 'normal'} size={size || 'md'} isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
            <ModalBody>
              <Content />
            </ModalBody>
            <ModalFooter>
              <Button isDisabled={isButtonDisabled} variant="light" onPress={onClose}>
                Cerrar
              </Button>
              {confirmText !== '' && (
                <Button
                  className="text-white "
                  isDisabled={isButtonDisabled}
                  color={confirmText === 'Eliminar' ? 'danger' : 'success'}
                  onPress={onConfirm}
                >
                  {confirmText}
                </Button>
              )}

            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default BasicModal;
