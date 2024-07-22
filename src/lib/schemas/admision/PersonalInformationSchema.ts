import { createEnumErrorMap, dateValidation, imageValudationSchema } from '@/lib/zod/utils';
import { Gender } from '@prisma/client';
import { z } from 'zod';

const AdmisionPersonalInformationSchema = z.object({
    photo: imageValudationSchema(),
    first_names: z.string().min(1, { message: 'El nombre no puede estar vacio' }).trim(),
    last_names: z.string().min(1, { message: 'El apellido no puede estar vacio' }).trim(),
    dni: z.string().min(1, { message: 'Tu cedula no puede estar vacio' }).trim(),
    gender: z.nativeEnum(Gender, createEnumErrorMap('género')),
    birthdate: dateValidation(),
    state: z.string().min(1, { message: 'El estado de prosedencia no puede estar vacio' }).trim(),
    address: z.string().min(1, { message: 'La direccion de residencia no puede estar vacia' }).trim(),
});

export default AdmisionPersonalInformationSchema;
