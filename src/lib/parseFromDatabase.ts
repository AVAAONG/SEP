import { Collages, StudyArea } from '@prisma/client';

export const parseStudyAreaFromDatabase = (studyArea: StudyArea) => {
  switch (studyArea) {
    case 'ARCHITECTURE_URBANISM':
      return 'Arquitectura y urbanismo';
    case 'HEALTH_SCIENCES':
      return 'Ciencias de la salud';
    case 'HUMANITIES_EDUCATION':
      return 'Humanidades y educación';
    case 'JURIDICAL_POLITICAL_SCIENCES':
      return 'Ciencias jurídicas y políticas';
    case 'SOCIAL_SCIENCES':
      return 'Ciencias sociales';
    case 'STEM':
      return 'Ciencias, tecnología, ingeniería y matemáticas';
  }
};

export const getCollageName = (university: Collages) => {
  switch (university) {
    case 'UCAB':
      return `Universidad Católica Andrés Bello (${university})`;
    case 'USB':
      return `Universidad Simón Bolívar (${university})`;
    case 'UCV':
      return `Universidad Central de Venezuela (${university})`;
    case 'UNIMET':
      return `Universidad Metropolitana (${university})`;
    case 'UNEXCA':
      return `Universidad Experimental de Caracas (${university})`;
    case 'ENAHP':
      return `Escuela Nacional de Administración y Hacienda Pública (${university})`;
    case 'UNEARTE':
      return `Universidad Nacional Experimental de las Artes (${university})`;
    case 'UNESR':
      return `Universidad Nacional Experimental Simón Rodríguez (${university})`;
    case 'UCSAR':
      return `Universidad Católica Santa Rosa (${university})`;
    case 'IUPSM':
      return `Instituto Universitario Politécnico Santiago Mariño (${university})`;
    case 'UNEXPO':
      return `Universidad Nacional Experimental Politécnica Antonio José de Sucre (${university})`;
    case 'UMA':
      return `Universidad Monteávila (${university})`;
    case 'UJMV':
      return `Universidad José María Vargas (${university})`;
    case 'UMC':
      return `Universidad Metropolitana de Caracas (${university})`;
    case 'UPEL':
      return `Universidad Pedagógica Experimental Libertador (${university})`;
    case 'CUR':
      return `Colegio Universitario de Rehabilitación May Hamilton (${university})`;
    case 'USM':
      return `Universidad Santa María (${university})`;
    case 'UNEFA':
      return `Universidad Nacional Experimental de la Fuerza Armada Nacional Bolivariana (${university})`;
    case 'UAH':
      return `Universidad Alejandro de Humboldt (${university})`;
    case 'UBV':
      return `Universidad Bolivariana de Venezuela (${university})`;
  }
};

export const parseAvaaAdmisionYear = (year: number) => {
  switch (year) {
    case 0:
      return 'I';
    case 1:
      return 'II';
    case 2:
      return 'III';
    case 3:
      return 'IV';
    case 4:
      return 'V';
    case 5:
      return '+V';
    default:
      return '+V';
  }
};
