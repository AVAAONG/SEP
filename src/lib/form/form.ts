import { Workshop } from "@/types/Workshop";
import { Form } from "../auth/auth";
import { addDays } from "../calendar/calendar";

export const createGoogleForm = async (title: string, description: string) => {

    const response = await Form.forms.create({
        requestBody: {
            info: {
                title,
                description,
                documentTitle: title,

            },
            items: [
                {
                    title: "Nombre y Apellido",
                    textItem: {}
                },
                {
                    title: "Cedula de identidad",
                    textItem: {}
                },
                {
                    title: "Correo Electrónico",
                    textItem: {}
                },
                {
                    title: "Teléfono",
                    textItem: {}
                },
            ],
        }
    })
    return response.data.responderUri;
};

const getForm = async (formId: string) => {
    const res = await Form.forms.get({ formId });
    return res.data;
}

export const updateFormInfo = async (formId: string, title: string, description: string) => {
    const res = await Form.forms.batchUpdate({
        formId,
        requestBody: {
            requests: [
                {
                    updateFormInfo: {
                        updateMask: "*",
                        info: {
                            title,
                            description,
                            documentTitle: title,
                        }
                    }
                }
            ]

        }
    });
    return res.data.form?.formId;
}


export const createFormDescription = (workshop: Workshop) => {
    const { title, pensum, date, startHour, endHour, speaker, modality, platform, description } = workshop;
    const formDescription = `Taller: ${title}
Competencia Asociada: ${pensum}
${modality === "asincrona" ? `Fecha: De ${new Date(date).toLocaleDateString()} hasta ${new Date(addDays(new Date(date), 3)).toLocaleDateString()}` : `Fecha: ${date}`}
${modality === "asincrona" ? `` : `Horario: de ${startHour} hasta las ${endHour}`}
Facilitador: ${speaker}
Modalidad: ${modality}
${modality === "presencial" ? `Lugar: ${platform}` : `Plataforma: ${platform}`}
${description === ' ' ? '' : `\n ${description}`}`;
    return formDescription;

};