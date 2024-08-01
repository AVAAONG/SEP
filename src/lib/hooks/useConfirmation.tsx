'use client';
import { Button } from '@nextui-org/button';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/modal';
import { useCallback, useState } from 'react';

type ConfirmationOptions = {
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
};

export const useConfirmation = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [options, setOptions] = useState<ConfirmationOptions | null>(null);
    const [onConfirm, setOnConfirm] = useState<(() => Promise<void>) | null>(null);

    const openConfirmation = useCallback((options: ConfirmationOptions, onConfirmFn: () => Promise<void>) => {
        setOptions(options);
        setOnConfirm(() => onConfirmFn);
        setIsOpen(true);
    }, []);

    const handleConfirm = useCallback(async () => {
        if (onConfirm) {
            onConfirm()
        }
        setIsOpen(false);
    }, [onConfirm]);

    const handleCancel = useCallback(() => {
        setIsOpen(false);
    }, []);

    const ConfirmationModal = useCallback(() => {
        if (!options) return null;

        return (
            <Modal isOpen={isOpen} onClose={handleCancel} radius='sm'>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader>
                                <h4>{options.title}</h4>
                            </ModalHeader>
                            <ModalBody>
                                <p>{options.message}</p>
                            </ModalBody>
                            <ModalFooter>
                                <Button radius='sm' onClick={handleCancel}>
                                    {options.cancelText || 'Cancelar'}
                                </Button>
                                <Button radius='sm' color="danger" onClick={handleConfirm}>
                                    {options.confirmText || 'Confirmar'}
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal >
        );
    }, [isOpen, options, handleCancel, handleConfirm]);

    return { openConfirmation, ConfirmationModal };
};