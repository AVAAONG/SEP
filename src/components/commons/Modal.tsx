'use client';
import { useState } from 'react';

export type ModalProps = {
  title: string;
  description: string;
  onConfirm?: () => void;
  children?: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ title, description, onConfirm, children }) => {
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
    <div className="p-6 fixed min-w-full flex justify-center items-center top-0 md:-left-16 right-0 bottom-0 z-50 bg-secondary-dark bg-opacity-80 cursor-default ">
      <div className=" max-w-lg flex flex-col bg-white rounded-lg p-6 shadow-lg bg-opacity-100 text-center">
        <h2 className="text-xl font-bold">{title}</h2>
        <div className="text-7xl p-4">🤨</div>
        <p className="text-base mb-4">{description}</p>
        <div className="flex justify-end items-center">
          <button
            type="button"
            onClick={handleClose}
            className="mr-4 bg-gray-200 hover:bg-gray-400 rounded-md p-2"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="text-white bg-primary-light hover:bg-primary-dark rounded-md p-2"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
