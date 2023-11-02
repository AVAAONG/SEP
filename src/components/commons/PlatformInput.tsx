import { PLATFORMS } from '@/lib/constants';
import { Input, Select, SelectItem } from '@nextui-org/react';
import { UseFormRegister } from 'react-hook-form';
import { WorkshopWithSpeaker } from '../admin/WorkshopForm';

interface PlatformInputProps {
  modality: string;
  registerFunction: UseFormRegister<WorkshopWithSpeaker>;
}

const PlatformInput = ({ modality, registerFunction }: PlatformInputProps) => {
  if (modality === 'NONE') {
    return <p>ERROR</p>;
  } else if (modality === 'ONLINE' || modality === 'HYBRID') {
    return (
      <>
        <Select
          isRequired
          label="Plataforma"
          radius="sm"
          {...registerFunction('platform')}
          labelPlacement="outside"
        >
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
        <Input
          radius="sm"
          isRequired
          type="text"
          label="Lugar"
          labelPlacement="outside"
          {...registerFunction('platform')}
          id={'Lugar'}
        />
      </>
    );
  } else {
    return <p>Selecciona la modalidad 👀</p>;
  }
};

export default PlatformInput;
