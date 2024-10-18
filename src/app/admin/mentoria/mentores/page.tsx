import Table from '@/components/table/Table';
import mentorColumns from '@/components/table/columns/mentorsColumns';
import { getMentors } from '@/lib/db/utils/mentors';
import dynamic from 'next/dynamic';
import { userIcon } from 'public/svgs/svgs';
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
} from '../../../../../public/svgs/SocialNetworks';

/**
 * @see https://stackoverflow.com/questions/67784672/react-next-js-doesnt-seem-to-work-with-apexcharts for more info
 */
const PieChartComponent = dynamic(() => import('@/components/charts/Pie'), { ssr: false });

const page = async () => {
  const mentors = await getMentors();
  const mentorsWithSocialNetworks = mentors?.map((mentor) => {
    const { twitter_user, facebook_user, instagram_user, linkedin_user } = mentor;
    const socialNetworks = [
      {
        name: 'Twitter',
        url: `https://twitter.com/${twitter_user}`,
        icon: <TwitterIcon />,
      },
      {
        name: 'Facebook',
        url: `https://www.facebook.com/${facebook_user}`,
        icon: <FacebookIcon />,
      },
      {
        name: 'Instagram',
        url: `https://www.instagram.com/${instagram_user}`,
        icon: <InstagramIcon />,
      },
      {
        name: 'Linkedin',
        url: linkedin_user,
        icon: <LinkedinIcon />,
      },
    ];
    const age = new Date().getFullYear() - new Date(mentor.birthdate).getFullYear();
    return {
      ...mentor,
      socialNetworks,
      age,
    };
  });
  return (
    <div className="flex flex-col items-center w-full gap-6 ">
      <div className="flex flex-1 flex-col md:flex-row gap-4 w-full">
        <div className="relative bg-white py-5 px-4  sm:px-6 shadow rounded-lg overflow-hidden h-fit">
          <dt>
            <div className="absolute bg-primary-light rounded-md p-2">
              <div className="w-5 h-5 text-white">{userIcon()}</div>
            </div>
            <p className="ml-16 text-sm font-medium text-gray-500 truncate">Total de mentores</p>
          </dt>
          <dd className="ml-16 flex items-baseline ">
            <p className="text-2xl font-semibold text-gray-900">{mentors?.length}</p>
          </dd>
        </div>
      </div>
      <div className="w-full">
        <Table
          tableColumns={mentorColumns}
          tableData={mentorsWithSocialNetworks || []}
          tableHeadersForSearch={[]}
        />
      </div>
    </div>
  );
};

export default page;
