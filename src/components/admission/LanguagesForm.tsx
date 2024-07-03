import { Input } from '@nextui-org/input';
import SelectComponent from '../Select';

const LanguagesForm = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
      <SelectComponent
        label="¿Habla otro idioma?"
        items={[
          { label: 'Si', value: 'YES' },
          { label: 'No', value: 'NO' },
        ]}
      />
      <Input type="text" label="Especifique" />
      <SelectComponent
        label="¿Cuál es su nivel de inglés?"
        items={[
          { label: 'Básico', value: 'BASIC' },
          { label: 'Intermedio', value: 'INTERMEDIATE' },
          { label: 'Avanzado', value: 'ADVANCED' },
        ]}
      />
    </div>
  );
};

export default LanguagesForm;
