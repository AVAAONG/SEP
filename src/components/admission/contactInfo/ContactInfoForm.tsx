const ContactInfoForm = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
      <Input type="number" isRequired label="Telefono local" />
      <Input type="number" isRequired label="Telefono celular" />
      <Input type="number" isRequired label="Número telefónico asociado a WhatsApp" />
      <Input type="email" isRequired label="Correo electrónico" />
      <Input
        type="number"
        isRequired
        label="Teléfono de un familiar/pariente/amigo cercano"
        description="En el caso de que no podamos contactarte, ¿con quién podemos comunicarnos?"
      />
      <Input
        type="text"
        isRequired
        label="Nombre del familiar/pariente/amigo cercano"
        description="Especifique el nombre del familiar/pariente/amigo cercano y su relacion con usted"
      />

      <Button>
        <Link className="w-full h-full flex items-center justify-center" replace={false} href="?">
          Anterior
        </Link>
      </Button>
      <Button color="success">
        <Link
          className="w-full h-full flex items-center justify-center"
          replace={false}
          href="?paso=secundaria"
        >
          Siguiente
        </Link>
      </Button>
    </div>
  );
};

export default ContactInfoForm;
