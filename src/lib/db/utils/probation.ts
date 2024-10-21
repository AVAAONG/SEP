'use server';
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { prisma } from "./prisma";

export const deleteProbation = async (probationId: string, scholarId: string) => {
    try {
        await prisma.$transaction(async (tx) => {
            const deletedProbation = await tx.probation.delete({
                where: { id: probationId }
            });
            const scholar = await tx.scholar.findUnique({
                where: { id: scholarId },
                select: {
                    program_information: {
                        select: {
                            scholar_status: true
                        }
                    }
                }
            });
            if (deletedProbation.kind_of_probation === scholar?.program_information?.scholar_status) {
                await tx.scholar.update({
                    where: { id: scholarId },
                    data: {
                        program_information: {
                            update: { scholar_status: 'NORMAL' }
                        }
                    }
                });
            }

        });
        revalidatePath(`/admin/becarios/${scholarId}`)
    } catch (error) {
        console.error('Error deleting probation:', error);
    }
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
    revalidatePath(`/admin/becarios/${scholarId}`)

};

export const updateProbation = async (probationId: string, probationInfoToUpdate: Prisma.ProbationUpdateInput) => {
    await prisma.probation.update({
        where: {
            id: probationId
        },
        data: { ...probationInfoToUpdate }
    });
    revalidatePath(`/admin/becarios/${scholarId}`)

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
    revalidatePath(`/admin/becarios/${scholarId}`)

};


export const createProbationII = async (scholarId: string) => {
    await prisma.scholar.update({
        where: {
            id: scholarId,
        },
        data: {
            program_information: {
                update: {
                    scholar_status: 'PROBATION_II',
                    probation: {
                        create: {
                            agreement: '',
                            done_at_the_moment: '',
                            ending_date: new Date().toISOString(),
                            kind_of_probation: 'PROBATION_II',
                            starting_date: new Date().toISOString(),
                            next_meeting: new Date().toISOString(),
                            observations: '',
                            probation_reason: '',


                        },
                    },
                },
            },
        },
    });
    revalidatePath(`/admin/becarios/${scholarId}`)

};

export const getProbationInfoByScholar = async (scholarId: string) => {
    return await prisma.probation.findMany({
        where: {
            scholar: {
                scholarId
            },
        },
        orderBy: {
            starting_date: "desc"
        }
    })
}