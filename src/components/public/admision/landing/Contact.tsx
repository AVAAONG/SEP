'use client';
import {
  ClockIcon,
  EnvelopeOpenIcon,
  MapIcon,
  PhoneArrowUpRightIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { ReactNode } from 'react';

const ContactBox = ({
  name,
  contact,
  children,
  url,
}: {
  name: string;
  contact: string;
  children: ReactNode;
  url?: string;
}) => (
  <Link
    href={url ? url : ''}
    target="_blank"
    rel="noopener noreferrer"
    className="transition-transform hover:scale-[1.02]"
  >
    <div className="flex flex-col items-center justify-center gap-1 border-1 border-gray-400 p-4 rounded-lg max-w-[280px] h-[200px] max-h-[200px] text-sm lg:text-base md:max-w-[350px]">
      {children}
      <p className="font-bold">{name}</p>
      <p className="text-gray-500 text-center">{contact}</p>
    </div>
  </Link>
);

const Contact = () => {
  return (
    <section
      className="min-h-screen w-full flex flex-col items-center justify-center gap-16"
      id="requisitos"
    >
      <h2 className="text-primary-light text-3xl font-bold tracking-tighter text-center sm:text-4xl md:text-5xl ">
        Contáctanos
      </h2>
      <div className="grid md:grid-cols-2 items-center gap-4 md:gap-12">
        <ContactBox
          contact="admisionproexcelencia.avaa@gmail.com"
          name="Email"
          url="mailto:admisionproexcelencia.avaa@gmail.com"
        >
          <EnvelopeOpenIcon className="h-9 w-9" />
        </ContactBox>
        <ContactBox contact="0212 2357821" name="Teléfono local" url="tel:+582122357821">
          <PhoneArrowUpRightIcon className="h-9 w-9" />
        </ContactBox>
        <ContactBox
          contact="Av. Francisco de Miranda con Av. Diego Cisneros,
Edificio Centro Empresarial Miranda, piso 1, oficina
1-D, Los Ruices, Caracas."
          name="Dirección"
          url="https://maps.app.goo.gl/ojmQgLnjC8s8iNid7"
        >
          <MapIcon className="h-9 w-9" />
        </ContactBox>
        <ContactBox
          contact={`Lunes a Jueves 08:30 am a 12:00 pm - 01:30 pm a 04:30 pm | Viernes 08:30 am a 12:00 pm - 01:30 pm a 03:30 pm`}
          name="Horarios de oficina"
        >
          <ClockIcon className="h-9 w-9" />
        </ContactBox>
      </div>
    </section>
  );
};

export default Contact;
