import { PLATFORMS } from '@/lib/constants';
import { Workshop as FormTypeWorkshop } from '@/types/Workshop';
import { Input, Select, SelectItem } from '@nextui-org/react';
import { UseFormRegister } from 'react-hook-form';

interface PlatformInputProps {
  modality: string;
  registerFunction: UseFormRegister<FormTypeWorkshop>;
}

const PlatformInput = ({ modality, registerFunction }: PlatformInputProps) => {
  if (modality === 'NONE') {
    return (
      <>
        <label className="block mb-2 text-xs font-semibold  uppercase">plataforma/lugar</label>
        <input disabled placeholder="Selecciona la modalidad"></input>
      </>
    );
  } else if (modality === 'ONLINE' || modality === 'HYBRID') {
    return (
      <>
        <Select label="Plataforma" {...registerFunction('pensum')} labelPlacement="outside">
          {PLATFORMS.map((animal) => (
            <SelectItem key={animal} value={animal}>
              {animal}
            </SelectItem>
          ))}
        </Select>
      </>
    );
  } else if (modality === 'IN_PERSON') {
    return (
      <>
        <label className="block mb-2 text-xs font-semibold  uppercase">lugar</label>
        <Input type="text" label="Título" {...registerFunction('platform')} id={'Lugar'} />
      </>
    );
  } else {
    return <input disabled placeholder="Selecciona la modalidad"></input>;
  }
};

export default PlatformInput;
