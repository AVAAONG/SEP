import { StudyRegime } from "@prisma/client";

const SEMESTERS = [
    {
        value: '1',
        label: '1er semestre',
    },
    {
        value: '2',
        label: '2do semestre',
    },
    {
        value: '3',
        label: '3er semestre',
    },

];

const QUARTERS = [
    {
        value: '1',
        label: '1er trimestre',
    },
    {
        value: '2',
        label: '2do trimestre',
    },
    {
        value: '3',
        label: '3er trimestre',
    },
    {
        value: '4',
        label: '4to trimestre',
    },
];
const YEARS = [
    {
        value: '1',
        label: '1er año',
    },
    {
        value: '2',
        label: '2do año',
    },
    {
        value: '3+',
        label: '3er año o más',
    },
];

const QUARTIER = [
    {
        value: '1',
        label: '1er año',
    },
    {
        value: '2',
        label: '2do año',
    },
    {
        value: '3',
        label: '3er año o mas',
    },
];

export const ACADEMIC_PERIODS_KIND = [
    {
        label: 'Anual',
        value: 'ANNUAL',
    },
    {
        label: 'Semestral',
        value: 'SEMESTER',
    },
    {
        label: 'Cuatrimestral',
        value: 'QUARTIER',
    },
    {
        label: 'Trimestral',
        value: 'QUARTER',
    },
];

export const getAcademicPeriodBasedOnStudyRegime = (studyRegime: StudyRegime) => {
    switch (studyRegime) {
        case 'SEMESTER':
            return SEMESTERS;
        case 'QUARTER':
            return QUARTERS;
        case 'ANNUAL':
            return YEARS;
        case 'QUARTIER':
            return QUARTIER;
        default:
            return [];
    }
};
