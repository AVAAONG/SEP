import ContactBox from "@/components/admission/landing/ContactBox";
import { ClockIcon, EnvelopeOpenIcon, MapIcon, PhoneArrowUpRightIcon } from "@heroicons/react/24/outline";

const Contact = () => {
  return (
    <section
      className="bg-white dark:bg-secondary-dark min-h-screen w-full flex flex-col items-center gap-16 p-8 lg:p-24"
      id="requisitos"
    >
      <div className="space-y-2  ">
        <h2 className="text-primary-light text-3xl font-bold tracking-tighter text-center sm:text-4xl md:text-5xl ">
          Ponte en contacto con nosotros
        </h2>
        <p className="mt-auto text-lg w-full text-gray-500 text-center ">
          Si tienes alguna duda, puedes contactarnos a través de los siguientes medios.
        </p>
      </div>
      <div className="grid grid-cols-2 items-center gap-12">
        <ContactBox contact="admisionproexcelencia.avaa@gmail.com" name="Email" subtitle="Escribenos" url="mailto:admisionproexcelencia.avaa@gmail.com"  >
          <EnvelopeOpenIcon className="h-9 w-9" />
        </ContactBox>
        <ContactBox contact="0212 2357821" name="Teléfono local" subtitle="Llamanos" url="tel:+582122357821">
          <PhoneArrowUpRightIcon className="h-9 w-9" />
        </ContactBox>
        <ContactBox contact="Centro Empresarial Miranda, 1° piso, oficina D. Los Ruices, Caracas." name="Dirección" subtitle="Encuentranos" url="https://maps.app.goo.gl/ojmQgLnjC8s8iNid7" >
          <MapIcon className="h-9 w-9" />
        </ContactBox >
        <ContactBox contact={`Lunes a Jueves 8:30 AM - 4:30 PM | Viernes 8:30 AM - 3:30 PM`} name="Horarios de oficina" subtitle="Encuentranos" >
          <ClockIcon className="h-9 w-9" />
        </ContactBox >
      </div>
    </section >
  );
};

export default Contact;