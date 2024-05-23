'use server';

import { AdminProfile, Prisma } from '@prisma/client';
import { prisma } from './prisma';

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
  try {
    const adminProfile = await prisma.adminProfile.create({
      data: {
        profileName: data.profileName,
        profilePic: data.profilePic,
        allowedEmail: data.allowedEmail,
        gender: data.gender,
        role: {
          connect: {
            id: data.role_id,
          },
        },
        responsibility: data.responsibility,
        chapter: {
          connect: {
            id: data.chapter_id!,
          },
        },
      },
    });
    return adminProfile;
  } catch (error) {
    console.log(error);
  }
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

export const createRole = async (name: string, permissions: Prisma.JsonObject) => {
  await prisma.role.create({
    data: {
      name,
      permissions
    }
  })
}

export const updateRole = async (name: string, permissions: Prisma.JsonObject) => {
  await prisma.role.update({
    where: {
      name
    },
    data: {
      permissions
    }
  })
}

export const getAdminRole = async (adminId: string) => {
  return await prisma.user.findFirstOrThrow({
    where: {
      id: adminId
    },
    select: {
      admin: {
        select: {
          role: true,
          chapter: true
        }
      }
    }
  })
}