'use server';

import { AdminProfile, PrismaClient } from '@prisma/client';
// import { prisma } from './prisma';
const prisma = new PrismaClient()

export const getAdminsProfiles = async () => {
  const users = await prisma.adminProfile.findMany();
  return users;
};

export const getAdmin = async (email: string) => {
  const admin = await prisma.adminProfile.findUnique({
    where: { allowedEmail: email },
  });
  return admin;
};

//durante la creacion, en el profile buscamos el usuario y lo retornamos
export const createAdminProfileUser = async (data: AdminProfile) => {
  const adminProfile = await prisma.adminProfile.create({
    data: {
      profileName: data.profileName,
      profilePic: data.profilePic,
      allowedEmail: data.allowedEmail,
      gender: data.gender,
      allowedActions: {
        create: {
          name: "SUPER_ADMIN"
        }
      },
      responsibility: data.responsibility,
      chapter: {
        create: {
          name: "CARACAS"
        }
      }
    },
  });
  return adminProfile;
};

export const updateAdminProfileUser = async (data: AdminProfile) => {
  await prisma.adminProfile.update({ data, where: { id: data.id } });
};

export const deleteAdmin = async (adminId: string) => {
  const user = await prisma.adminProfile.delete({
    where: { id: adminId },
    include: {
      user: {
        include: {
          accounts: true,
          sessions: true,
        },
      },
    },
  });
  return user;
};

export const deleteadminProfile = async (adminId: string) => {
  const user = await prisma.adminProfile.delete({
    where: { id: adminId },
  });
  return user;
};