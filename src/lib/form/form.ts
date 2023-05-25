import { Form } from "../auth/auth";

const createGoogleForm = async (title: string, description: string, linkedSheetId: string) => {
    /**
     * Se crea el nombre del formulario
     * Se crea la descripcion del formulario
     * se crea el id de la hoja de calculo a la que se va a vincular el formulario
     * se crea el link para agregar al calendario
     * Se crea el tiempo para el cerrar el formulario
     * HAY que guardar
     */
    const timeToCloseForm = new Date(startFormated).getTime() + 3600000;

    const response = await Form.forms.create({
        
        requestBody: {
            linkedSheetId,
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
