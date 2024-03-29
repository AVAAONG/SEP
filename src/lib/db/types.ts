import { Prisma } from '@prisma/client';

const chatWithSpeakers = Prisma.validator<Prisma.ChatDefaultArgs>()({
  include: {
    speaker: true,
  },
});
export type ChatWithSpeaker = Prisma.ChatGetPayload<typeof chatWithSpeakers>;

const workshopWithSpeaker = Prisma.validator<Prisma.WorkshopDefaultArgs>()({
  include: {
    speaker: true,
  },
});
export type WorkshopWithSpeaker = Prisma.WorkshopGetPayload<typeof workshopWithSpeaker>;

const volunteerWithAllData = Prisma.validator<Prisma.VolunteerDefaultArgs>()({
  include: {
    volunteer_attendance: true,
  },
});

export type VolunteerWithAllData = Prisma.VolunteerGetPayload<typeof volunteerWithAllData>;

const volunteerAttendanceWithVolunteer = Prisma.validator<Prisma.VolunteerAttendanceDefaultArgs>()({
  include: {
    volunteer: true,
  },
});

export type VolunteerAttendanceWithVolunteer = Prisma.VolunteerAttendanceGetPayload<typeof volunteerAttendanceWithVolunteer>;
