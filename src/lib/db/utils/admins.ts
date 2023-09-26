import { AdminUser } from "@prisma/client";
import { prisma } from "./prisma";


export const getAdminUsers = async (): Promise<AdminUser[]> => {
    const users = await prisma.adminUser.findMany();
    return users;
};

export const createAdminUser = async (data: AdminUser): Promise<AdminUser> => {
    const user = await prisma.adminUser.create({ data });
    return user;
}