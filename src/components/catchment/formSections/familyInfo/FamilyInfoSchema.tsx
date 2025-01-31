import { z } from 'zod';

const familyFormSchema = z.object({
  family_income: z.number().min(1), // Assuming family income is a positive number
  living_arrangement: z.enum(['PARENTS', 'RELATIVES', 'OTHERS']), // Enum for living arrangement
  housing_type: z.enum(['OWNED', 'RENTED', 'MORTGAGED']), // Enum for housing type
  family_composition: z.string().min(1), // Assuming family composition is not empty
  father_occupation: z.string().min(1), // Assuming father's occupation is not empty
  father_workplace: z.string().min(1), // Assuming father's workplace is not empty
  father_experience: z.number().min(1), // Assuming father's experience is a positive number
  mother_occupation: z.string().min(1), // Assuming mother's occupation is not empty
  mother_workplace: z.string().min(1), // Assuming mother's workplace is not empty
  mother_experience: z.number().min(1), // Assuming mother's experience is a positive number
});

export default familyFormSchema;
