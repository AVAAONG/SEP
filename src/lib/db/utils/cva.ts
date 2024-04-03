'use server'
import { Prisma, Scholar } from "@prisma/client";
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


export const createCvaInformation = async (data: Prisma.ScholarCVAInformationCreateInput) => {
    const cvaInformation = await prisma.scholarCVAInformation.create({

        data
    })
    return cvaInformation;
}


export const createCvaModule = async (data: Prisma.ScholarCvaModuleCreateInput, cvaInformationId: string) => {
    const cvaModule = await prisma.scholarCVAInformation.update({
        where: {
            id: cvaInformationId,
        },
        data: {
            modules: {
                create: data
            }
        }

    })
    return cvaModule;
}


export type ScholarsCvaInformation =
    (Pick<Scholar, 'id' | 'first_names' | 'last_names' | 'photo' | 'dni'> & {
        cva_information?: Prisma.ScholarCVAInformationGetPayload<{
            include: { modules: Prisma.ScholarCvaModuleFindManyArgs };
        }> | null;
    });

export const getScholarsCvaInformation = async (): Promise<ScholarsCvaInformation[]> => {
    const cvaInformation = await prisma.scholar.findMany({
        select: {
            id: true,
            first_names: true,
            last_names: true,
            photo: true,
            dni: true,
            cva_information: {
                include: {
                    modules: {
                        take: 1,
                        orderBy: {
                            createdAtt: 'desc',
                        },
                    },
                },
            },

        },
    })
    return cvaInformation;
}