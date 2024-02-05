import { Gender } from '@prisma/client';
import { z } from 'zod';

const chatCreationFormSchema = z
    .object({
        first_name: z.string().min(1, { message: 'El nombre no puede estar vacio' }).trim(),
        second_name: z.string().min(1, { message: 'El apellido no puede estar vacio' }).trim(),
        dni: z.string().min(1, { message: 'Tu cedula no puede estar vacio' }).trim(),
        gender: z.nativeEnum(Gender, {

        })
    });

export default chatCreationFormSchema;
