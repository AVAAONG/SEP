'use client';
import defailProfilePic from '@/../public/defaultProfilePic.png';
import { EditIcon, XIcon } from '@/assets/svgs';
import InputComboBox from '@/components/ComboBox';
import Image from 'next/image';
import { useForm } from 'react-hook-form';

const adminRoles = `STAFF_PROEXCELENCIA
STAFF_COMMUNICATIONS
STAFF_ADMON
STAFF_MENTORSHIP
STAFF_RECRUITMENT
COMITEE
PROYECT
CHAT`;

const roles = adminRoles.split('\n').map((text) => ({
  value: text,
  label: getRoleNameInSpanish(text),
}));

function getRoleNameInSpanish(role) {
  switch (role) {
    case 'STAFF_PROEXCELENCIA':
      return 'Personal de ProExcelencia';
    case 'STAFF_COMMUNICATIONS':
      return 'Personal de Comunicaciones';
    case 'STAFF_ADMON':
      return 'Personal de Administración';
    case 'STAFF_MENTORSHIP':
      return 'Mentoría';
    case 'STAFF_RECRUITMENT':
      return 'Captación';
    case 'COMITEE':
      return 'Comité de becarios';
    case 'PROYECT':
      return 'Proyectos institucionales';
    case 'CHAT':
      return 'Chats clubs de ingles';
    default:
      return '';
  }
}

const adminUsers = [
  {
    email: 'caneloneskarhil@gmail.com',
    name: 'Karhil Canelones',
    role: 'STAFF_PROEXCELENCIA',
  },
  {
    email: 'caneloneskarhil@gmail.com',
    name: 'Karhil Canelones',
    role: 'STAFF_PROEXCELENCIA',
  },
  {
    email: 'caneloneskarhil@gmail.com',
    name: 'Karhil Canelones',
    role: 'STAFF_PROEXCELENCIA',
  },
  {
    email: 'caneloneskarhil@gmail.com',
    name: 'Karhil Canelones',
    role: 'STAFF_PROEXCELENCIA',
  },
  {
    email: 'caneloneskarhil@gmail.com',
    name: 'Karhil Canelones',
    role: 'STAFF_PROEXCELENCIA',
  },
  {
    email: 'caneloneskarhil@gmail.com',
    name: 'Karhil Canelones',
    role: 'STAFF_PROEXCELENCIA',
  },
  {
    email: 'caneloneskarhil@gmail.com',
    name: 'Karhil Canelones',
    role: 'STAFF_PROEXCELENCIA',
  },
  {
    email: 'caneloneskarhil@gmail.com',
    name: 'Karhil Canelones',
    role: 'STAFF_PROEXCELENCIA',
  },
];

const people = [
  { id: 1, name: 'Wade Cooper' },
  { id: 2, name: 'Arlene Mccoy' },
  { id: 3, name: 'Devon Webb' },
  { id: 4, name: 'Tom Cook' },
  { id: 5, name: 'Tanya Fox' },
  { id: 6, name: 'Hellen Schmidt' },
];

const page = () => {
  const { register, handleSubmit } = useForm();

  return (
    <section className="w-full h-screen">
      <div className="flex flex-col sm:flex-row justify-start w-full gap-8 mt-16">
        <form className="flex flex-col gap-4 w-full sm:w-1/2  sm:mt-16 ">
          <h1 className="text-xl text-center font-semibold text-gray-900 sm:text-2xl dark:text-white mb-4">
            Crear administrador
          </h1>
          <div className="">
            <label
              htmlFor="studyArea"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Nombre Completo
            </label>
            <input type="text" placeholder="" required className="bg-white" />
          </div>
          <div className="">
            <label
              htmlFor="currentAcademicPeriod"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email{' '}
            </label>
            <input type="email" required className="bg-white" />
          </div>
          <div className="">
            <label
              htmlFor="currentAcademicPeriod"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Rol{' '}
            </label>
            <InputComboBox values={people} />
          </div>
          <button
            className="text-white bg-green-600 hover:bg-green-500 hover:text-green-900 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            type="submit"
          >
            Crear administrador
          </button>
        </form>
        <div className=" w-full sm:w-1/2  flex flex-col items-center gap-4 h-full">
          <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white mb-4">
            Administradores del SEP
          </h1>
          <ul className="w-full flex flex-col gap-3 max-h-96 overflow-y-auto">
            {adminUsers.map(({ name, email, role }) => (
              <li
                className="p-4 focus:outline-none focus:outline-offset-0  rounded-md w-full bg-white dark:bg-slate-900"
                key={email}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-5 h-5 cursor-pointer">
                    <EditIcon />
                  </div>
                  <div className="flex-shrink-0">
                    <Image
                      className="w-10 h-10 rounded-full"
                      src={defailProfilePic}
                      alt={name}
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
                  <div className="w-5 h-5 cursor-pointer">
                    <XIcon />
                  </div>
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
