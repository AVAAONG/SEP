import { Gender } from '@prisma/client';
import { z } from 'zod';

const personalInfoSchema = z.object({
  //photo: z.string().min(1, { message: 'Debes subir una foto' }).trim(),
  first_names: z.string().min(1, { message: 'El nombre no puede estar vacio' }).trim(),
  last_names: z.string().min(1, { message: 'El apellido no puede estar vacio' }).trim(),
  dni: z.string().min(1, { message: 'Tu cedula no puede estar vacio' }).trim(),
  gender: z.nativeEnum(Gender, {
    errorMap: (issue, _ctx) => {
      switch (issue.code) {
        case 'invalid_enum_value':
          return { message: 'Debes seleccionar un genero valido' };
        default:
          return { message: 'Debes seleccionar el genero' };
      }
    },
  }),
  birthdate: z.string().min(1, { message: 'Debes especificar la fecha de nacimiento' }),
  state: z.string().min(1, { message: 'El estado de prosedencia no puede estar vacio' }).trim(),
  address: z.string().min(1, { message: 'La direccion de residencia no puede estar vacia' }).trim(),
});

export default personalInfoSchema;
