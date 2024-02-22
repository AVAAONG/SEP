'use server'
import { Prisma } from "@prisma/client";
import { prisma } from "./prisma";

export const getCvaInformationByScholar = async (scholarId: string) => {
    const cvaInformation = await prisma.scholarCVAInformation.findUnique({
        where: {
            scholarId
        },
        include: {
            modules: true
        }
    })
    return cvaInformation;
}


export const updateCvaInformation = async (scholarId: string, data: Prisma.ScholarCVAInformationUpdateInput) => {
    const cvaInformation = await prisma.scholarCVAInformation.update({
        where: {
            scholarId
        },
        data
    })
    return cvaInformation;
}