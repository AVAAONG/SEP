import { ScholarWithAllData } from '../EditScholarForm';
import ActivitiesInfo from './ActivityView';
import CollageInfo from './CollageInfo';
import CvaInfo from './CvaInfo';
import GeneralInfo from './GeneralInfo';

interface indexProps {
  scholars: ScholarWithAllData[];
  view: 'collage' | 'cva' | 'job' | 'mentorship' | 'activities' | 'contact' | 'general' | undefined;
}

const AdminScholarsView = async ({ scholars, view }: indexProps) => {
  switch (view) {
    case 'general':
      return <GeneralInfo scholars={scholars} />;
    case 'collage':
      return <CollageInfo scholars={scholars} />;
    case 'cva':
      return <CvaInfo scholars={scholars} />;
    case 'activities':
      return <ActivitiesInfo />;
    default:
      return <GeneralInfo scholars={scholars} />;
  }
};

export default AdminScholarsView;
