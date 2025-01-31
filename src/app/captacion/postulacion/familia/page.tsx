import FamilyInfoForm from '@/components/catchment/formSections/familyInfo/FamilyInfoForm';
import { Divider } from '@nextui-org/react';

const page = () => {
  return (
    <div className="space-y-4">
      <h1 className="font-bold text-lg">Información familiar</h1>
      <Divider />
      <FamilyInfoForm />
    </div>
  );
};

export default page;
