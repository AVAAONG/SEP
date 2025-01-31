import AttachedFilesForm from '@/components/catchment/formSections/annexes/AnnexesForm';
import { Divider } from '@nextui-org/react';

const page = () => {
  return (
    <div className="space-y-4">
      <h1 className="font-bold text-lg">Anexos</h1>
      <Divider />
      <AttachedFilesForm />
    </div>
  );
};

export default page;
