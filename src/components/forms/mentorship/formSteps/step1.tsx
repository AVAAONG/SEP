import ImageUpload from '@/components/fields/ImageInputField';
import InputField from '@/components/fields/InputFormField';

const StepOne = () => {
  return (
    <>
      <div className="space-y-0.5 col-start-2 col-span-5">
        <h2 className="text-2xl font-bold ">Información Personal</h2>
        <p className="text-muted-foreground">Postulación al programa de mentoria AVAA</p>
        <div className="w-full h-0.5 bg-primary-light opacity-40" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="w-full md:col-span-2">
          <ImageUpload name="photo" />
        </div>
        <InputField isRequired label="Nombres" type="text" name="first_name" placeholder="Juan" />
        <InputField isRequired label="Apellidos" type="text" name="last_name" placeholder="Pérez" />
        <InputField
          isRequired
          label="Cédula de Identidad"
          type="number"
          name="id_number"
          placeholder="12345678"
        />
        <InputField isRequired type="date" label="Fecha de nacimiento" name="birth_date" />
        <InputField
          isRequired
          label="Lugar de residencia (ciudad, país)"
          type="text"
          name="residence"
          placeholder="Caracas, Venezuela"
        />
        <InputField
          isRequired
          label="Número telefónico asociado a WhatsApp"
          type="tel"
          name="phone"
          placeholder="+58 412 1234567"
        />
        <InputField
          isRequired
          label="Correo electrónico"
          type="email"
          name="email"
          placeholder="juanperez@example.com"
        />
      </div>
    </>
  );
};

export default StepOne;
