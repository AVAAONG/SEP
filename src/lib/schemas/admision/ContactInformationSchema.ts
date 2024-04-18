import { z } from 'zod';



const AdmisionContactInformationSchema = z.object({
    local_phone_number: z.string().min(1, { message: 'El telefono no puede estar vacio' }).trim(),
    whatsapp_number: z.string().min(1, { message: 'El telefono no puede estar vacio' }).trim(),
    email: z.string().min(1, { message: 'Tu email no puede estar vacio' }).trim(),
    parent_phone_number: z.string().min(1, { message: 'El telefono no puede estar vacio' }).trim(),
    parent_name: z.string().min(1, { message: 'El nombre no puede estar vacio' }).trim(),

});

export default AdmisionContactInformationSchema;