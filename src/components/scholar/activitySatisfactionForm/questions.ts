import activitySatisfactionFormSchema from "@/lib/schemas/acivitySatisFactionFormSchema";
import { z } from "zod";

export const VALORIZATION = [
    { label: 'Malo', value: '1' },
    { label: 'Deficiente', value: '2' },
    { label: 'Regular', value: '3' },
    { label: 'Bueno', value: '4' },
    { label: 'Excelente', value: '5' },
];

type Question = {
    name: keyof z.infer<typeof activitySatisfactionFormSchema>; // Use keys from schema for type safety
    label: string | ((kind: 'workshop' | 'chat') => string); // Label can be a string or a function of kindOfActivity
};

// Group questions by section
export const QUESTIONS_BY_SECTION: { title: string; questions: Question[] }[] = [
    {
        title: 'Respecto a la actividad',
        questions: [
            {
                name: 'activity_organization',
                label: '¿La actividad estuvo bien organizada? (información, horarios y atención)',
            },
            {
                name: 'activity_number_of_participants',
                label: '¿El número de participantes fue adecuado para la actividad?',
            },
            { name: 'activity_lenght', label: '¿La duración de la actividad fue suficiente?' },
            {
                name: 'activity_relevance_for_scholar',
                label: 'Grado de relevancia de la actividad, para mi formación integral',
            },
        ],
    },
    {
        title: 'Respecto al facilitador/a',
        questions: [
            {
                name: 'speaker_theory_practice_mix',
                label: (kind) =>
                    kind === 'chat'
                        ? 'Materiales utilizados'
                        : 'Combinación adecuada de teoría y aplicación práctica',
            },
            {
                name: 'speaker_knowledge_of_activity',
                label: 'Conocimiento de los temas impartidos en profundidad',
            },
            {
                name: 'speaker_foment_scholar_to_participate',
                label: 'Fomento a la participación de los asistentes',
            },
            {
                name: 'speaker_knowledge_transmition',
                label: 'La forma de impartir la actividad ha facilitado el aprendizaje',
            },
        ],
    },
    {
        title: 'Respecto al contenido',
        questions: [
            {
                name: 'content_match_necesities',
                label: 'El contenido de la actividad ha respondido a mis expectativas',
            },
            {
                name: 'content_knowledge_adquisition',
                label: 'Me permitio adquirir nuevas habilidades que puedo aplicar en mi trabajo',
            },
            {
                name: 'content_knowledge_expansion',
                label: 'He ampliado conocimientos para progresar en mi carrera profesional',
            },
            { name: 'content_personal_development', label: 'Ha favorecido mi desarrollo personal' },
        ],
    },
    {
        title: 'Grado de satisfacción general',
        questions: [
            {
                name: 'general_satisfaction',
                label: 'Grado de satisfacción general con la actividad',
            },
        ],
    },
];