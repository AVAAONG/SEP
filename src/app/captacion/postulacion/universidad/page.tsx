import CollageForm from '@/components/catchment/formSections/collageInfo/CollageInfoForm';
import { Divider } from '@nextui-org/react';

const page = () => {
  return (
    <div className="space-y-4">
      <h1 className="font-bold text-lg">Información universitaria</h1>
      <Divider />
      <CollageForm />
    </div>
  );
};

export default page;
