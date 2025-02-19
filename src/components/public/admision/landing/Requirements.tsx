import { Button } from "@heroui/button";
import Link from 'next/link';

const Requirements = () => {
  return (
    <section
      className=" min-h-screen w-full flex flex-col gap-4 lg:flex-row items-center "
      id="requisitos"
    >
      <div className="flex flex-col gap-4 w-full lg:w-1/2 ">
        <h2 className="text-xl text-center lg:text-start lg:text-3xl font-bold tracking-tighter text-[#0069B0] sm:text-4xl md:text-5xl ">
          ¿Qué necesitas para ser parte de ProExcelencia?
        </h2>
      </div>
      <div className="flex flex-col gap-4 w-full lg:w-1/2 ">
        <ul className="list-disc list-inside space-y-1 p-4 text-sm md:text-base">
          <li>Ser venezolano</li>
          <li>
            Ser estudiante universitario regular en una institución pública o privada de la región
            capital, en Carreras largas, de acuerdo con la OPSU: programas de estudio con una
            duración entre cuatro (4) y siete (7) años que conducen al título de Licenciado o su
            equivalente, por ejemplo: Abogado, Economista, Médico Cirujano, Ingeniero, etc.
          </li>
          <li>
            Haber culminado el primer período de la carrera y estar cursando el período siguiente
            inmediato.
          </li>
          <li>
            Tener un promedio de calificaciones igual o superior a 16 puntos en la escala del 1 al
            20, o su equivalente en otras escalas de evaluación.
          </li>
          <li>Estar residenciado en el área metropolitana de Caracas.</li>
          <li>
            Tener disponible y a la mano los documentos personales y académicos probatorios de la
            información que suministrarás en el formulario:
            <ul className="list-disc list-inside ml-6 space-y-1">
              <li>Cédula de identidad laminada</li>
              <li>RIF actualizado</li>
              <li>Constancia de residencia actualizada</li>
              <li>Planilla de inscripción del período que estás cursando en la universidad</li>
              <li>Constancia de estudios</li>
              <li>Reporte de notas del período académico culminado</li>
              <li>Copia de las notas certificadas de bachillerato</li>
            </ul>
          </li>
        </ul>
        <Button
          href="#aplicacion"
          className="font-bold hover:!text-white border-[#0069B0] hover:!bg-[#0069B0] text-[#0069B0]"
          radius="sm"
          as={Link}
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
