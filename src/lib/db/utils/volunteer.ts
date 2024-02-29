'use server';
import { Prisma, VolunteerStatus } from "@prisma/client";
import { prisma } from "./prisma";

export const createExternalVolunteer = async (volunteer: Prisma.VolunteerCreateInput,
	scholarId: string,
	asignedHours: number
) => {
	await prisma.volunteer.create({
		data: {
			kind_of_volunteer: 'EXTERNAL',
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

export const getVolunteersByScholar = async (scholarId: string) => {
	return prisma.volunteerAttendance.findMany({
		where: {
			scholar: {
				scholarId
			},
		},
		include: {
			volunteer: true
		}
	})
}

export const getExternalVolunteer = async () => {
	return prisma.volunteer.findMany({
		include: {
			volunteer_attendance: {
				include: {
					scholar: {
						include: {
							scholar: {
								select: {
									first_names: true,
									last_names: true
								}
							}
						}
					}
				}
			}
		},
		orderBy: {
			status: 'asc'
		}
	})
}


export const changeScholarVolunteerStatus = async (volunteerId: string, volunteerStatus: VolunteerStatus) => {
	await prisma.volunteer.update({
		where: {
			id: volunteerId
		},
		data: {
			status: volunteerStatus
		}
	})
}
