'use client';
import { Button } from '@nextui-org/button';
import { Checkbox, CheckboxGroup } from '@nextui-org/checkbox';
import Link from 'next/link';
import { useState } from 'react';

const Requirements = () => {
  const [selected, setSelected] = useState<string[]>(['']);
  return (
    <section
      className="bg-white min-h-screen w-full flex flex-col gap-4 lg:flex-row items-center p-8 lg:p-24"
      id="requisitos"
    >
      <div className="flex flex-col gap-4 w-full lg:w-1/2 ">
        <h2 className="text-xl text-center lg:text-start lg:text-3xl font-bold tracking-tighter text-primary-light sm:text-4xl md:text-5xl ">
          ¿Que necesitas para ser parte de ProExcelencia?
        </h2>
        <p className=" text-center lg:text-start  mt-auto lg:text-lg max-w-[900px] text-gray-500  dark:text-gray-400">
          Antes de aplicar al programa, asegúrese de cumplir con los siguientes requisitos:
        </p>
      </div>
      <div className="flex flex-col gap-4 w-full lg:w-1/2 ">
        <CheckboxGroup
          label="Te invitamos a seleccionar cuales de las siguientes condiciones cumples"
          color="success"
          value={selected}
          onValueChange={setSelected}
        >
          <Checkbox value="1">Ser venezolano</Checkbox>
          <Checkbox value="2">
            Ser estudiante universitario regular en una institución pública o privada de la región
            capital, en Carreras Largas, de acuerdo con la OPSU: programas de estudio con una
            duración entre cuatro (4) y siete (7) años que conducen al título de Licenciado o su
            equivalente, por ejemplo: Abogado, Economista, Médico Cirujano, Ingeniero, etc.
          </Checkbox>
          <Checkbox value="3">
            NO haber avanzado más allá del primer año en la carrera universitaria que está
            estudiando.
          </Checkbox>
          <Checkbox value="4">
            Poseer un promedio de calificaciones igual o superior a 16 puntos en la escala del 1 al
            20
          </Checkbox>
          <Checkbox value="5">
            Comprometerse a estudiar inglés en el Centro Venezolano Americano, durante el tiempo de
            duración del ProExcelencia
          </Checkbox>
          <Checkbox value="6">Tener sensibilidad social</Checkbox>
          <Checkbox value="7">Mostrar dotes de liderazgo y espíritu comunitario</Checkbox>
          <Checkbox value="8">
            Estar dispuesto a participar en las actividades educativas, culturales y deportivas de
            AVAA
          </Checkbox>
        </CheckboxGroup>
        <Button
          href="#aplicacion"
          className="font-bold hover:!text-white"
          radius="sm"
          as={Link}
          isDisabled={selected?.length < 9}
          color="success"
          variant="ghost"
        >
          ¡Aplicar!
        </Button>
      </div>
    </section>
  );
};

export default Requirements;
