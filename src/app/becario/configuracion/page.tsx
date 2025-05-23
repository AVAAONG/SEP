import AddressInformation from '@/components/scholar/config/AddressInformation';
import CollageInformationForm from '@/components/scholar/config/CollageInformationForm';
import GeneralInformation from '@/components/scholar/config/GeneralInformation';
import JobInformationForm from '@/components/scholar/config/JobInformation';
import ProfilePic from '@/components/scholar/config/ProfilePic';
import SocialMedia from '@/components/scholar/config/SocialMedia';
import { getServerSession } from '@/lib/auth/authOptions';
import { getBlobImage } from '@/lib/azure/azure';
import { getScholar } from '@/lib/db/utils/users';
const page = async () => {
  const session = await getServerSession();
  const scholarId = session?.id!;
  const scholar = await getScholar(scholarId);
  const image = await getBlobImage(scholar?.photo);
  const classNames =
    ' bg-light rounded-md bg-clip-padding backdrop-filter backdrop-blur-md p-2 sm:p-6  mb-4 shadow-md shadow-gray-300 dark:shadow-gray-900 2xl:col-span-2 dark:bg-slate-950';

  return (
    <div className="grid grid-cols-1 pt-6 xl:grid-cols-4 xl:gap-4 ">
      <div className="mb-4 col-span-full xl:mb-2">
        <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
          Configuración de usuario
        </h1>
      </div>
      <div className="col-span-full xl:col-auto">
        <div className={classNames}>
          <ProfilePic image={image} scholarId={scholarId} />
        </div>
        <div className={classNames}>
          <SocialMedia scholar={scholar} />
        </div>
      </div>
      <div className="col-span-3 ">
        <div className={classNames}>
          <GeneralInformation scholar={scholar} />
        </div>
        <div className={classNames}>
          <AddressInformation scholar={scholar} />
        </div>
        <div className={classNames}>
          <CollageInformationForm scholarCollage={scholar?.collage_information?.[0]} />
        </div>
        <div className={classNames}>
          <JobInformationForm
            scholarJobInformation={scholar?.job_information?.[0]}
            scholarId={scholarId}
          />
        </div>
      </div>
    </div>
  );
};

export default page;
