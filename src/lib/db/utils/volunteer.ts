'use server';
import { Prisma } from "@prisma/client";
import { prisma } from "./prisma";

export const createExternalVolunteer = async (volunteer: Prisma.VolunteerCreateInput,
	scholarId: string,
	asignedHours: number
) => {
	await prisma.volunteer.create({
		data: {
			kind_of_volunteer: 'INTERNAL',
			status: 'PENDING',
			title: volunteer.title,
			start_dates: volunteer.start_dates,
			beneficiary: volunteer.beneficiary,
			modality: volunteer.modality,
			description: volunteer.description,
			platform: volunteer.platform,
			end_dates: volunteer.end_dates,
			proof: volunteer.proof,
			supervisor: volunteer.supervisor,
			supervisor_email: volunteer.supervisor_email,
			volunteer_attendance: {
				create: {
					asigned_hours: asignedHours,
					attendance: 'ATTENDED',
					scholar: {
						connect: {
							scholarId
						}
					}
				}
			}
		},
	})
}