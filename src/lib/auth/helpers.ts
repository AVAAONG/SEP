'use server';

import { getBlobImage } from "../azure/azure";
import { prisma } from "../db/utils/prisma";

export const getScholarInitialInfo = async (id: string) => {

  const scholar = await prisma.scholar.findUnique({
    where: {
      id,
    },
    select: {
      last_names: true,
      first_names: true,
      email: true,
      photo: true,
      program_information: {
        select: {
          chapter_id: true,
          scholar_status: true,
          is_chat_speaker: true,
        }
      }
    },
  })
  if (!scholar) {
    throw new Error('Scholar not found')
  }
  const image = await getBlobImage(scholar.photo)

  return {
    id,
    name: `${scholar.first_names.split(' ')[0]} ${scholar.last_names.split(' ')[0]}`,
    email: scholar.email,
    image,
    scholarStatus: scholar.program_information?.scholar_status,
    chapterId: scholar.program_information?.chapter_id,
    isSpeaker: scholar.program_information?.is_chat_speaker,
  }
}

export const getAdminInitialInfo = async (id: string) => {
  const admin = await prisma.adminProfile.findUnique({
    where: {
      id,
    },
    select: {
      allowedEmail: true,
      chapter_id: true,
      profilePic: true,
      profileName: true,

    },
  })
  if (!admin) {
    throw new Error('Admin not found')
  }
  const image = await getBlobImage(admin.profilePic)

  return {
    id,
    name: admin.profileName,
    email: admin.allowedEmail,
    image,
    chapterId: admin.chapter_id,
  }
}

export const getApplicantInitialInfo = async (id: string) => {
  const applicant = await prisma.applicant.findFirst({
    where: {
      id,
    },
    select: {
      chapterId: true,
      personal: {
        select: {
          firstNames: true,
          lastNames: true,
          photo: true,
        },
      },
      ContactInfo: {
        select: {
          email: true,
        }
      }
    },
  })
  if (!applicant) return null
  const image = await getBlobImage(applicant.personal?.photo)
  return {
    id,
    name: `${applicant.personal?.firstNames} ${applicant.personal?.lastNames}`,
    email: applicant.ContactInfo?.email,
    image,
    chapterId: applicant.chapterId,
  }
}
