import { Gender } from '@prisma/client';
import { z } from 'zod';

const scholarInfoSchema = z
	.object({
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
		local_phone_number: z.string().min(1, { message: 'Debes especificar el numero de telefono' }),
		whatsapp_phone_number: z.string().min(1, { message: 'Debes especificar el numero de whatsapp' }),
		cell_phone_Number: z.string().min(1, { message: 'Debes especificar el numero de celular' }),
		email: z.string().email({ message: 'Debes especificar un correo valido' }).trim(),
	});

export default scholarInfoSchema;
