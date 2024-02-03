import { z } from 'zod';

const scholarSignInSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'El correo no puede estar vacio' })
    .trim()
    .email('Este no es un correo valido'),
});

export default scholarSignInSchema;
