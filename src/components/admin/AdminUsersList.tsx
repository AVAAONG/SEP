'use client';
import defailProfilePic from '@/../public/defaultProfilePic.png';
import { AdminProfile } from '@prisma/client';
import Image from 'next/image';
import { EditIcon, XIcon } from 'public/svgs/svgs';
import Modal from '../commons/Modal';

interface AdminUsersListProps {
  adminUsers: AdminProfile[];
}

const AdminUsersList: React.FC<AdminUsersListProps> = ({ adminUsers }) => {
  return (
    <ul className="w-full flex flex-col gap-3 max-h-96 overflow-y-auto transition duration-300 ease-in-out">
      {adminUsers.map(
        ({
          allowedEmail,
          chapter_id,
          gender,
          id,
          responsibility,
          role,
          profileImage,
          profileName,
        }) => (
          <li
            className="p-4 focus:outline-none focus:outline-offset-0  rounded-md w-full bg-white dark:bg-slate-900"
            key={allowedEmail}
          >
            <div className="flex items-center space-x-4">
              {/* {email !== 'avaatecnologia@gmail.com' && ( */}
              <Modal
                title="¿Estas seguro de editar este administrador?"
                description="Ten en cuenta que si cambias el correo este administrador solo podra entrar al SEP con el correo que acabas de ingresar."
                onConfirm={() => {}}
              >
                <div className="w-5 h-5 cursor-pointer">
                  <EditIcon />
                </div>
              </Modal>

              {/* )} */}
              <div className="flex-shrink-0">
                <Image
                  className="w-10 h-10 rounded-full"
                  src={profileImage ? profileImage : defailProfilePic}
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
              <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                {role}
              </div>
              <Modal
                title="¿Estas seguro que deseas eliminar a este administrador?"
                description={`Esta acción no se puede deshacer. Si desas volver a agregar a ${profileName} como administrador, deberas volver a crear su acceso.`}
                onConfirm={() => {}}
              >
                <div className="w-5 h-5 cursor-pointer">
                  <XIcon />
                </div>
              </Modal>
              {/* {email !== '
            {/* )} */}
            </div>
          </li>
        )
      )}
    </ul>
  );
};

export default AdminUsersList;
