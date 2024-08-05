'use server';
import { Prisma, ScholarAttendance, VolunteerAttendance, VolunteerStatus } from "@prisma/client";
import { prisma } from "./prisma";

export const createExternalVolunteer = async (volunteer: Prisma.VolunteerCreateInput,
	scholarId: string,
	asignedHours: number
) => {
	return await prisma.volunteer.create({
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
export type VolunteerAttendanceWithVolunteer = VolunteerAttendance & {
	volunteer: Prisma.VolunteerGetPayload<{}> | null;
}


export const getVolunteersByScholar = async (scholarId: string): Promise<VolunteerAttendanceWithVolunteer[]> => {
	const volunteer = await prisma.volunteerAttendance.findMany({
		where: {
			scholar: {
				scholarId: scholarId
			}
		},
		include: {
			volunteer: true
		}
	})
	return volunteer
}

export const getExternalVolunteer = async () => {
	return prisma.volunteer.findMany({
		where: {
			kind_of_volunteer: 'EXTERNAL'
		},
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


export const changeVolunteerStatus = async (volunteerId: string, volunteerStatus: VolunteerStatus) => {
	await prisma.volunteer.update({
		where: {
			id: volunteerId
		},
		data: {
			status: volunteerStatus
		}
	})
}


export const createVolunteer = async (volunteer: Prisma.VolunteerCreateArgs) => {
	const createdVolunteer = await prisma.volunteer.create(volunteer);
	return createdVolunteer;
};
export const updateVolunteer = async (volunteerId: string, volunteer: Prisma.VolunteerCreateArgs) => {
	const createdVolunteer = await prisma.volunteer.update({
		where: {
			id: volunteerId
		},
		...volunteer
	});
	return createdVolunteer;
};


export const addScholarToVolunteer = async (
	volunteerId: string,
	scholarId: string,
) => {
	// Start a transaction
	await prisma.$transaction(async (prisma) => {
		// Check if the scholar is already enrolled in the workshop
		const existingAttendance = await prisma.volunteerAttendance.findFirst({
			where: {
				volunteer: {
					id: volunteerId,
				},
				scholar: {
					scholarId,
				},
			},
		});
		// If the scholar is not already enrolled, add the attendance
		if (!existingAttendance) {
			const workshop = await prisma.volunteer.findUnique({
				where: {
					id: volunteerId,
				},
				include: {
					volunteer_attendance: true,
				}
			});
			const totalAttendance = workshop?.volunteer_attendance.filter(attendance => attendance.attendance === 'ENROLLED').length || 0;
			if (totalAttendance >= workshop?.avalible_spots!) { }
			else {
				await prisma.volunteerAttendance.create({
					data: {
						volunteer: {
							connect: {
								id: volunteerId,
							},
						},
						scholar: {
							connect: {
								scholarId,
							},
						},
						attendance: 'ENROLLED',
						asigned_hours: 0
					},
				});
			}
		}

	});
}

export const addScholarToVolunteerAdmin = async (
	volunteerId: string,
	scholarId: string,
) => {
	// Start a transaction
	await prisma.$transaction(async (prisma) => {
		// Check if the scholar is already enrolled in the workshop
		const existingAttendance = await prisma.volunteerAttendance.findFirst({
			where: {
				volunteer: {
					id: volunteerId,
				},
				scholar: {
					scholarId,
				},
			},
		});
		// If the scholar is not already enrolled, add the attendance
		if (!existingAttendance) {
			const workshop = await prisma.volunteer.findUnique({
				where: {
					id: volunteerId,
				},
				include: {
					volunteer_attendance: true,
				}
			});

			await prisma.volunteerAttendance.create({
				data: {
					volunteer: {
						connect: {
							id: volunteerId,
						},
					},
					scholar: {
						connect: {
							scholarId,
						},
					},
					attendance: 'ENROLLED',
					asigned_hours: 0
				},
			});
		}

	});
}


export const deleteScholarFromVolunteer = async (
	chatId: string,
	scholarId: string
) => {
	// Start a transaction
	await prisma.$transaction(async (prisma) => {
		// Check if the scholar is already enrolled in the workshop
		const existingAttendance = await prisma.volunteerAttendance.findFirst({
			where: {
				volunteer: {
					id: chatId,
				},
				scholar: {
					scholarId,
				},
			},
		});

		// If the scholar is enrolled delete it.
		if (existingAttendance) await prisma.volunteerAttendance.delete({
			where: {
				id: existingAttendance.id,
			},
		});
	});
}



export const asignVolunteerHours = async (volunteerAttendanceId: string, asignedHours: number) => {
	await prisma.volunteerAttendance.update({
		where: {
			id: volunteerAttendanceId
		},
		data: {
			asigned_hours: asignedHours
		}
	})
}



export const deleteVolunteerFromDatabase = async (volunteerId: string) => {
	await prisma.volunteer.delete({
		where: {
			id: volunteerId
		},
		include: {
			volunteer_attendance: true
		}
	})
}

export const getScheduledVolunteers = async () => {
	const volunteers = await prisma.volunteer.findMany({
		where: {
			status: 'SCHEDULED'
		},
	})
	return volunteers
}


export const changeVolunteerStatusInBulk = async (ids: string[], status: VolunteerStatus) => {
	const workshops = await prisma.volunteer.updateMany({
		where: {
			id: {
				in: ids,
			},
		},
		data: {
			status: status,
		},
	});
	return workshops;
}

export const getVolunteers = async () => {
	const volunteers = await prisma.volunteer.findMany({
		include: {
			volunteer_attendance: true,
		},
	});
	return volunteers;
}

export const changeScholarVolunteerAttendance = async (
	volunteerAttendanceId: string,
	attendance: ScholarAttendance
) => {
	await prisma.volunteerAttendance.update({
		where: {
			id: volunteerAttendanceId,
		},
		data: {
			attendance: attendance,
		},
	});
};



export const deleteVolunteer = async (volunteerId: string) => {
	await prisma.volunteerAttendance.deleteMany({
		where:
		{
			volunteerId: volunteerId
		}
	})
	await prisma.volunteer.delete({
		where: {
			id: volunteerId
		},
	})
}