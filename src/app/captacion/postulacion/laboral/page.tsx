import JobInfoForm from '@/components/catchment/formSections/jobInfo/JobInfoForm';
import { Divider } from '@nextui-org/react';

const page = () => {
  return (
    <div className="space-y-4">
      <h1 className="font-bold text-lg">Información laboral</h1>
      <Divider />
      <JobInfoForm />
    </div>
  );
};

export default page;
