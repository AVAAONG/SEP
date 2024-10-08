'use server'
import { Prisma, Scholar } from "@prisma/client";
import { prisma } from "./prisma";
import { getCookie } from "@/lib/serverAction";

export const getScholarCvaInformation = async (scholarId: string) => {
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



export const updateCVAModule = async (cvaModuleId: string, data: Prisma.ScholarCvaModuleCreateInput) => {
    const cvaModule = await prisma.scholarCvaModule.update({
        where: {
            id: cvaModuleId,
        },
        data
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
        where: {
            program_information: {
                scholar_condition: {
                    equals: 'ACTIVE',
                },
                chapter: {
                    id: {
                        equals: await getCookie('chapter'),
                    },
                },
            },
        },
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


export const deleteCvaModule = async (cvaModuleId: string) => {
    const academicPeriod = await prisma.scholarCvaModule.delete({
        where: {
            id: cvaModuleId,
        },
    })
    return academicPeriod;
}

