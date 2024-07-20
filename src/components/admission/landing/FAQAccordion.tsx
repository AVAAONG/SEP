'use client'
import { Accordion, AccordionItem } from "@nextui-org/react";

const QUESTIONS = [
    {
        question: "¿Qué es ProExcelencia?",
        answer: "ProExcelencia es una organización sin fines de lucro que busca mejorar la calidad de la educación en Venezuela."
    },
    {
        question: "¿Cómo puedo colaborar con ProExcelencia?",
        answer: "Puedes colaborar con ProExcelencia de muchas maneras, como donaciones, voluntariado, entre otras."
    },
    {
        question: "¿Cómo puedo inscribirme en ProExcelencia?",
        answer: "Para inscribirte en ProExcelencia, debes completar el formulario de inscripción en nuestro sitio web."
    }
];


const FAQAccordion = () => {
    const defaultContent =
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

    return (
        <Accordion variant="splitted">
            {QUESTIONS.map((question, index) => (
                <AccordionItem key={index} aria-label={question.question} title={question.question}>
                    {question.answer}
                </AccordionItem>
            ))}
        </Accordion>
    );
}

export default FAQAccordion;
