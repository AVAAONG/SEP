
import defailProfilePic from '@/../public/defaultProfilePic.png';
import AdminCreationForm from '@/components/admin/forms/AdminCreationForm';
import { getAdminUsers } from '@/lib/db/utils/admins';
import Image from 'next/image';
import { EditIcon, XIcon } from '../../../../../public/svgs/svgs';

const page = async () => {
  const adminUsers = await getAdminUsers()
  return (
    <section className="w-full h-screen">
      <div className="flex flex-col sm:flex-row justify-start w-full gap-8 mt-16 p-8">
        <AdminCreationForm />
        <div className=" w-full sm:w-1/2  flex flex-col items-center gap-4 h-full">
          <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white mb-4">
            Administradores del SEP
          </h1>
          <ul className="w-full flex flex-col gap-3 max-h-96 overflow-y-auto">
            {adminUsers.map(({ name, email, role, image }) => (
              <li
                className="p-4 focus:outline-none focus:outline-offset-0  rounded-md w-full bg-white dark:bg-slate-900"
                key={email}
              >
                <div className="flex items-center space-x-4">
                  {email !== 'avaatecnologia@gmail.com' && (
                    <div className="w-5 h-5 cursor-pointer">
                      <EditIcon />
                    </div>
                  )}
                  <div className="flex-shrink-0">
                    <Image
                      className="w-10 h-10 rounded-full"
                      src={image ? image : defailProfilePic}
                      alt={name ? '' : "Foto de perfil por defecto"}
                      width={100}
                      height={100}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                      {name}
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">{email}</p>
                  </div>
                  <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    {role}
                  </div>
                  {email !== 'avaatecnologia@gmail.com' && (
                    <div className="w-5 h-5 cursor-pointer">
                      <XIcon />
                    </div>
                  )
                  }
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default page;
