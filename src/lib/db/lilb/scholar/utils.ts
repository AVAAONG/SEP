'use server';
import { ScholarCondition, ScholarStatus } from '@prisma/client';
import { prisma } from '../../utils/prisma';


export const changeScholarCondition = async (scholarId: string, condition: ScholarCondition) => {
    try {
        const scholar = await prisma.scholar.update({
            where: {
                id: scholarId,
            },
            data: {
                program_information: {
                    update: {
                        scholar_condition: condition,
                        program_end_date: new Date(),
                    }
                },
            },
        });
        return scholar;
    } catch (error) {
        console.error(`Error changing scholar condition: ${error}`);
    } finally {
        await prisma.$disconnect();
    }
}


export const changeScholarStatusProbationSimple = async (scholarId: string, condition: ScholarStatus) => {
    try {
        const scholar = await prisma.scholar.update({
            where: {
                id: scholarId,
            },
            data: {
                program_information: {
                    update: {
                        scholar_status: condition,
                    }
                },
            },
        });
        return scholar;
    } catch (error) {
        console.error(`Error changing scholar status: ${error}`);
    } finally {
        await prisma.$disconnect();
    }
}