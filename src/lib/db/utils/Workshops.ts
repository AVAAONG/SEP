'use server';

/**
 * Module for creating and updating workshops.
 * @author Kevin Bravo (kevinbravo.me)
 */

import { ChatsWithAllData } from '@/components/table/columns/chatsColumns';
import { WorkshopWithAllData } from '@/components/table/columns/workshopColumns';
import { getCookie } from '@/lib/serverAction';
import {
  ActivityStatus,
  Chat,
  Prisma,
  ScholarAttendance,
  Volunteer,
  Workshop
} from '@prisma/client';
import shortUUID from 'short-uuid';
import { VolunteerWithAllData } from '../types';
import { prisma } from './prisma';

export const getWorkshopsByScholar = async (scholarId: string) => {
  const workshops = await prisma.scholar.findUniqueOrThrow({
    where: {
      id: scholarId,
    },
    select: {
      program_information: {
        include: {
          attended_workshops: true,
        },
      },
    },
  });
  return workshops;
};

/**
 * Gets the number of workshops with the specified activity status.
 * @param status - The activity status to filter by.
 * @returns The number of workshops.
 *
 * @example
 * const scheduledWorkshopsCount = await getWorkshopsCountByStatus('SCHEDULED');
 * console.log(scheduledWorkshopsCount); // 5
 */
export const getWorkshopsCountByStatus = async (status: ActivityStatus): Promise<number> => {
  try {
    const count = await prisma.workshop.count({
      where: {
        activity_status: status,
      },
    });
    return count;
  } catch (error) {
    console.error(`Error getting workshops count: ${error}`);
    return 0;
  } finally {
    await prisma.$disconnect();
  }
};

/**
 * Gets the total number of workshops in the database.
 * @returns The number of workshops.
 *
 * @example
 * const workshopsCount = await getWorkshopsCount();
 * console.log(workshopsCount); // 10
 */
export const getWorkshopsCount = async (): Promise<number> => {
  try {
    const count = await prisma.workshop.count();
    return count;
  } catch (error) {
    console.error(`Error getting workshops count: ${error}`);
    return 0;
  } finally {
    await prisma.$disconnect();
  }
};


export const changeScholarAttendance = async (
  workshopAttendanceId: string,
  attendance: ScholarAttendance
) => {
  await prisma.workshopAttendance.update({
    where: {
      id: workshopAttendanceId,
    },
    data: {
      attendance: attendance,
    },
  });
};

export const changeScholarAttendanceChat = async (
  chatAttendanceId: string,
  attendance: ScholarAttendance
) => {
  await prisma.chatAttendance.update({
    where: {
      id: chatAttendanceId,
    },
    data: {
      attendance: attendance,
    },
  });
};

export const enrrrollScholarToWorkshop = async (workshopId: string, scholarId: string) => {
  await prisma.workshopAttendance.create({
    data: {
      workshop: {
        connect: {
          id: workshopId,
        },
      },
      attendance: 'ENROLLED',
      scholar: {
        connect: {
          id: scholarId,
        },
      },
    },
  });
};

export const getWorkshops = async () => {
  const workshops = await prisma.workshop.findMany({
    where: {
      chapterId: await getCookie('chapter')
    },
    include: {
      speaker: true,
      scholar_attendance: true
    },
  });
  return workshops;
};

export const getWorkshopByStatus = async (status: ActivityStatus) => {
  const workshops = await prisma.workshop.findMany({
    where: {
      activity_status: status,
    },
    include: {
      speaker: true,
    },
  });
  return workshops;
};

export const getAllActivities = async (): Promise<[Workshop[], Chat[], Volunteer[]]> => {
  const [workshops, chats, volunteer] = await prisma.$transaction([
    prisma.workshop.findMany(),
    prisma.chat.findMany(),
    prisma.volunteer.findMany(),
  ]);
  return [workshops, chats, volunteer];
};

