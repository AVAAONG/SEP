import SelectComponent from '@/components/Select';
import StepButton from '@/components/public/admision/form/StepButton';
import { Avatar, Input } from '@nextui-org/react';

const Separator = ({ num, title }: { num: Number; title: string }) => (
  <div className="md:col-span-2 flex items-center gap-2 mb-4 w-full">
    <div className="inline-flex items-center rounded-full border py-1 px-2  text-xs font-semibold transition-colors focus:outline-none  border-transparent hover:bg-primary/80 bg-green-500 text-white">
      {num.toString()}
    </div>
    <p className="text-lg font-semibold dark:text-white">{title}</p>
  </div>
);

const PersonalInformation = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
      <Separator num={1} title="Información personal" />
      <div className="w-full rounded-full flex items-center justify-center gap-4 md:col-span-2">
        <Avatar
          className="rounded-full bg-white w-20 h-20"
          src={undefined}
          alt="Imagen de perfil"
        />
        <input
          type="file"
          accept="image/*"
          // onChange={handleImageChange}
          className="shadow-none bg-transparent block w-full text-sm text-slate-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:active:outline-none file:active:ring-0
                file:cursor-pointer
                file:bg-secondary-2 file:text-primary-light
                hover:file:bg-primary-light hover:file:text-secondary-2"
        />
      </div>
      <Input type="text" autoFocus isRequired label="Nombre(s)" />
      <Input type="text" isRequired label="Apellido(s)" />
      <Input type="number" isRequired label="Cédula de identidad" />
      <SelectComponent
        label="Género"
        items={[
          { label: 'Masculino', value: 'M' },
          { label: 'Femenino', value: 'F' },
        ]}
      />
      <Input type="date" placeholder="YYY/MM/DD" isRequired label="Fecha de nacimiento" />
      <SelectComponent label="Estado de procedencia" items={[]} />
      <Input
        isRequired
        type="text"
        label="Dirección de residencia actual"
        className="md:col-span-2"
      />
      <StepButton step="contacto" />
    </div>
  );
};

export default PersonalInformation;
