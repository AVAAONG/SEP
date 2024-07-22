'use server'
import { Gender } from "@prisma/client";
import { prisma } from "./prisma";

export interface AdmisionPersonalInfo {
    photo: string;
    first_names: string;
    last_names: string;
    dni: string;
    gender: Gender
    state: string;
    address: string;
    birthdate: string;
}

export const updatePersonalInfo = async (applicantId: string, personalInfo: AdmisionPersonalInfo) => {
    await prisma.scholar.update({
        where: {
            id: applicantId,
        },
        data: {
            ...personalInfo,
            recruitment_information: {
                create: {
                    current_step: 1,
                }
            }
        },
    });
}