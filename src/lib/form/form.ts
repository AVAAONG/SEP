import { Form } from "../auth/auth";

const createGoogleForm = async (title: string, description: string,) => {
    /**
     * Se crea el nombre del formulario - DONE
     * Se crea la descripcion del formulario - DONE
     * se crea el id de la hoja de calculo a la que se va a vincular el formulario
     * se crea el link para agregar al calendario
     * Se crea el tiempo para el cerrar el formulario
     * HAY que guardar
     */
    const timeToCloseForm = new Date(startFormated).getTime() + 3600000;

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
    return response.data;
};

const getForm = async (formId: string) => {
    const res = await Form.forms.get({ formId });
    return res.data;
}

const updateFormInfo = async (formId: string, title: string, description: string) => {
    const res = await Form.forms.batchUpdate({
        formId,
        requestBody: {
            requests: [
                {
                    updateFormInfo: {
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
    return res.data;
}

const createWatcher = async (formId: string, expireTime) => {
    const res = await Form.forms.watches.create({
        // Required. ID of the Form to watch.
        formId,
        // Request body metadata
        requestBody: {
            // request body parameter
            watchId: 'placeholder-value',
            watch: {
                eventType: 'RESPONSES',
                expireTime,
                target: {
                    topic: {
                        topicName: 'projects/avaa-management-sys/topics/seb'
                    }
                }
            }
        }
    });

    return res.data;
}