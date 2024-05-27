import { ScholarWithAllData } from '@/lib/db/types';
import ActivitiesInfo from './ActivityView';
import CollageInfo from './CollageInfo';
import CvaInfo from './CvaInfo';
import GeneralInfo from './GeneralInfo';

interface indexProps {
  scholars: ScholarWithAllData[];
  view: 'collage' | 'cva' | 'job' | 'mentorship' | 'activities' | 'contact' | 'general' | undefined;
  searchs?: { year: string; month: string; quarter: string };
}

const AdminScholarsView = async ({ scholars, view, searchs }: indexProps) => {
  switch (view) {
    case 'general':
      return <GeneralInfo scholars={scholars} />;
    case 'collage':
      return <CollageInfo scholars={scholars} />;
    case 'cva':
      return <CvaInfo />;
    case 'activities':
      return <ActivitiesInfo searchParams={searchs} />;
    default:
      return <GeneralInfo scholars={scholars} />;
  }
};

export default AdminScholarsView;
