'use server';

import { Prisma } from "@prisma/client";
import { prisma } from "./prisma";

export const createAcademicPeriod = async (data: Prisma.ScholarCollagePeriodCreateInput, collageInformationId: string) => {
    const academicPeriod = await prisma.scholarCollageInformation.update({
        where: {
            id: collageInformationId,
        },
        data: {
            collage_period: {
                create: data
            }
        }

    })
    return academicPeriod;
}

export const updateAcademicPeriod = async (data: Prisma.ScholarCollagePeriodUpdateInput, collagePeriodId: string) => {
    const academicPeriod = await prisma.scholarCollagePeriod.update({
        where: {
            id: collagePeriodId,
        },
        data
    })
    return academicPeriod;
}

export const deleteAcademicPeriod = async (collagePeriodId: string) => {
    const academicPeriod = await prisma.scholarCollagePeriod.delete({
        where: {
            id: collagePeriodId,
        },
    })
    return academicPeriod;
}



export const getCollageInformationByScholar = async (scholarId: string) => {
    const collageInformation = await prisma.scholarCollageInformation.findFirst({
        where: {
            scholar_id: scholarId
        },
        include: {
            collage_period: true
        }
    })
    return collageInformation;
}
