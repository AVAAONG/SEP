/**
 * @file This is the main page of the application.
 * @author Kevin Bravo (kevinbravo.me)
 */

import { Button, Checkbox, CheckboxGroup, Input, Textarea } from '@nextui-org/react';
import Image from 'next/image';
import Link from 'next/link';

const page = () => (
  <main className="dark:bg-dark bg-light flex  flex-col w-full items-center justify-between  overflow-y-clip">
    <section className="flex flex-col min-h-screen w-full gap-36 lg:p-24">
      <div className="w-full items-center justify-left font-mono text-sm">
        <div className="bottom-0 left-0 flex w-full items-end justify-center md:justify-end lg:static lg:h-auto lg:w-auto">
          <Link
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://www.avaa.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{' '}
            <Image src="/avaa-color-simple.png" alt="AVAA Logo" width={100} height={24} priority />
          </Link>
        </div>
      </div>
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter text-primary-light sm:text-4xl md:text-5xl lg:text-6xl">
              ¡Se parte del Programa de Excelencia Académica!
            </h1>
            <p className="mx-auto text-lg max-w-[900px] text-gray-500  dark:text-gray-400">
              El Programa de Excelencia Académica{' '}
              <span className="text-primary-light font-bold">(ProExcelencia)</span> de AVAA es un
              programa de formación destinado a jovenes bachilleres venezolanos, con edades
              comprendidas entre 17 y 21 años, estudiantes de universidades nacionales, públicas o
              privadas, que posean alto desempeño estudiantil y buen rendimiento académico,
              potencial de liderazgo y compromiso social.{' '}
            </p>
          </div>
          <div className="space-x-4  w-full">
            <Button
              href="#requisitos"
              className="font-bold"
              as={Link}
              color="success"
              radius="sm"
              variant="ghost"
            >
              Ver requisitos
            </Button>
            <Button
              href="#aplicacion"
              className="font-bold"
              radius="sm"
              as={Link}
              color="success"
              variant="ghost"
            >
              Aplicar
            </Button>
          </div>
        </div>
      </div>
    </section>
    <section className="bg-white min-h-screen w-full flex items-center p-24" id="requisitos">
      <div className="space-y-4 w-1/2 ">
        <h2 className="text-3xl font-bold tracking-tighter text-primary-light sm:text-4xl md:text-5xl ">
          ¿Que necesitas para ser parte de ProExcelencia?
        </h2>
        <p className=" mt-auto text-lg max-w-[900px] text-gray-500  dark:text-gray-400">
          Antes de aplicar al programa, asegúrese de cumplir con los siguientes requisitos.
        </p>
        <Button
          href="#aplicacion"
          className="font-bold"
          radius="sm"
          as={Link}
          color="success"
          variant="ghost"
        >
          ¡Aplicar!
        </Button>
      </div>
      <div className="w-1/2">
        <CheckboxGroup
          label="Te invitamos a seleccionar cuales de las siguientes condiciones cumples"
          color="success"
        >
          <Checkbox value="1">Ser venezolano</Checkbox>
          <Checkbox value="2">
            Ser estudiante universitario regular en una institución pública o privada, en Carreras
            Largas, de acuerdo con la OPSU: programas de estudio con una duración entre cuatro (4) y
            siete (7) años que conducen al título de Licenciado o su equivalente
          </Checkbox>
          <Checkbox value="3">
            NO haber avanzado más allá del segundo año en la carrera universitaria que está
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
      </div>
    </section>
    <section
      className="min-h-screen flex flex-col items-center justify-around w-full p-24"
      id="aplicacion"
    >
      <div className="w-full flex flex-col items-center justify-center gap-3">
        <h1 className="text-3xl font-bold tracking-tighter text-primary-light sm:text-4xl md:text-5xl lg:text-6xl">
          Selecciona el capitulo
        </h1>
        <p className=" mt-auto text-lg w-full text-gray-500 text-center ">
          Selecciona el capitulo en base a donde se encuentre el campus de tu universidad
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-6 justify-center w-full  ">
        <Link
          href="/signin/admin"
          className="w-full md:max-w-[35ch] h-min relative group rounded-lg p-2 sm:p-5 text-dark dark:text-light border-primary-light border transition-all dark:hover:bg-primary-light dark:focus:bg-primary-light hover:bg-primary-1 focus:bg-primary-1"
          rel="noopener noreferrer"
        >
          <h2 className={`text-2xl font-medium`}>
            <span className="hidden md:inline-block">Capitulo Zulia</span>
            <span className="inline-block md:hidden">Zulia</span>

            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              <svg
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                width="50"
                height="20"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                ></path>
              </svg>
            </span>
          </h2>
          <p className={`hidden sm:block m-0 max-w-[30ch] text-xs lg:text-sm`}>
            Si el campus de tu universidad se encuentra en el estado de Zulia, ingresa aqui
          </p>
        </Link>
        <Link
          href="/signin/admin"
          className="w-full md:max-w-[35ch] h-min  relative group rounded-lg p-2 sm:p-5 text-dark dark:text-light border-primary-light border transition-all dark:hover:bg-primary-light dark:focus:bg-primary-light hover:bg-primary-1 focus:bg-primary-1"
          rel="noopener noreferrer"
        >
          <h2 className={`text-2xl font-medium`}>
            <span className="hidden md:inline-block">Capitulo Carabobo</span>
            <span className="inline-block md:hidden">Carabobo</span>
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              <svg
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                width="50"
                height="20"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                ></path>
              </svg>
            </span>
          </h2>
          <p className={`hidden sm:block m-0 max-w-[30ch] text-xs lg:text-sm`}>
            Si el campus de tu universidad se encuentra en el estado de Carabobo, ingresa aqui
          </p>
        </Link>
        <Link
          href="/signin/admin"
          className="w-full md:max-w-[35ch] h-min relative group rounded-lg p-2 sm:p-5 text-dark dark:text-light border-primary-light border transition-all dark:hover:bg-primary-light dark:focus:bg-primary-light hover:bg-primary-1 focus:bg-primary-1"
          rel="noopener noreferrer"
        >
          <h2 className={`text-2xl font-medium`}>
            <span className="hidden md:inline-block">Capitulo Caracas</span>
            <span className="inline-block md:hidden">Caracas</span>
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              <svg
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                width="50"
                height="20"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                ></path>
              </svg>
            </span>
          </h2>
          <p className={`hidden sm:block m-0 max-w-[30ch] text-xs lg:text-sm`}>
            Si el campus de tu universidad se encuentra en la Region Capital, ingresa aqui
          </p>
        </Link>
      </div>
    </section>
    <section
      className="bg-white min-h-screen w-full flex flex-col items-center gap-16 p-24"
      id="requisitos"
    >
      <div className="space-y-2 w-1/2 ">
        <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-4xl md:text-5xl ">
          Ponte en contacto con nosotros
        </h2>
        <p className=" mt-auto text-lg w-full text-gray-500 text-center ">
          Si tienes alguna duda, puedes contactarnos a través de los siguientes medios.
        </p>
      </div>
      <div className="w-full flex">
        <div className="w-1/2 flex flex-col items-center gap-6">
          <div className="flex flex-col items-center gap-1 border-1 border-gray-400 p-4 rounded-lg w-[350px]">
            <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24">
              <path d="M20 4H6c-1.103 0-2 .897-2 2v5h2V8l6.4 4.8a1.001 1.001 0 0 0 1.2 0L20 8v9h-8v2h8c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm-7 6.75L6.666 6h12.668L13 10.75z"></path>
              <path d="M2 12h7v2H2zm2 3h6v2H4zm3 3h4v2H7z"></path>
            </svg>
            <p className="font-bold">Email</p>
            <p className="text-gray-500">admisionproexcelencia.avaa@gmail.com</p>
            <p className="flex items-center gap-2">
              Escribenos
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none ">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  width="30"
                  height="20"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                  ></path>
                </svg>
              </span>
            </p>
          </div>
          <div className="flex flex-col items-center gap-1 border-1 border-gray-400 p-4 rounded-lg w-[350px]">
            <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24">
              <path d="M16.57 22a2 2 0 0 0 1.43-.59l2.71-2.71a1 1 0 0 0 0-1.41l-4-4a1 1 0 0 0-1.41 0l-1.6 1.59a7.55 7.55 0 0 1-3-1.59 7.62 7.62 0 0 1-1.59-3l1.59-1.6a1 1 0 0 0 0-1.41l-4-4a1 1 0 0 0-1.41 0L2.59 6A2 2 0 0 0 2 7.43 15.28 15.28 0 0 0 6.3 17.7 15.28 15.28 0 0 0 16.57 22zM6 5.41 8.59 8 7.3 9.29a1 1 0 0 0-.3.91 10.12 10.12 0 0 0 2.3 4.5 10.08 10.08 0 0 0 4.5 2.3 1 1 0 0 0 .91-.27L16 15.41 18.59 18l-2 2a13.28 13.28 0 0 1-8.87-3.71A13.28 13.28 0 0 1 4 7.41zM20 11h2a8.81 8.81 0 0 0-9-9v2a6.77 6.77 0 0 1 7 7z"></path>
              <path d="M13 8c2.1 0 3 .9 3 3h2c0-3.22-1.78-5-5-5z"></path>
            </svg>
            <p className="font-bold">Telefono local</p>
            <p className="text-gray-500">0212 2357821</p>
            <p className="flex items-center gap-2">
              Llamanos
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none ">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  width="30"
                  height="20"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                  ></path>
                </svg>
              </span>
            </p>
          </div>
        </div>
        <div className="w-1/2 flex flex-col gap-6">
          <Input type="text" label="Nombre y apellido" />
          <Input type="text" label="Email" />
          <Input type="text" label="Asunto del correo" />
          <Textarea label="Mensaje" />
          <Button
            color="success"
            className=" self-end text-white font-bold text-lg w-[200px] h-[60px]"
          >
            Enviar mensaje{' '}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M14.2199 21.9352C13.0399 21.9352 11.3699 21.1052 10.0499 17.1352L9.32988 14.9752L7.16988 14.2552C3.20988 12.9352 2.37988 11.2652 2.37988 10.0852C2.37988 8.91525 3.20988 7.23525 7.16988 5.90525L15.6599 3.07525C17.7799 2.36525 19.5499 2.57525 20.6399 3.65525C21.7299 4.73525 21.9399 6.51525 21.2299 8.63525L18.3999 17.1252C17.0699 21.1052 15.3999 21.9352 14.2199 21.9352ZM7.63988 7.33525C4.85988 8.26525 3.86988 9.36525 3.86988 10.0852C3.86988 10.8052 4.85988 11.9052 7.63988 12.8252L10.1599 13.6652C10.3799 13.7352 10.5599 13.9152 10.6299 14.1352L11.4699 16.6552C12.3899 19.4352 13.4999 20.4252 14.2199 20.4252C14.9399 20.4252 16.0399 19.4352 16.9699 16.6552L19.7999 8.16525C20.3099 6.62525 20.2199 5.36525 19.5699 4.71525C18.9199 4.06525 17.6599 3.98525 16.1299 4.49525L7.63988 7.33525Z"
                fill="#fff"
              ></path>
              <path
                d="M10.11 14.7052C9.92005 14.7052 9.73005 14.6352 9.58005 14.4852C9.29005 14.1952 9.29005 13.7152 9.58005 13.4252L13.16 9.83518C13.45 9.54518 13.93 9.54518 14.22 9.83518C14.51 10.1252 14.51 10.6052 14.22 10.8952L10.64 14.4852C10.5 14.6352 10.3 14.7052 10.11 14.7052Z"
                fill="#fff"
              ></path>
            </svg>
          </Button>
        </div>
      </div>
    </section>
    <section className="min-h-screen w-full flex flex-col items-center gap-16 p-24" id="requisitos">
      <div className="space-y-2 w-1/2 ">
        <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-4xl md:text-5xl ">
          Preguntas frecuentes
        </h2>
      </div>
    </section>
  </main>
);

export default page;
