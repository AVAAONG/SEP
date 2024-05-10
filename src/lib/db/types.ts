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



const volunteerAttendanceWithScholar = Prisma.validator<Prisma.VolunteerAttendanceDefaultArgs>()({
  include: {
    scholar: {
      include: {
        scholar: true,
      }
    },
  },
});

export type VolunteerAttendanceWithScholar = Prisma.VolunteerAttendanceGetPayload<typeof volunteerAttendanceWithScholar>;


const scholarWithAllData = Prisma.validator<Prisma.ScholarDefaultArgs>()({
  include: {
    program_information: {
      include: {
        attended_chats: true,
        attended_workshops: true,
        volunteerAttendance: true,
      },
    },
    collage_information: {
      include: {
        collage_period: true,
      },
    },
    cva_information: {
      include: {
        modules: true,
      },
    },
  },
});
export type ScholarWithAllData = Prisma.ScholarGetPayload<typeof scholarWithAllData>;
