import InputField from '@/components/fields/InputFormField';

const StepFour = () => {
  return (
    <>
      <div className="space-y-0.5 col-start-2 col-span-5">
        <h2 className="text-2xl font-bold ">Redes Sociales</h2>
        <p className="text-muted-foreground">Postulación al programa de mentoria AVAA</p>
        <div className="w-full h-0.5 bg-primary-light opacity-40" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField label="Instagram" type="text" name="instagram" placeholder="@usuario" />
        <InputField
          label="LinkedIn"
          type="text"
          name="linkedin"
          placeholder="https://www.linkedin.com/in/usuario"
        />
        <InputField
          isRequired
          label="¿Cómo te enteraste del programa de Mentoría de la AVAA?"
          type="text"
          name="referral_source"
          placeholder="Redes sociales, amigo, etc."
        />
      </div>
    </>
  );
};

export default StepFour;
