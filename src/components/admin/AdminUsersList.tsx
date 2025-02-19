import defailProfilePic from '@/../public/defaultProfilePic.png';
import { ScrollShadow } from "@heroui/react";
import { AdminProfile } from '@prisma/client';
import Image from 'next/image';
import { EditIcon, XIcon } from 'public/svgs/svgs';
import Modal from '../commons/Modal';

interface AdminUsersListProps {
  adminUsers: AdminProfile[] | null;
  editUser: (inputId: string) => void;
  deleteUser: (inputId: string) => void;
}

const AdminUsersList: React.FC<AdminUsersListProps> = ({ adminUsers, editUser, deleteUser }) => {
  if (adminUsers === null) {
    return (
      <ul className="w-full flex flex-col gap-3 max-h-96 overflow-y-auto transform transition duration-300 ease-in-out">
        {Array.from({ length: 3 }).map((_, index) => (
          <li
            className="p-4 focus:outline-none focus:outline-offset-0 rounded-md w-full bg-gray-100 shadow-sm dark:bg-slate-900  animate-pulse"
            key={index}
          >
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="p-6 rounded-full bg-gray-200"></div>
              </div>
              <div className="flex flex-col gap-2 w-full min-w-0 ">
                <div className="text-sm font-medium text-gray-900 truncate dark:text-white">
                  <div className="px-40 py-2 bg-gray-200"></div>
                </div>
                <div className="text-sm text-gray-00 truncate dark:text-gray-400">
                  <div className="w-2/3 py-1 bg-gray-200"></div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    );
  }
  return (
    <ScrollShadow hideScrollBar className="h-[400px] w-full">
      <ul className="w-full flex flex-col gap-3 max-h-96 overflow-y-auto ">
        {adminUsers.map(({ allowedEmail, id, responsibility, profilePic, profileName }) => (
          <li
            className="p-2 md:p-4 focus:outline-none focus:outline-offset-0  rounded-md w-full bg-white dark:bg-slate-900"
            key={allowedEmail}
          >
            <div className="flex items-center space-x-4">
              {allowedEmail !== 'avaatecnologia@gmail.com' && (
                <Modal
                  title="¿Estas seguro de editar este administrador?"
                  description="Ten en cuenta que si cambias el correo este administrador solo podra entrar al SEP con el correo que le asignes."
                  onConfirm={() => editUser(id)}
                >
                  <div className="w-5 h-5 cursor-pointer">
                    <EditIcon />
                  </div>
                </Modal>
              )}
              <div className="flex-shrink-0">
                <Image
                  className="w-10 h-10 rounded-full"
                  src={profilePic ? profilePic : defailProfilePic}
                  alt={profileName ? '' : 'Foto de perfil por defecto'}
                  width={100}
                  height={100}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                  {profileName}
                </p>
                <p className="text-sm text-gray-500 truncate dark:text-gray-400">{allowedEmail}</p>
              </div>
              <div className="hidden md:flex flex-col items-center">
                <div className="hidden md:flex text-xs text-gray-500 truncate dark:text-gray-400">
                  {responsibility}
                </div>
              </div>
              {allowedEmail !== 'avaatecnologia@gmail.com' && (
                <Modal
                  title="¿Estas seguro que deseas eliminar a este administrador?"
                  description={`Esta acción no se puede deshacer. Si desas volver a agregar a ${profileName} como administrador, deberas volver a crear su acceso.`}
                  onConfirm={() => deleteUser(id)}
                >
                  <div className="w-5 h-5 cursor-pointer">
                    <XIcon />
                  </div>
                </Modal>
              )}
            </div>
          </li>
        ))}
      </ul>
    </ScrollShadow>
  );
};

export default AdminUsersList;
