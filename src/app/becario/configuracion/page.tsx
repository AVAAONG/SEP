import AddressInformation from '@/components/scholar/config/AddressInformation';
import GeneralInformation from '@/components/scholar/config/GeneralInformation';
import ProfilePic from '@/components/scholar/config/ProfilePic';
import SocialMedia from '@/components/scholar/config/SocialMedia';
import CollageInformation from '@/components/scholar/config/CollageInformation';
import authOptions from '@/lib/auth/nextAuthScholarOptions/authOptions';
import { getScholar } from '@/lib/db/utils/users';
import { getServerSession } from 'next-auth';

const page = async () => {
  const session = await getServerSession(authOptions);
  const scholarId = session?.scholarId!;
  const scholar = await getScholar(scholarId);

  return (
    <div className="grid grid-cols-1 px-2 pt-6 xl:grid-cols-4 xl:gap-4 ">
      <div className="mb-4 col-span-full xl:mb-2">
        <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
          Configuracion de usuario
        </h1>
      </div>
      <div className="col-span-full xl:col-auto">
        <div className="bg-light rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-40 p-4 mb-4  shadow-md shadow-gray-300 dark:shadow-gray-900 2xl:col-span-2  sm:p-6 dark:bg-slate-950">
          <ProfilePic image={scholar!.image} />
        </div>

        <div className="p-4 mb-4 bg-light border border-gray-200 rounded-lg shadow-md shadow-gray-300 dark:shadow-gray-900 2xl:col-span-2 dark:border-gray-900 sm:p-6 dark:bg-slate-950">
          <SocialMedia scholar={scholar} />
        </div>
        {/* <div className="p-4 mb-4 bg-light border border-gray-200 rounded-lg shadow-md shadow-gray-300 dark:shadow-gray-900 2xl:col-span-2 dark:border-gray-900 sm:p-6 dark:bg-slate-950">
          <VolunteeringInformation />
        </div> */}
      </div>
      <div className="col-span-3 ">
        <div className="bg-light rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-40 p-4 mb-4  shadow-md shadow-gray-300 dark:shadow-gray-900 2xl:col-span-2  sm:p-6 dark:bg-slate-950">
          <GeneralInformation scholar={scholar} title="Información personal" />
        </div>
        <div className="bg-light rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-40 p-4 mb-4  shadow-md shadow-gray-300 dark:shadow-gray-900 2xl:col-span-2  sm:p-6 dark:bg-slate-950">
          <AddressInformation scholar={scholar} />
        </div>
        <div className="bg-light rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-40 p-4 mb-4  shadow-md shadow-gray-300 dark:shadow-gray-900 2xl:col-span-2  sm:p-6 dark:bg-slate-950">
          <CollageInformation scholar={scholar} />
        </div>
      </div>
    </div>
  );
};

export default page;
