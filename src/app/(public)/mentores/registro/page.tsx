import Aside from '@/components/public/signin/Aside';
import { Button, Input, Textarea } from '@nextui-org/react';
import Image from 'next/image';
import Link from 'next/link';
import defaultProfilePic from '../../../../../public/defaultProfilePic.png';

const Separator = ({ num, title }: { num: Number; title: string }) => (
  <div className="md:col-span-2 flex items-center gap-2 mb-4 w-full">
    <div className="inline-flex items-center rounded-full border py-1 px-2  text-xs font-semibold transition-colors focus:outline-none  border-transparent hover:bg-primary/80 bg-green-500 text-white">
      {num.toString()}
    </div>
    <p className="text-lg font-semibold dark:text-white">{title}</p>
  </div>
);

const page = async ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { paso: '1' | '2' | '3' | '4' | undefined };
}) => {
  const handleSubmit = async (formData: FormData) => {
    'use server';
    const data = Object.fromEntries(formData);
    console.log(data);
  };

  return (
    <main className="w-full flex flex-col md:flex-row-reverse min-h-screen md:overflow-hidden ">
      <Aside cookieValue="admin" />
      <section className="p-4 md:p-24 justify-center flex md:w-5/6 flex-col gap-8">
        <h1 className="text-center text-3xl md:text-4xl font-bold text-primary-light">
          Registro de nuevos mentores
        </h1>
        <form action={handleSubmit}>
          {searchParams?.paso === undefined && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
              <Separator num={1} title="Información personal" />
              <div className="w-full rounded-full flex items-center justify-center gap-4 md:col-span-2">
                <Image
                  width={80}
                  height={80}
                  className="rounded-full bg-white"
                  src={defaultProfilePic}
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
              <Input type="number" label="Cédula de identidad" />
              <Input type="number" isRequired label="Número telefónico" />
              <Input type="email" isRequired label="Correo electrónico" className="md:col-span-2" />
              <Input type="date" placeholder="YYY/MM/DD" isRequired label="Fecha de nacimiento" />
              <Input isRequired type="text" label="Ciudad de residencia" />
              <Button color="success" className="md:col-start-2 ">
                <Link
                  className="w-full h-full flex items-center justify-center"
                  replace={false}
                  href="?paso=2"
                >
                  Siguiente
                </Link>
              </Button>
            </div>
          )}
          {searchParams?.paso === '2' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
              <Separator num={2} title="Información profesional" />
              <Input isRequired type="text" label="¿Cuál es tu profesión?" autoFocus />
              <Input
                isRequired
                type="text"
                label="Nombre de la empresa, institución u organización donde trabajas"
              />
              <Input isRequired type="text" label="¿Cuál es tu cargo u ocupación?" />
              <Input
                isRequired
                type="file"
                className="file:hidden"
                label="Adjunta tu síntesis curricular"
              />

              <Button>
                <Link
                  className="w-full h-full flex items-center justify-center"
                  replace={false}
                  href="?"
                >
                  Anterior
                </Link>
              </Button>
              <Button color="success">
                <Link
                  className="w-full h-full flex items-center justify-center"
                  replace={false}
                  href="?paso=3"
                >
                  Siguiente
                </Link>
              </Button>
            </div>
          )}
          {searchParams?.paso === '3' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
              <Separator num={3} title="Por definir" />
              <Input isRequired type="text" label="¿Cuáles son tus hobbies?" autoFocus />
              <Input
                isRequired
                type="text"
                label="¿Cómo se entero del Programa de Mentoría AVAA?"
              />
              <Textarea isRequired label="¿A cuáles otras actividades te dedicas?" />
              <Textarea isRequired label="Áreas de interés personal" />
              <Textarea
                isRequired
                className="md:col-span-2"
                label="¿Por qué serías el mentor indicado para acompañar a un estudiante universitario en su proceso de formación profesional?"
              />

              <Button>
                <Link
                  className="w-full h-full flex items-center justify-center"
                  replace={false}
                  href="?paso=2"
                >
                  Anterior
                </Link>
              </Button>
              <Button color="success">
                <Link
                  className="w-full h-full flex items-center justify-center"
                  replace={false}
                  href="?paso=4"
                >
                  Siguiente
                </Link>
              </Button>
            </div>
          )}
          {searchParams?.paso === '4' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
              <Separator num={4} title="Redes sociales" />
              <Input
                startContent="@"
                name="twitter_user"
                autoFocus
                type="text"
                label="¿Cuál es tu usuario de Twitter?"
              />
              <Input
                startContent="@"
                type="text"
                name="facebook_user"
                label="¿Cuál es tu usuario de Facebook?"
              />
              <Input
                startContent="@"
                type="text"
                name="instagram_user"
                label="¿Cuál es tu usuario de Instagram?"
              />
              <Input
                startContent="@"
                type="text"
                name="linkedin_user"
                label="¿Cuál es tu usuario de Linkedin?"
              />
              <Input
                startContent="@"
                type="text"
                name="tiktok_user"
                label="¿Cuál es tu usuario de TikTok?"
              />
              <div></div>
              <Button>
                <Link
                  className="w-full h-full flex items-center justify-center"
                  replace={false}
                  href="?paso=3"
                >
                  Anterior
                </Link>
              </Button>
              <Button color="success" type="submit" className="text-white">
                ¡Registrarse en el programa de mentoria AVAA!
              </Button>
            </div>
          )}
        </form>
      </section>
    </main>
  );
};

export default page;
