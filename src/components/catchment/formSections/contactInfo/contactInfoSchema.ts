import { z } from "zod";

const contactInfoFormSchema = z.object({
  local_phone_number: z.string()
    .min(4, 'El numero telefónico debe tener al menos 4 dígitos')
    .max(20, 'El numero telefónico no puede tener más de 20 dígitos')
    .regex(/^\d+$/, 'El numero telefónico solo puede contener números'),
  whatsApp_phone_number: z.string().min(1).max(20),
  email: z.string().email().min(5, 'El correo electrónico es requerido').transform((email) => email.toLowerCase()),
  parental_phone_number: z
    .string()
    .min(4, 'El numero telefónico debe tener al menos 4 dígitos')
    .max(20, 'El numero telefónico no puede tener más de 20 dígitos')
    .regex(/^\d+$/, 'El numero telefónico solo puede contener números'),
  parental: z.string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'El nombre solo puede contener letras'),
});

export default contactInfoFormSchema