import LanguagesForm from '@/components/catchment/formSections/language/LanguageKnowledgeForm';
import { Divider } from '@nextui-org/react';

const page = () => {
  return (
    <div className="space-y-4">
      <h1 className="font-bold text-lg">Conocimiento de idiomas</h1>
      <Divider />
      <LanguagesForm />
    </div>
  );
};

export default page;
