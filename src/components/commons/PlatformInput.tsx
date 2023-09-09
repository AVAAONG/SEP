import { PLATFORMS } from '@/lib/constants';
import { Workshop as FormTypeWorkshop } from '@/types/Workshop';
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
        <label className="block mb-2 text-xs font-semibold  uppercase">plataforma</label>
        <select {...registerFunction('platform')} id={'Platafomra'}>
          {PLATFORMS.map((option) => {
            return (
              <option className="capitalize" key={option}>
                {option}
              </option>
            );
          })}
        </select>
      </>
    );
  } else if (modality === 'IN_PERSON') {
    return (
      <>
        <label className="block mb-2 text-xs font-semibold  uppercase">lugar</label>
        <input {...registerFunction('platform')} id={'Lugar'}></input>
      </>
    );
  } else {
    return <input disabled placeholder="Selecciona la modalidad"></input>;
  }
};

export default PlatformInput;
