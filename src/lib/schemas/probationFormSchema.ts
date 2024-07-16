import { z } from 'zod';
const probationFormSchema = z.object({
  done_at_the_moment: z.object({
    year_in_career: z.string().min(1, { message: 'Debes especificar el año de universidad' }),
    average: z.string(),
    workshops: z.coerce
      .number({
        errorMap: (issue, _ctx) => {
          switch (issue.code) {
            default:
              return { message: 'Debes especificar la cantidad de actividades realizadas' };
          }
        },
      }),
    chats: z.coerce.number({
      errorMap: (issue, _ctx) => {
        switch (issue.code) {
          default:
            return { message: 'Debes especificar la cantidad de chats realizadas' };
        }
      },
    }),
    internal_volunteering_hours: z.coerce.number({
      errorMap: (issue, _ctx) => {
        switch (issue.code) {
          default:
            return { message: 'Debes especificar la cantidad de horas de voluntariado realizadas' };
        }
      },
    }),
    cva: z.string().min(1, { message: 'Debes especificar el nivel de CVA' }),
  }),
  agreement: z.object({
    average: z.string().min(1, { message: 'Debes especificar el promedio a llegar' }),
    workshops: z.coerce
      .number({
        errorMap: (issue, _ctx) => {
          switch (issue.code) {
            default:
              return { message: 'Debes especificar la cantidad de actividades a realizar' };
          }
        },
      }),
    chats: z.coerce.number({
      errorMap: (issue, _ctx) => {
        switch (issue.code) {
          default:
            return { message: 'Debes especificar la cantidad de chats a realizar' };
        }
      },
    }),
    internal_volunteering_hours: z.coerce.number({
      errorMap: (issue, _ctx) => {
        switch (issue.code) {
          default:
            return { message: 'Debes especificar la cantidad de horas de voluntariado a realizar' };
        }
      },
    }),
    cva: z.string().min(1, { message: 'Debes especificar el nivel de CVA a llegar' }),
  }),
  next_meeting: z.coerce.date().refine((date) => new Date(date) >= new Date(), {
    message: 'La fecha no puede ser menor a la actual',
  }),
  observations: z.string().optional(),
});

export default probationFormSchema;