export const getSentActivitiesWhereScholarIsNotEnrolled = async (
  scholarId: string
): Promise<(WorkshopWithAllData | ChatsWithAllData | VolunteerWithAllData)[]> => {

  // Common Filter for Workshops and Chats
  const commonWhere: Prisma.WorkshopWhereInput & Prisma.ChatWhereInput = {
    activity_status: 'SENT',
    scholar_attendance: {
      none: {
        scholar: {
          scholarId: scholarId,
        },
      },
    },
    speaker: {
      none: {
        id: scholarId
      }
    }
  };

  // Common Include for Workshops and Chats
  const commonInclude = {
    speaker: true,
    scholar_attendance: true,
  };

  // Using a single transaction for better efficiency
  const [workshops, chats, volunteer] = await prisma.$transaction([
    prisma.workshop.findMany({
      where: commonWhere,
      include: commonInclude,
    }),
    prisma.chat.findMany({
      where: commonWhere,
      include: commonInclude,
    }),
    prisma.volunteer.findMany({
      where: {
        status: 'SENT',
        volunteer_attendance: {
          none: {
            scholar: {
              scholarId: scholarId,
            },
          },
        },
      },
      include: { volunteer_attendance: true }, // Only relevant include for volunteer
    }),
  ]);

  return [...workshops, ...chats, ...volunteer];
};

export const getActivitiesByYear = async (
  year: number
): Promise<[Workshop[], Chat[], VolunteerWithAllData[]]> => {
  const [allWorkshops, allChats, allVolunteers] = await prisma.$transaction([
    prisma.workshop.findMany({
      where: {
        chapterId: await getCookie('chapter')
      }
    }),
    prisma.chat.findMany(
      {
        where: {
          chapterId: await getCookie('chapter')
        }
      }
    ),
    prisma.volunteer.findMany({
      where: {
        chapterId: await getCookie('chapter')
      },
      include: {
        volunteer_attendance: true
      }
    }),
  ]);

  const yearStart = new Date(year, 0, 1);
  const yearEnd = new Date(year, 11, 31);

  const workshops = allWorkshops.filter((workshop) =>
    workshop.start_dates.some((date) => date >= yearStart && date <= yearEnd)
  );
  const chats = allChats.filter((chat) =>
    chat.start_dates.some((date) => date >= yearStart && date <= yearEnd)
  );
  const currentDate = new Date();

  const volunteers = allVolunteers.filter((volunteer) =>
    volunteer.kind_of_volunteer === 'EXTERNAL' ? volunteer.start_dates.some((date) => {
      const startDate = new Date(date);
      return startDate < currentDate;
    }) :
      volunteer.start_dates.some((date) => {
        const startDate = new Date(date);
        return startDate >= yearStart && startDate <= yearEnd;
      })
  );
  return [workshops, chats, volunteers];
};



export const getScholarEnrolledActivities = async (scholarId: string) => {
  const activities = await prisma.scholar.findUnique({
    where: {
      id: scholarId,
    },
    select: {
      program_information: {
        include: {
          attended_workshops: true,
        },
      },
    },
  });
  return activities;
};

export const getWorkshop = async (id: shortUUID.SUUID) => {
  const workshop = await prisma.workshop.findUnique({
    where: { id },
    include: {
      speaker: true,
      scholar_attendance: {
        include: {
          satisfaction_form: true,
          scholar: {
            include: {
              scholar: true,
            },
          },
        },
      },
    },
  });
  return workshop;
};
export const getVolunteer = async (id: shortUUID.SUUID) => {
  const workshop = await prisma.volunteer.findUnique({
    where: { id },
    include: {
      volunteer_attendance: {
        include: {
          scholar: {
            include: {
              scholar: true
            },
          },
        },
      },
    },
  });
  return workshop;
};

export const getWorkshopWithSpecificScholarAttendance = async (
  activityId: shortUUID.SUUID,
) => {
  const workshop = await prisma.workshopAttendance.findFirst({
    where: {
      OR: [
        {
          AND: [
            {
              workshop_id: activityId,
            },
          ]
        },
        {
          AND: [
            {
              workshop_id: activityId,
            },
          ]
        }
      ]
    },
    include: {
      workshop: {
        include: {
          speaker: true,
        },
      },
    },
  });

  return workshop;
};

export const getChatWithSpecificScholarAttendance = async (
  activityId: shortUUID.SUUID,
  scholarId: string
) => {
  const workshop = await prisma.chatAttendance.findFirst({
    where: {
      OR: [
        {
          AND: [
            {
              chat_id: activityId,
            },
            {
              scholar: {
                scholarId: scholarId,
              },
            }
          ]
        },
        {
          AND: [
            {
              chat_id: activityId,
            },
            {
              chat: {
                speaker: {
                  some: {
                    id: scholarId,
                  }
                },
              },
            }
          ]
        }
      ]

    },
    include: {
      chat: {
        include: {
          speaker: true,
        },
      },
    },
  });

  return workshop;
};


