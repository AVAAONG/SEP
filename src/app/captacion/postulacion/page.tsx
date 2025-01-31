import PersonalInfo from '@/components/catchment/formSections/personalInfo/PersonalInfoForm';
import { Divider } from '@nextui-org/react';

const page = () => {
  return (
    <div className="space-y-2">
      <h1 className="font-bold text-lg">Información personal</h1>
      <Divider />
      <div className="py-2"></div>
      <PersonalInfo />
    </div>
  );
};

export default page;
