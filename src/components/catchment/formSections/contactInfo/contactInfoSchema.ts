import { z } from "zod";

const contactInfoFormSchema = z.object({
  local_phone_number: z.string().min(1).max(20),
  cell_phone_Number: z.string().min(1).max(20),
  whatsapp_number: z.string().min(1).max(20),
  email: z.string().email().min(1),
  parent_phone_number: z.string().min(1).max(20),
  parental: z.string().min(1),
});

export default contactInfoFormSchema