export const getScheduledWorkshops = async () => {
  const workshops = await prisma.workshop.findMany({
    include: {
      speaker: true,
    },
    where: {
      activity_status: 'SCHEDULED',
    },
    orderBy: {
      start_dates: 'asc',
    },
  });
  return workshops;
};

export const getWorkhsopsByScholar = async (scholarId: string) => {
  const chats = await prisma.workshop.findMany({
    where: {
      scholar_attendance: {
        some: {
          scholar: {
            scholarId: scholarId,
          },
        },
      },
    },
    include: {
      speaker: true,
      scholar_attendance: {
        where: {
          scholar: {
            scholarId: scholarId,
          },
        },
      },
    },
  });
  return chats;
};

export const getVolunteersByScholar = async (scholarId: string) => {
  const volunteers = await prisma.volunteer.findMany({
    where: {
      volunteer_attendance: {
        some: {
          scholar: {
            scholarId: scholarId,
          },
        },
      },
    },
    include: {
      volunteer_attendance: {
        where: {
          scholar: {
            scholarId: scholarId,
          },
        },
      },
    },
  });
  return volunteers;
}


export const getScholarsWithActivities = async () => {
  const scholars = await prisma.scholar.findMany({
    where: {
      AND: [
        { program_information: { chapter_id: await getCookie('chapter') } },
        { program_information: { scholar_condition: 'ACTIVE' } },
      ]
    },
    select: {
      id: true,
      first_names: true,
      last_names: true,
      whatsapp_number: true,
      email: true,
      photo: true,
      dni: true,
      program_information: {
        select: {
          attended_workshops: {
            where: {
              attendance: 'ATTENDED',
              workshop: { activity_status: 'ATTENDANCE_CHECKED' }
            },
            include: { workshop: true }
          },

        },
      },
      collage_information: {
        select: {
          evaluation_scale: true,
          collage_period: {
            select: {
              grade: true,
            },

            orderBy: {
              created_at: 'desc'
            }
          },
        },
      },
    },
  });

  // Consider batching these queries if performance is a concern
  const scholarsWithAttendance = await Promise.all(scholars.map(async (scholar) => {
    const chatAttendances = await prisma.chatAttendance.findMany({
      where: {
        chat: { activity_status: 'ATTENDANCE_CHECKED' },
        OR: [
          { scholar: { scholarId: scholar.id }, attendance: 'ATTENDED' },
          { chat: { speaker: { some: { id: scholar.id } } } }
        ],
      },
      include: { chat: true },
    });

    const volunteerAttendances = await prisma.volunteerAttendance.findMany({
      where: {
        scholar: { scholarId: scholar.id },
        attendance: 'ATTENDED',
        volunteer: { status: 'APPROVED' }, // Include volunteer status check
      },
      include: {
        volunteer: {
          include: {
            volunteer_attendance: {
              where: {
                scholar: { scholarId: scholar.id },
                attendance: 'ATTENDED',
              },
            }
          }
        }
      }
    });

    // Remove duplicate chats (same optimization as before)
    const chatIds = new Set();
    const uniqueChatAttendances = chatAttendances.filter(chatAttendance => {
      const duplicate = chatIds.has(chatAttendance.chat.id);
      chatIds.add(chatAttendance.chat.id);
      return !duplicate;
    });

    return {
      ...scholar,
      program_information: {
        ...scholar.program_information,
        attended_chats: uniqueChatAttendances,
        volunteerAttendance: volunteerAttendances
      },
    };
  }));

  return scholarsWithAttendance;
}
export const getChatsByScholar = async (scholarId: string) => {
  const chats = await prisma.chat.findMany({
    where: {
      OR: [
        {
          scholar_attendance: {
            some: {
              scholar: {
                scholarId: scholarId,
              },
            },
          },
        },
        {
          speaker: {
            some: {
              id: scholarId,
            },
          },
        },
      ],
    },
    include: {
      speaker: true,
      scholar_attendance: {
        where: {
          scholar: {
            scholarId: scholarId,
          },
        },
      },
    },
  });
  return chats;

};

