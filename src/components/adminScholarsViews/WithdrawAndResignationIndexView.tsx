import { ScholarWithAllData } from '../EditScholarForm';
import CollageInfo from './CollageInfo';
import WithdrawAndResignationGeneralInfo from './WithdrawAndResignationGeneralInfo';

interface indexProps {
  scholars: ScholarWithAllData[];
  view: 'collage' | 'cva' | 'job' | 'mentorship' | 'activities' | 'contact' | 'general' | undefined;
  searchs?: { year: string; month: string; quarter: string };
}

const AdminScholarsWithdrawAndResignationView = async ({ scholars, view, searchs }: indexProps) => {
  switch (view) {
    case 'general':
      return <WithdrawAndResignationGeneralInfo scholars={scholars} />;
    case 'collage':
      return <CollageInfo scholars={scholars} />;
    default:
      return <WithdrawAndResignationGeneralInfo scholars={scholars} />;
  }
};

export default AdminScholarsWithdrawAndResignationView;
