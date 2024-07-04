import SelectComponent from '@/components/Select';
import CollageForm from '@/components/admission/collage/collageAdmisionForm';
import ContactInfoForm from '@/components/admission/contactInfo/ContactInfoForm';
import HighSchoolForm from '@/components/admission/highSchool/HighSchoolForm';
import LanguagesForm from '@/components/admission/languageKnowledge/LanguageKnowledgeForm';
import PersonalInformation from '@/components/public/admision/form/PersonalInformation';
import Aside from '@/components/public/signin/Aside';
import { Button } from '@nextui-org/button';
import { Input, Textarea } from '@nextui-org/input';
import Link from 'next/link';

const VENEZUELA_STATES = [
  { label: 'Amazonas', value: 'AMAZONAS' },
  { label: 'Anzoátegui', value: 'ANZOATEGUI' },
  { label: 'Apure', value: 'APURE' },
  { label: 'Aragua', value: 'ARAGUA' },
  { label: 'Barinas', value: 'BARINAS' },
  { label: 'Bolívar', value: 'BOLIVAR' },
  { label: 'Carabobo', value: 'CARABOBO' },
  { label: 'Cojedes', value: 'COJEDES' },
  { label: 'Delta Amacuro', value: 'DELTA_AMACURO' },
  { label: 'Falcón', value: 'FALCON' },
  { label: 'Guárico', value: 'GUARICO' },
  { label: 'Lara', value: 'LARA' },
  { label: 'Mérida', value: 'MERIDA' },
  { label: 'Miranda', value: 'MIRANDA' },
  { label: 'Monagas', value: 'MONAGAS' },
  { label: 'Nueva Esparta', value: 'NUEVA_ESPARTA' },
  { label: 'Portuguesa', value: 'PORTUGUESA' },
  { label: 'Sucre', value: 'SUCRE' },
  { label: 'Táchira', value: 'TACHIRA' },
  { label: 'Trujillo', value: 'TRUJILLO' },
  { label: 'Vargas', value: 'VARGAS' },
  { label: 'Yaracuy', value: 'YARACUY' },
  { label: 'Zulia', value: 'ZULIA' },
  { label: 'Dependencias Federales', value: 'DEPENDENCIAS_FEDERALES' },
  { label: 'Distrito Capital', value: 'DISTRITO_CAPITAL' },
];

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
  searchParams?: {
    paso: 'contacto' | 'secundaria' | 'universidad' | 'familia' | 'ingles' | 'familia' | undefined;
  };
}) => {
  const handleSubmit = async (formData: FormData) => {
    'use server';
    const data = Object.fromEntries(formData);
    console.log(data);
  };

  return (
    <main className="bg-gray-100 w-full flex flex-col md:flex-row-reverse min-h-screen md:overflow-hidden ">
      <Aside cookieValue="admin" />
      <section className="p-4 md:p-24 justify-center flex md:w-5/6 flex-col gap-8">
        <h1 className="text-center text-3xl md:text-4xl font-bold text-primary-light">
          Formulario de Postulación para el Programa Excelencia (ProExcelencia) AVAA
        </h1>
        <div action={handleSubmit}>
          {searchParams?.paso === undefined && <PersonalInformation />}
          {searchParams?.paso === 'contacto' && <ContactInfoForm />}
          {searchParams?.paso === 'familia' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
              <Separator num={4} title="Redes sociales" />
              <Input type="number" label="Promedio de ingreso familiar" />
              <SelectComponent
                label="Con quien vives"
                items={[
                  { label: 'Padres', value: 'PUBLIC' },
                  { label: 'Familiares', value: 'PRIVATE' },
                  { label: 'Otros', value: 'PRIVATE' },
                ]}
              />
              <SelectComponent
                label="Tipo de vivienda"
                items={[
                  { label: 'Propia', value: 'PUBLIC' },
                  { label: 'Alquilada', value: 'PRIVATE' },
                  { label: 'Hipotecada', value: 'PRIVATE' },
                ]}
              />
              <Input type="text" label="Composición del núcleo familiar" />
              <Input type="text" label="Ocupacion del padre" />
              <Input
                type="text"
                label="Nombre de la empresa u organización en donde trabaja el madre"
              />
              <Input type="number" label="Años de experiencia del padre" />
              <SelectComponent
                label="Grado de instruccion del padre"
                items={[
                  { label: 'Propia', value: 'PUBLIC' },
                  { label: 'Alquilada', value: 'PRIVATE' },
                  { label: 'Hipotecada', value: 'PRIVATE' },
                ]}
              />

              <Input type="text" label="Ocupacion de la madre" />
              <Input type="text" label="Nombre de la empresa u organización en donde trabaja " />
              <Input type="number" label="Años de experiencia de la madre" />
              <SelectComponent
                label="Grado de instruccion de la madre"
                items={[
                  { label: 'Propia', value: 'PUBLIC' },
                  { label: 'Alquilada', value: 'PRIVATE' },
                  { label: 'Hipotecada', value: 'PRIVATE' },
                ]}
              />

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
          {searchParams?.paso === 'trabajo' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
              <Separator num={4} title="Redes sociales" />
              <SelectComponent
                label="¿Actualmente trabaja?"
                items={[
                  { label: 'Si', value: 'YES' },
                  { label: 'No', value: 'NO' },
                ]}
              />
              <Input type="number" label="Nombre de la organización/empresa donde trabaja" />

              <Input type="text" label="Cargo que desempeña" />
              <SelectComponent
                label="Modalidad de trabajo"
                items={[
                  {
                    label: 'Prsencial',
                    value: 'IN_PERSON',
                  },
                  {
                    label: 'Virtual',
                    value: 'ONLINE',
                  },
                  {
                    label: 'Mixta',
                    value: 'Hibrida',
                  },
                ]}
              />
              <SelectComponent
                label="Horario de trabajo"
                items={[
                  {
                    label: 'Tiempo completo',
                    value: 'IN_PERSON',
                  },
                  {
                    label: 'Tiempo parcial',
                    value: 'ONLINE',
                  },
                  {
                    label: 'Freelancer',
                    value: 'Hibrida',
                  },
                  {
                    label: 'Fines de semana',
                    value: 'Hibrida',
                  },
                ]}
              />
              <SelectComponent
                label="¿Contribuye con el ingreso familiar?"
                items={[
                  { label: 'Si', value: 'YES' },
                  { label: 'No', value: 'NO' },
                ]}
              />

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
          {searchParams?.paso === 'secundaria' && <HighSchoolForm />}
          {searchParams?.paso === 'universidad' && <CollageForm />}
          {searchParams?.paso === 'ingles' && <LanguagesForm />}
          {searchParams?.paso === 'adicional' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
              <Separator num={3} title="Información adicional" />
              <SelectComponent
                label="¿Posee conexión a internet?"
                items={[
                  {
                    label: 'Sí',
                    value: 'YES',
                  },
                  {
                    label: 'No',
                    value: 'NO',
                  },
                ]}
              />
              <SelectComponent
                label="¿Qué tan estable es tu conectividad? "
                items={[
                  {
                    label: '1',
                    value: '1',
                  },
                  {
                    label: '2',
                    value: '2',
                  },
                  {
                    label: '3',
                    value: '3',
                  },
                  {
                    label: '4',
                    value: '4',
                  },
                  {
                    label: '5',
                    value: '5',
                  },
                ]}
              />

              <Textarea isRequired label="¿Por qué solicita esta beca?" />
              <SelectComponent
                label="¿Eres referido por algún becario de AVAA?"
                items={[
                  {
                    label: 'Sí',
                    value: 'YES',
                  },
                  {
                    label: 'No',
                    value: 'NO',
                  },
                ]}
              />
              <SelectComponent
                label="Seleccione el becario por el cual fue referido"
                items={[
                  {
                    label: 'Sí',
                    value: 'YES',
                  },
                  {
                    label: 'No',
                    value: 'NO',
                  },
                ]}
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
        </div>
      </section>
    </main>
  );
};

export default page;
