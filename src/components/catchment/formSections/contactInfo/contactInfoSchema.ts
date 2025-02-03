import { checkIfEmailExist } from "@/lib/db/utils/applicant";
import { z } from "zod";

const contactInfoFormSchema = z.object({
  localPhoneNumber: z.string()
    .min(4, 'El numero telefónico debe tener al menos 4 dígitos')
    .max(20, 'El numero telefónico no puede tener más de 20 dígitos')
    .regex(/^\d+$/, 'El numero telefónico solo puede contener números'),
  whatsAppPhoneNumber: z.string().min(1).max(20),
  email: z.string()
    .email()
    .min(5, 'El correo electrónico es requerido')
    .transform((email) => email.toLowerCase().trim())
    .refine(async (email) => {
      const emailExists = await checkIfEmailExist(email);
      return !emailExists;
    }, 'El correo electrónico ya está en uso por otro becario, utiliza otro distinto'),
  parentalPhoneNumber: z
    .string()
    .min(4, 'El numero telefónico debe tener al menos 4 dígitos')
    .max(20, 'El numero telefónico no puede tener más de 20 dígitos')
    .regex(/^\d+$/, 'El numero telefónico solo puede contener números'),
  parental: z.string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'El nombre solo puede contener letras'),
});

export default contactInfoFormSchema