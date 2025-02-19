'use client';
import { Modal as NextUIModal, useDisclosure } from "@heroui/modal";
import { Button } from "@heroui/react";

export type ModalProps = {
  children?: React.ReactNode;
  whenNoModal?: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ children, whenNoModal }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  if (!isOpen)
    return (
      <Button
        variant="light"
        color="success"
        radius="full"
        size="sm"
        isIconOnly
        className="w-4"
        onPress={() => onOpen()}
      >
        {whenNoModal}
      </Button>
    );
  return (
    <NextUIModal
      classNames={{
        backdrop: 'bg-secondary-dark bg-opacity-80',
      }}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      isDismissable={false}
    >
      {children}
    </NextUIModal>
  );
};

export default Modal;