export const getWorkshopsByScholar2 = async (scholarProgramInformationId: string) => {
  const workshops = await prisma.workshopAttendance.findMany({
    where: {
      program_information_scholar_id: scholarProgramInformationId,
    },
    include: {
      workshop: true,
    },
  });
  return workshops;
};

export const addAttendaceToScholar = async (
  workshopId: string,
  scholarId: string,
  attendance: ScholarAttendance
) => {
  await prisma.workshopAttendance.create({
    data: {
      workshop: {
        connect: {
          id: workshopId,
        },
      },
      scholar: {
        connect: {
          scholarId,
        },
      },
      attendance: attendance as ScholarAttendance,
    },
  });
};


export const enroleScholarInWorkshop = async (
  workshopId: string,
  scholarId: string,
) => {
  let enrolled = false
  // Start a transaction
  await prisma.$transaction(async (prisma) => {
    // Check if the scholar is already enrolled in the workshop
    const existingAttendance = await prisma.workshopAttendance.findFirst({
      where: {
        workshop: {
          id: workshopId,
        },
        scholar: {
          scholarId,
        },
      },
    });
    // If the scholar is not already enrolled, add the attendance
    if (!existingAttendance) {
      const workshop = await prisma.workshop.findUnique({
        where: {
          id: workshopId,
        },
        include: {
          scholar_attendance: true,
        }
      });
      const totalAttendance = workshop?.scholar_attendance.filter(attendance => attendance.attendance === 'ENROLLED').length || 0;
      if (totalAttendance >= workshop?.avalible_spots!) { }
      else {
        await prisma.workshopAttendance.create({
          data: {
            workshop: {
              connect: {
                id: workshopId,
              },
            },
            scholar: {
              connect: {
                scholarId,
              },
            },
            attendance: 'ENROLLED',
          },
        });
        enrolled = true

      }
    }
  });
  return enrolled
}

export const addScholarToWorkshop = async (
  workshopId: string,
  scholarId: string,
) => {
  // Start a transaction
  await prisma.$transaction(async (prisma) => {
    // Check if the scholar is already enrolled in the workshop
    const existingAttendance = await prisma.workshopAttendance.findFirst({
      where: {
        workshop: {
          id: workshopId,
        },
        scholar: {
          scholarId,
        },
      },
    });
    // If the scholar is not already enrolled, add the attendance
    if (!existingAttendance) {
      const workshop = await prisma.workshop.findUnique({
        where: {
          id: workshopId,
        },
        include: {
          scholar_attendance: true,
        }
      });

      await prisma.workshopAttendance.create({
        data: {
          workshop: {
            connect: {
              id: workshopId,
            },
          },
          scholar: {
            connect: {
              scholarId,
            },
          },
          attendance: 'ENROLLED',
        },
      });
    }
  });
}
export const addScholarToChat = async (
  chatId: string,
  scholarId: string,
) => {
  // Start a transaction
  await prisma.$transaction(async (prisma) => {
    // Check if the scholar is already enrolled in the workshop
    const existingAttendance = await prisma.chatAttendance.findFirst({
      where: {
        chat: {
          id: chatId,
        },
        scholar: {
          scholarId,
        },
      },
    });
    // If the scholar is not already enrolled, add the attendance
    if (!existingAttendance) {
      const workshop = await prisma.chat.findUnique({
        where: {
          id: chatId,
        },
        include: {
          scholar_attendance: true,
        }
      });

      await prisma.chatAttendance.create({
        data: {
          chat: {
            connect: {
              id: chatId,
            },
          },
          scholar: {
            connect: {
              scholarId,
            },
          },
          attendance: 'ENROLLED',
        },
      });
    }
  });
}

export const deleteScholarFromChat = async (
  chatId: string,
  scholarId: string
) => {
  // Start a transaction
  await prisma.$transaction(async (prisma) => {
    // Check if the scholar is already enrolled in the workshop
    const existingAttendance = await prisma.chatAttendance.findFirst({
      where: {
        chat: {
          id: chatId,
        },
        scholar: {
          scholarId,
        },
      },
    });

    // If the scholar is enrolled delete it.
    if (existingAttendance) await prisma.chatAttendance.delete({
      where: {
        id: existingAttendance.id,
      },
    });
  });
}

