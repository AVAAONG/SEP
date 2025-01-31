import HighSchoolForm from '@/components/catchment/formSections/highschool/HighSchoolForm';
import { Divider } from '@nextui-org/react';

const page = () => {
  return (
    <div className="space-y-4">
      <h1 className="font-bold text-lg">Información de bachillerato</h1>
      <Divider />
      <HighSchoolForm />
    </div>
  );
};

export default page;
