import AdditionalInfoForm from '@/components/catchment/formSections/additionalInfo/AdditionalInfoForm';
import { Divider } from '@nextui-org/react';

const page = () => {
  return (
    <div className="space-y-4">
      <h1 className="font-bold text-lg">Información adicional</h1>
      <Divider />
      <AdditionalInfoForm />
    </div>
  );
};

export default page;