export const deleteScholarFromWorkshop = async (
  workshopId: string,
  scholarId: string
) => {
  // Start a transaction
  await prisma.$transaction(async (prisma) => {
    // Check if the scholar is already enrolled in the workshop
    const existingAttendance = await prisma.workshopAttendance.findFirst({
      where: {
        workshop: {
          id: workshopId,
        },
        scholar: {
          scholarId,
        },
      },
    });

    // If the scholar is enrolled delete it.
    if (existingAttendance) await prisma.workshopAttendance.delete({
      where: {
        id: existingAttendance.id,
      },
    });
  });
}

export const enroleScholarInChat = async (
  chatId: string,
  scholarId: string,
) => {
  let enrolled = false
  // Start a transaction
  await prisma.$transaction(async (prisma) => {
    // Check if the scholar is already enrolled in the workshop
    const existingAttendance = await prisma.chatAttendance.findFirst({
      where: {
        chat: {
          id: chatId,
        },
        scholar: {
          scholarId,
        },
      },
    });

    // If the scholar is not already enrolled, add the attendance
    if (!existingAttendance) {
      const chat = await prisma.chat.findUnique({
        where: {
          id: chatId,
        },
        include: {
          scholar_attendance: true,
        }
      });
      const totalAttendance = chat?.scholar_attendance.filter(attendance => attendance.attendance === 'ENROLLED').length || 0;
      if (totalAttendance >= chat?.avalible_spots!) { }
      else {
        await prisma.chatAttendance.create({
          data: {
            chat: {
              connect: {
                id: chatId,
              },
            },
            scholar: {
              connect: {
                scholarId,
              },
            },
            attendance: 'ENROLLED',
          },
        });
        enrolled = true
      }
    }
  });
  return enrolled;
};

export const createWorkshop = async (workshop: Prisma.WorkshopCreateArgs) => {
  const createdWorkshop = await prisma.workshop.create(workshop);
  return createdWorkshop;
};

export const sendWorkshopsToScholar = async (workshopId: string) => {
  await prisma.workshop.update({
    where: {
      id: workshopId,
    },
    data: {
      activity_status: 'SENT',
    },
  });
};

export const updateWorkshop = async (workshopId: string, workshop: Prisma.WorkshopCreateArgs) => {
  const createdVolunteer = await prisma.workshop.update({
    where: {
      id: workshopId
    },
    ...workshop
  });
  return createdVolunteer;
};

export const deleteWorkshopFromDatabase = async (id: string) => {
  try {
    const workshop = await prisma.workshop.delete({
      where: {
        id: id,
      },
      include: {
        scholar_attendance: true,
      },
    });
    return workshop;
  } catch (error) {
    console.error(`Error deleting workshop: ${error}`);
  } finally {
    await prisma.$disconnect();
  }
};

export const changeWorkshopStatus = async (id: string, status: ActivityStatus) => {
  const workshop = await prisma.workshop.update({
    where: {
      id: id,
    },
    data: {
      activity_status: status,
    },
  });
  return workshop;
};


export const updateWorkshopAttendanceSatisfactionForm = async (
  id: string,
  satisfactionForm: Prisma.WorkshopSafisfactionFormUncheckedCreateWithoutWorkshop_attendanceInput
) => {
  const workshop = await prisma.workshopAttendance.update({
    where: {
      id: id,
    },
    data: {
      satisfaction_form: {
        create: satisfactionForm
      },
      satisfaction_form_filled: true,
    },
  });
  return workshop;
}


export const updatechatAttendanceSatisfactionForm = async (
  id: string,
  satisfactionForm: Prisma.ChatSafisfactionFormUncheckedCreateWithoutChat_attendanceInput
) => {
  const chat = await prisma.chatAttendance.update({
    where: {
      id: id,
    },
    data: {
      ChatSafisfactionForm: {
        create: satisfactionForm
      },
      satisfaction_form_filled: true,
    },
  });
  return chat;
}


export const changeWorkshopStatusInBulk = async (ids: string[], status: ActivityStatus) => {
  const workshops = await prisma.workshop.updateMany({
    where: {
      id: {
        in: ids,
      },
    },
    data: {
      activity_status: status,
    },
  });
  return workshops;
}


export const deleteWorkshop = async (workshopId: string) => {
  await prisma.workshopAttendance.deleteMany({
    where:
    {
      workshop_id: workshopId
    }
  })
  await prisma.workshop.delete({
    where: {
      id: workshopId
    },
  })
}