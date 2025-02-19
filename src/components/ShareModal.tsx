'use client';
import { ClipboardIcon, ShareIcon } from '@heroicons/react/24/outline';
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";
import Image from 'next/image';
import CopyToClipboard from 'react-copy-to-clipboard';

interface ShareModalProps {
  qrCode: string;
  profileLink: string;
}

const SharePubilcProfile: React.FC<ShareModalProps> = ({ qrCode, profileLink }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        radius="lg"
        variant="ghost"
        onClick={onOpen}
        onPress={onOpen}
        isIconOnly
        className="p-2"
      >
        <ShareIcon />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="w-full text-center">Compartir perfil</ModalHeader>
              <ModalBody>
                <div className="flex flex-col items-center gap-6 w-full">
                  <div className="w-full flex rounded-full items-center justify-between gap-2 p-1 bg-gray-100 dark:bg-slate-800">
                    <p className="font-semibold truncate ml-4">{profileLink}</p>
                    <Button radius="full" isIconOnly className="p-2">
                      <ClipboardIcon />
                    </Button>
                  </div>
                  <p className="text-sm text-center">
                    Escanea el codigo QR o haz clic sobre la imagen para copiarla
                  </p>
                  <CopyToClipboard text={qrCode}>
                    <Button className="h-full py-4">
                      <Image
                        className="cursor-pointer"
                        src={qrCode}
                        alt="Codigo QR"
                        width={350}
                        height={300}
                        sizes="(max-width: 350px)  100px"
                      />
                    </Button>
                  </CopyToClipboard>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cerrar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default SharePubilcProfile;
