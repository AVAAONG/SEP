import { Button } from '@nextui-org/button';
import { Image } from '@nextui-org/image';
import Link from 'next/link';

const Hero = () => {
  return (
    <section className="flex flex-col min-h-screen w-full gap-36 pt-0 ">
      <div className="w-full items-center justify-left font-mono text-sm">
        <div className="bottom-0 left-0 flex w-full items-end justify-center md:justify-end lg:static lg:h-auto lg:w-auto">
          <Link
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://www.avaa.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src="/avaa-color-simple.png" alt="AVAA Logo" width={100} height={24} />
          </Link>
        </div>
      </div>
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-wide text-primary-light sm:text-4xl md:text-5xl lg:text-6xl">
              ¡Bienvenido al Programa Excelencia AVAA!
            </h1>
            <p className="mx-auto lg:text-lg max-w-[900px] text-gray-500  dark:text-gray-400">
              El Programa Excelencia AVAA{' '}
              <span className="text-primary-light font-bold">(ProExcelencia)</span> es un programa
              de formación integral dirigido a jóvenes bachilleres venezolanos, con edades
              comprendidas entre 17 y 21 años, estudiantes de universidades nacionales, públicas o
              privadas, de alto desempeño y excelente rendimiento académico, potencial de liderazgo
              y compromiso social.
            </p>
          </div>
          <div className="space-x-4  w-full">
            <Button
              href="#aplicacion"
              className="font-bold hover:!text-white"
              radius="sm"
              as={Link}
              color="success"
              variant="ghost"
            >
              Aplicar
            </Button>
            <Button
              href="#requisitos"
              className="font-bold text-white"
              as={Link}
              color="success"
              radius="sm"
            >
              Ver requisitos
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
