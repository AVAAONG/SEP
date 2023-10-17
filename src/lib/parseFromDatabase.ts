import { Collages, StudyArea } from "@prisma/client";

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
        case 'UNESR':
            return `Universidad Nacional Experimental Simón Rodríguez (${university})`;
    }
};


export const parseAvaaAdmisionYear = (year: number,) => {
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
}