import { Form } from "../auth/auth";

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

export const updateFormInfo = async (formId: string , title: string, description: string) => {
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

