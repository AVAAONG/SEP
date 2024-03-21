
import { WorkshopSafisfactionForm } from "@prisma/client";

export const COLORS_BASED_ON_RESPONSE = {
    'Malo': '#b91c1c', // red
    'Deficiente': '#d97706',// orange
    'Regular': '#eab308',// yellow
    'Bueno': '#1d4ed8',// blue
    'Excelente': '#23a217',// green

};


export type SatisfactionFormResponses =
    Omit<
        WorkshopSafisfactionForm,
        | 'id'
        | 'workshop_attendance_id'
    >

export const parseSatisfactionFormResponsesFromDatabase = (response: number | string) => {
    switch (response) {
        case 1:
            return 'Malo';
        case 2:
            return 'Deficiente';
        case 3:
            return 'Regular';
        case 4:
            return 'Bueno';
        case 5:
            return 'Excelente';
        default:
            return 'No definido';
    }
};

export const getColorBasedOnResponse = (response: keyof typeof COLORS_BASED_ON_RESPONSE): string => {
    return COLORS_BASED_ON_RESPONSE[response] || '#808080' //gray;
};

export const getSatisfactionFormTitleAndQuestion = (key: string) => {
    switch (key) {
        case 'activity_organization':
            return {
                title: 'Organización de la actividad',
                question:
                    'La actividad estuvo bien organizada (información, cumplimiento de fechas, horarios y atención)',
            };
        case 'activity_number_of_participants':
            return {
                title: 'Número de participantes',
                question: 'El número de participantes ha sido adecuado para el desarrollo de la actividad',
            };
        case 'activity_lenght':
            return {
                title: 'Duración de la actividad',
                question:
                    'La duración de la actividad fue suficiente, según los objetivos y contenidos de la misma',
            };
        case 'activity_relevance_for_scholar':
            return {
                title: 'Relevancia para el becario',
                question: 'Grado de relevancia de la actividad, para mi formación integral',
            };
        case 'speaker_theory_practice_mix':
            return {
                title: 'Mezcla de teoría y práctica del facilitador',
                question: ' Combinación adecuada de teoría y aplicación práctica',
            };
        case 'speaker_knowledge_of_activity':
            return {
                title: 'Conocimiento del tema por parte del facilitador',
                question: 'Conocimiento de los temas impartidos en profundidad',
            };
        case 'speaker_foment_scholar_to_participate':
            return {
                title: 'El facilitador fomento la participación de los asistentes',
                question: 'El facilitador fomento la participación de los asistentes',
            };
        case 'speaker_knowledge_transmition':
            return {
                title: 'Transmisión de conocimientos del facilitador',
                question: 'La forma de impartir la actividad ha facilitado el aprendizaje',
            };
        case 'content_match_necesities':
            return {
                title: 'El contenido respondio con las necesidades del becario',
                question: 'El contenido de la actividad ha respondido a mis necesidades formativas',
            };
        case 'content_knowledge_adquisition':
            return {
                title: 'Adquisición de conocimientos de contenido',
                question:
                    'Me ha permitido adquirir nuevas habilidades/capacidades que puedo aplicar al puesto de trabajo',
            };
        case 'content_knowledge_expansion':
            return {
                title: 'Expansión de conocimientos',
                question: 'He ampliado conocimientos para progresar en mi carrera profesional',
            };
        case 'content_personal_development':
            return {
                title: 'Favorecio el desarrollo personal',
                question: 'Ha favorecido mi desarrollo personal',
            };
        case 'general_satisfaction':
            return {
                title: 'Satisfacción general',
                question: 'Grado de satisfacción general con la actividad',
            };
        default:
            return {
                title: 'NONE',
                question: 'none',
            };
    }
};

type Count = {
    [key in 'Malo' | 'Deficiente' | 'Regular' | 'Bueno' | 'Excelente' | 'No definido']?: number;
};

export type SatisfactionFormChartData = {
    name: string;
    value: { label: string; value: number, color?: string }[];
};

export const transformFormResponses = (formResponses: SatisfactionFormResponses[]): SatisfactionFormChartData[] => {
    const keys: (keyof SatisfactionFormResponses)[] = [
        'activity_organization',
        'activity_number_of_participants',
        'activity_lenght',
        'activity_relevance_for_scholar',
        'speaker_theory_practice_mix',
        'speaker_knowledge_of_activity',
        'speaker_foment_scholar_to_participate',
        'speaker_knowledge_transmition',
        'content_match_necesities',
        'content_knowledge_adquisition',
        'content_knowledge_expansion',
        'content_personal_development',
        'general_satisfaction',
    ];

    return keys.map((key) => {
        const valueCounts = formResponses.reduce<Count>((counts, response) => {
            const value = parseSatisfactionFormResponsesFromDatabase(response[key]);
            counts[value] = (counts[value] || 0) + 1;
            return counts;
        }, {});

        const value = Object.entries(valueCounts).map(([label, count]) => ({
            label,
            value: count as number,
            color: getColorBasedOnResponse(label as keyof typeof COLORS_BASED_ON_RESPONSE),
        }));

        return { name: key, value };
    });
};

