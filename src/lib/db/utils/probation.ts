import { Prisma } from "@prisma/client";
import { prisma } from "./prisma";

export const deleteProbation = async (probationId: string, scholarId: string): Promise<void> => {
    await prisma.$transaction(async (tx) => {
        await tx.probation.delete({
            where: {
                id: probationId
            }
        });

        await tx.scholar.update({
            where: {
                id: scholarId
            },
            data: {
                program_information: {
                    update: {
                        scholar_status: 'NORMAL'
                    }
                }
            }
        });
    });
};


export const endScholarProbation = async (probationId: string, scholarId: string): Promise<void> => {
    await prisma.$transaction(async (tx) => {
        await tx.probation.update({
            where: {
                id: probationId
            },
            data: {
                ending_date: new Date().toISOString()
            }
        });

        await tx.scholar.update({
            where: {
                id: scholarId
            },
            data: {
                program_information: {
                    update: {
                        scholar_status: 'NORMAL'
                    }
                }
            }
        });
    });
};

export const updateProbation = async (probationId: string, probationInfoToUpdate: Prisma.ProbationUpdateInput) => {
    await prisma.probation.update({
        where: {
            id: probationId
        },
        data: probationInfoToUpdate
    });
}

export const createProbation = async (scholarId: string, data: Prisma.ProbationCreateWithoutScholarInput) => {
    await prisma.scholar.update({
        where: {
            id: scholarId,
        },
        data: {
            program_information: {
                update: {
                    scholar_status: data.kind_of_probation,
                    probation: {
                        create: {
                            ...data
                        },
                    },
                },
            },
        },
    });
};

export const getProbationInfoByScholar = async (scholarId: string) => {
    return await prisma.probation.findMany({
        where: {
            scholar: {
                scholarId: scholarId
            }
        }
    })
}