import ContactInfoForm from '@/components/catchment/formSections/contactInfo/ContactInfoForm';
import { Divider } from '@nextui-org/react';

const page = () => {
  return (
    <div className="space-y-4">
      <h1 className="font-bold text-lg">Información de contacto</h1>
      <Divider />
      <ContactInfoForm />
    </div>
  );
};

export default page;
