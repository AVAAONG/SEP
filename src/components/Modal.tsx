'use client';
import { useState } from 'react';

export type ModalProps = {
  title: string;
  onConfirm?: () => void;
  children: React.ReactNode;
  content: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ title, content, onConfirm, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleConfirm = () => {
    onConfirm?.();
    handleClose();
  };

  if (!isOpen) return <button onClick={() => handleClose()}>{children}</button>;
  return (
    <div className="fixed min-w-full flex justify-center items-center top-0 md:-left-16 right-0 bottom-0 z-50 bg-secondary-dark bg-opacity-80 cursor-default ">
      <div className=" max-w-lg flex flex-col bg-white rounded-lg p-6 shadow-lg bg-opacity-100 text-center">
        <h2 className="text-xl font-bold">{title}</h2>
        <>{content}</>
        <div className="flex justify-end items-center">
          <button
            type="button"
            onClick={handleConfirm}
            className="text-white bg-primary-light hover:bg-primary-dark rounded-md p-2 mr-4"
          >
            Confirmar
          </button>
          <button
            type="button"
            onClick={handleClose}
            className=" bg-light hover:bg-gray-400 rounded-md p-2"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
