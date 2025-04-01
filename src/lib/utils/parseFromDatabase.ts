import { Collages, CvaLocation, EvaluationScale, KindOfCollage, ScholarCondition, ScholarStatus, StudyArea, StudyRegime } from '@prisma/client';

export const parseStudyAreaFromDatabase = (studyArea: StudyArea | null | undefined) => {
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
      return 'STEM'; // let the acronym in english as it is more common in AVAA
    case 'OTHER':
      return 'Otra'; // let the acronym in english as it is more common in AVAA
    default:
      return 'ERROR';
  }
};

export const getCollageName = (university: Collages | null | undefined) => {
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
      return `Universidad Nacional Experimental Marítima del Caribe (${university})`;
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
    default:
      return university;
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

export const parseProbationFromDatabase = (status: ScholarStatus) => {
  switch (status) {
    case 'NORMAL':
      return 'Normal';
    case 'PROBATION_I':
      return 'Probatorio 1';
    case 'PROBATION_II':
      return 'Probatorio 2';
    default:
      return 'ERROR';
  }
}

export const parseScholarCondition = (status: ScholarCondition) => {
  switch (status) {
    case 'ACTIVE':
      return 'Activo';
    case 'RESIGNATION':
      return 'Renuncia';
    case 'WITHDRAWAL':
      return 'Retiro';
    case 'TO_BE_ALUMNI':
      return 'En espera de egreso';
    case 'ALUMNI':
      return 'Egresado';
    default:
      return 'ERROR';
  }
}

export const parseStudiRegimeFromDatabase = (regime: StudyRegime | undefined) => {
  switch (regime) {
    case 'SEMESTER':
      return 'Semestral';
    case 'QUARTER':
      return 'Trimestral';
    case 'QUARTIER':
      return 'Cuatrimestral';
    case 'ANNUAL':
      return 'Anual';
    default:
      return 'Sin datos';
  }
}

export const parseEvaluationScaleFromDatabase = (evaluationScale: EvaluationScale | null) => {
  switch (evaluationScale) {
    case 'CERO_TO_FIVE':
      return '0-5';
    case 'CERO_TO_TEN':
      return '0-10';
    case 'CERO_TO_TWENTY':
      return '0-20';
    default:
      return 'ERROR';
  }

}
export const parseKindOfCollageFromDatabase = (kind: KindOfCollage | undefined) => {
  switch (kind) {
    case 'PUBLIC':
      return 'Pública';
    case 'PRIVATE':
      return 'Privada';
    default:
      return 'No disponible';
  }

}


export const parseCvaLocationFromDatabase = (location: CvaLocation | null | undefined) => {
  switch (location) {
    case 'MERCEDES':
      return 'Las mercedes';
    case 'CENTRO':
      return 'El centro';
    default:
      return 'Sin datos';
  }
}