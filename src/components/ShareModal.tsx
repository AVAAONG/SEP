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
} from '@nextui-org/react';
import Image from 'next/image';
import { toast } from 'react-toastify';

interface ShareModalProps {
  qrCode: string;
  profileLink: string;
}

const SharePubilcProfile: React.FC<ShareModalProps> = ({ qrCode, profileLink }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const copyToClipboard = async (text: string, type: 'link' | 'qr') => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(
        type === 'link'
          ? '¡Enlace copiado al portapapeles!'
          : '¡Código QR copiado al portapapeles!',
        {
          position: 'bottom-center',
          autoClose: 2000,
        }
      );
    } catch (err) {
      // Fallback for older browsers or if clipboard API fails
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
        toast.success(
          type === 'link'
            ? '¡Enlace copiado al portapapeles!'
            : '¡Código QR copiado al portapapeles!',
          {
            position: 'bottom-center',
            autoClose: 2000,
          }
        );
      } catch (error) {
        toast.error('No se pudo copiar. Intenta de nuevo.', {
          position: 'bottom-center',
          autoClose: 2000,
        });
      }
      textArea.remove();
    }
  };

  const copyImageToClipboard = async (dataUrl: string) => {
    // Try to copy the actual image (Blob) to clipboard using ClipboardItem (modern browsers)
    try {
      const parts = dataUrl.split(',');
      const mimeMatch = parts[0].match(/:(.*?);/);
      const mime = mimeMatch ? mimeMatch[1] : 'image/png';
      const binary = atob(parts[1]);
      const array = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) array[i] = binary.charCodeAt(i);
      const blob = new Blob([array], { type: mime });

      // Some environments require ClipboardItem to be available on window
      const ClipboardItemCtor = (window as any).ClipboardItem || (globalThis as any).ClipboardItem;
      if (!navigator.clipboard || !ClipboardItemCtor) throw new Error('Clipboard image not supported');

      // @ts-ignore - ClipboardItem typings may not be available in this TS config
      const clipItem = new ClipboardItemCtor({ [blob.type]: blob });
      await (navigator.clipboard as any).write([clipItem]);

      toast.success('¡Imagen QR copiada al portapapeles!', { position: 'bottom-center', autoClose: 2000 });
      return;
    } catch (err) {
      // Fallback: copy the data URL as text so the user still has something to paste
      try {
        await copyToClipboard(dataUrl, 'qr');
        toast.info('El navegador no admite copiar imágenes directamente; se copió la URL del QR. Pega o guarda la imagen manualmente.', {
          position: 'bottom-center',
          autoClose: 3500,
        });
        return;
      } catch (e) {
        toast.error('No se pudo copiar la imagen ni la URL. Intenta guardar la imagen manualmente.', {
          position: 'bottom-center',
          autoClose: 3000,
        });
      }
    }
  };

  return (
    <>
      <Button
        radius="lg"
        variant="solid"
        onClick={onOpen}
        onPress={onOpen}
        isIconOnly
        className="bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
      >
        <ShareIcon className="w-5 h-5 text-white" />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="lg">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center border-b border-slate-200 dark:border-slate-700 pb-4">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <ShareIcon className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    Compartir Perfil
                  </h2>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 font-normal">
                  Comparte este perfil con reclutadores y contactos profesionales
                </p>
              </ModalHeader>
              <ModalBody className="py-6">
                <div className="flex flex-col items-center gap-6 w-full">
                  <div
                    className="w-full group cursor-pointer"
                    onClick={() => copyToClipboard(profileLink, 'link')}
                  >
                    <div className="w-full flex rounded-2xl items-center justify-between gap-3 p-4 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 border border-slate-200 dark:border-slate-600 hover:border-emerald-400 dark:hover:border-emerald-500 transition-all duration-300 shadow-sm hover:shadow-md">
                      <p className="font-medium text-sm truncate flex-1 text-slate-700 dark:text-slate-300">{profileLink}</p>
                      <div className="flex items-center gap-2 bg-white dark:bg-slate-600 px-3 py-2 rounded-lg group-hover:bg-emerald-50 dark:group-hover:bg-emerald-900 transition-all duration-300">
                        <ClipboardIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">Copiar</span>
                      </div>
                    </div>
                  </div>

                  <div className="w-full border-t border-slate-200 dark:border-slate-700 pt-4">
                    <p className="text-sm text-center text-slate-600 dark:text-slate-400 mb-4 font-medium">
                      O escanea el código QR
                    </p>
                    <div
                      className="group cursor-pointer flex justify-center"
                      onClick={() => copyImageToClipboard(qrCode)}
                    >
                      <div className="relative p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-slate-200 dark:border-slate-700 hover:border-emerald-400 dark:hover:border-emerald-500">
                        <Image
                          className="rounded-lg"
                          src={qrCode}
                          alt="Codigo QR"
                          width={220}
                          height={220}
                          sizes="220px"
                        />
                        <div className="absolute inset-0 bg-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl flex items-center justify-center pointer-events-none">
                          <span className="bg-white dark:bg-slate-800 px-3 py-1.5 rounded-lg text-xs font-semibold text-emerald-600 dark:text-emerald-400 shadow-lg">
                            Click para copiar
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter className="border-t border-slate-200 dark:border-slate-700 pt-4">
                <Button
                  color="danger"
                  variant="light"
                  onPress={onClose}
                  className="font-medium"
                >
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
