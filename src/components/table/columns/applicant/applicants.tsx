'use client';
import { DocumentIcon } from '@heroicons/react/24/outline';
import { Avatar, Button, Tooltip } from "@heroui/react";
import { Column } from 'react-table';

const parseStepIntoName = (step: number) => {
  switch (step) {
    case 1:
      return 'Información Personal';
    case 2:
      return 'Información de Contacto';
    case 3:
      return 'Información Familiar';
    case 4:
      return 'Información Laboral';
    case 5:
      return 'Conocimiento de Idiomas';
    case 6:
      return 'Información de Bachillerato';
    case 7:
      return 'Información Universitaria';
    case 8:
      return 'Información Adicional';
    case 9:
      return 'Anexos';
    default:
      return '';
  }
};

const CombinedColumns: Column<any>[] = [
  {
    Header: 'Postulante',
    accessor: 'id',
    Cell: ({ value, row }) => {
      return (
        // <Link href={scholarId ? `/admin/becarios/${scholarId}` : ''} className="w-67">
        // </Link>
        (<div className="flex items-center  w-full w-67">
          <div className="flex-shrink-0 w-8 h-8">
            <Avatar
              className="w-full h-full rounded-full"
              src={row.original.photo ? row.original.photo : undefined}
              alt="Foto de perfil"
            />
          </div>
          <div className="ml-4 text-start w-full">
            <span className="text-sm font-medium text-gray-900 dark:text-slate-100">
              {row.original.firstNames} {row.original.lastNames}
            </span>
          </div>
        </div>)
      );
    },
  },
  {
    Header: 'Tiempo que ha tardado postulándose',
    accessor: 'startTime',
    Cell: ({ value, row }) => {
      const startDate = new Date(row.original.startTime);
      const endDate = new Date(row.original.endTime ?? new Date().toISOString());
      const difference = endDate.getTime() - startDate.getTime();
      const hoursDifference = Math.floor(difference / (1000 * 60 * 60));
      const minutesDifference = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      return <p>{`${hoursDifference}h con ${minutesDifference}m`}</p>;
    },
  },
  {
    Header: 'Paso Actual',
    accessor: 'step',
    Cell: ({ value }) => {
      return <p>{parseStepIntoName(value)}</p>;
    },
  },
  {
    Header: 'Estado',
    accessor: 'status',
    Cell: ({ value }) => {
      if (value === 'PHASE_I') {
        return (
          <span className="inline-flex items-center bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300">
            Completando formulario
          </span>
        );
      } else {
        return (
          <span className="inline-flex items-center bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
            {value}
          </span>
        );
      }
    },
  },
  // PersonalInfo Columns

  {
    Header: 'Cédula',
    accessor: 'dni',
  },
  {
    Header: 'Género',
    accessor: 'gender',
    Cell: ({ value }) => {
      if (value === 'M') {
        return (
          <span className="inline-flex items-center bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
            Masculino
          </span>
        );
      } else {
        return (
          <span className="inline-flex items-center bg-rose-100 text-rose-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-rose-900 dark:text-rose-300">
            Femenino
          </span>
        );
      }
    },
    disableSortBy: true,
  },
  {
    Header: 'Estado',
    accessor: 'state',
  },
  {
    Header: 'Dirección',
    accessor: 'address',
  },
  // ContactInfo Columns
  {
    Header: 'Teléfono Local',
    accessor: 'localPhoneNumber',
  },
  {
    Header: 'Teléfono WhatsApp',
    accessor: 'whatsAppPhoneNumber',
  },
  {
    Header: 'Correo Electrónico',
    accessor: 'email',
  },
  {
    Header: 'Teléfono de amigo o familiar',
    accessor: 'parentalPhoneNumber',
  },
  {
    Header: 'Nombre del amigo o familiar',
    accessor: 'parental',
  },
  // FamilyInfo Columns
  {
    Header: 'Ingreso Familiar Promedio',
    accessor: 'averageFamilyIncome',
  },
  {
    Header: 'Con Quién Vives',
    accessor: 'whitWhoDoYouLive',
  },
  {
    Header: 'Tipo de Casa',
    accessor: 'kindOfHouse',
  },
  {
    Header: 'Contribuye al Ingreso Familiar',
    accessor: 'contributeToFamilyIncome',
    Cell: ({ cell: { value } }) => <p>{value ? 'Sí' : 'No'}</p>,
  },
  {
    Header: 'Miembros de la Familia',
    accessor: 'familyMembers',
  },
  {
    Header: 'Trabajo del Padre',
    accessor: 'fatherJob',
  },
  {
    Header: 'Nombre de la Empresa del Padre',
    accessor: 'fathersCompanyName',
  },
  {
    Header: 'Trabajo de la Madre',
    accessor: 'motherJob',
  },
  {
    Header: 'Nombre de la Empresa de la Madre',
    accessor: 'mothersCompanyName',
  },
  // JobInfo Columns
  {
    Header: 'Actualmente Trabajando',
    accessor: 'currentlyWorking',
    Cell: ({ cell: { value } }) => <p>{value ? 'Sí' : 'No'}</p>,
  },
  {
    Header: 'Empresa',
    accessor: 'jobCompany',
  },
  {
    Header: 'Título del Trabajo',
    accessor: 'jobTitle',
  },
  {
    Header: 'Modalidad del Trabajo',
    accessor: 'jobModality',
  },
  {
    Header: 'Horario del Trabajo',
    accessor: 'jobSchedule',
  },
  // LanguageKnowledge Columns
  {
    Header: 'Habla Otro Idioma',
    accessor: 'speaksOtherLanguage',
    Cell: ({ cell: { value } }) => <p>{value ? 'Sí' : 'No'}</p>,
  },
  {
    Header: 'Idioma Especificado',
    accessor: 'specifiedLanguage',
  },
  {
    Header: 'Nivel del Idioma',
    accessor: 'languageLevel',
  },
  // HighSchool Columns
  {
    Header: 'Nombre de la Institución',
    accessor: 'institutionName',
  },
  {
    Header: 'Dependencia de la Institución',
    accessor: 'institutionDependency',
  },
  {
    Header: 'Promedio de notas',
    accessor: 'gpa',
  },
  {
    Header: 'Título de Graduación',
    accessor: 'graduationTitle',
  },
  {
    Header: 'Mención',
    accessor: 'mention',
  },
  {
    Header: 'Actividades Extracurriculares',
    accessor: 'extracurricularActivities',
    disableSortBy: true,
    Cell: ({ value }) => {
      return (
        <Tooltip
          content={value}
          classNames={{
            content: 'bg-light dark:bg-dark text-dark dark:text-light',
          }}
        >
          <div className="block w-72 overflow-x-scroll">{value}</div>
        </Tooltip>
      );
    },
  },
  // AdditionalInfo Columns
  {
    Header: 'Tiene Conexión a Internet',
    accessor: 'hasInternetConnection',
    Cell: ({ cell: { value } }) => <p>{value ? 'Sí' : 'No'}</p>,
  },
  {
    Header: 'Estabilidad de la Conexión a Internet',
    accessor: 'internetConnectionStability',
  },
  {
    Header: 'Fuente de Descubrimiento del Programa',
    accessor: 'programDiscoverySource',
  },
  {
    Header: 'Referido por un Becario',
    accessor: 'isReferredByScholar',
    Cell: ({ cell: { value } }) => <p>{value ? 'Sí' : 'No'}</p>,
  },
  {
    Header: 'Nombre del Becario Referido',
    accessor: 'referredScholarName',
  },
  {
    Header: 'Razón de la Aplicación a la Becas',
    accessor: 'scholarshipApplicationReason',
    disableSortBy: true,
    Cell: ({ value }) => {
      return (
        <Tooltip
          content={value}
          classNames={{
            content: 'bg-light dark:bg-dark text-dark dark:text-light',
          }}
        >
          <div className="block w-72 overflow-x-scroll">{value}</div>
        </Tooltip>
      );
    },
  },

  // CollageInfo Columns
  {
    Header: 'Tipo de Universidad',
    accessor: 'kindOfCollage',
  },
  {
    Header: 'Universidad',
    accessor: 'collage',
  },
  {
    Header: 'Área de Estudio',
    accessor: 'studyArea',
  },
  {
    Header: 'Régimen de Estudio',
    accessor: 'studyRegime',
  },
  {
    Header: 'Carrera',
    accessor: 'career',
  },

  {
    Header: 'Período Académico Actual',
    accessor: 'currentAcademicPeriod',
  },
  {
    Header: 'Promedio de notas',
    accessor: 'grade',
  },
  {
    Header: 'Modalidad de Clases',
    accessor: 'classModality',
  },
  {
    Header: 'Tiene Beca',
    accessor: 'haveScholarship',
    Cell: ({ cell: { value } }) => <p>{value ? 'Sí' : 'No'}</p>,
  },
  {
    Header: 'Porcentaje de Beca',
    accessor: 'scholarshipPercentage',
  },
  // Annexes Columns
  {
    Header: 'Cédula de Identidad',
    accessor: 'dniCard',
    Cell: ({ cell: { value } }) => (
      <Button radius="sm" isIconOnly variant="ghost" onClick={() => window.open(value, '_blank')}>
        <DocumentIcon className="w-8 h-8 text-blue-400" />
      </Button>
    ),
  },
  {
    Header: 'RIF',
    accessor: 'rif',
    Cell: ({ cell: { value } }) => (
      <Button radius="sm" isIconOnly variant="ghost" onClick={() => window.open(value, '_blank')}>
        <DocumentIcon className="w-8 h-8 text-blue-400" />
      </Button>
    ),
  },
  {
    Header: 'Calificaciones de Bachillerato',
    accessor: 'highSchoolGrades',
    Cell: ({ cell: { value } }) => (
      <Button radius="sm" isIconOnly variant="ghost" onClick={() => window.open(value, '_blank')}>
        <DocumentIcon className="w-8 h-8 text-blue-400" />
      </Button>
    ),
  },
  {
    Header: 'Calificaciones de la Universidad',
    accessor: 'universityGrades',
    Cell: ({ cell: { value } }) => (
      <Button radius="sm" isIconOnly variant="ghost" onClick={() => window.open(value, '_blank')}>
        <DocumentIcon className="w-8 h-8 text-blue-400" />
      </Button>
    ),
  },
  {
    Header: 'Constancia de Estudios Universitarios',
    accessor: 'studyProof',
    Cell: ({ cell: { value } }) => (
      <Button radius="sm" isIconOnly variant="ghost" onClick={() => window.open(value, '_blank')}>
        <DocumentIcon className="w-8 h-8 text-blue-400" />
      </Button>
    ),
  },
  {
    Header: 'Carta de Referencia de un Profesor 1',
    accessor: 'professorReferenceLetterI',
    Cell: ({ cell: { value } }) => (
      <Button radius="sm" isIconOnly variant="ghost" onClick={() => window.open(value, '_blank')}>
        <DocumentIcon className="w-8 h-8 text-blue-400" />
      </Button>
    ),
  },
  {
    Header: 'Carta de Referencia de un Profesor 2',
    accessor: 'professorReferenceLetterII',
    Cell: ({ cell: { value } }) => (
      <Button radius="sm" isIconOnly variant="ghost" onClick={() => window.open(value, '_blank')}>
        <DocumentIcon className="w-8 h-8 text-blue-400" />
      </Button>
    ),
  },
  {
    Header: 'Recibo de Algún Servicio',
    accessor: 'utilityBillVerification',
    Cell: ({ cell: { value } }) => (
      <Button radius="sm" isIconOnly variant="ghost" onClick={() => window.open(value, '_blank')}>
        <DocumentIcon className="w-8 h-8 text-blue-400" />
      </Button>
    ),
  },
  {
    Header: 'Ensayo de 500 Palabras',
    accessor: 'personalEssay',
    Cell: ({ cell: { value } }) => (
      <Button radius="sm" isIconOnly variant="ghost" onClick={() => window.open(value, '_blank')}>
        <DocumentIcon className="w-8 h-8 text-blue-400" />
      </Button>
    ),
  },
];

export default CombinedColumns;
