
'use server'
import { getServerSession } from "@/lib/auth/authOptions";
import { formatDates } from "@/lib/calendar/clientUtils";
import volunteerSchema from "@/lib/schemas/volunteerSchema";
import { Prisma, VolunteerStatus } from "@prisma/client";
import { z } from "zod";

const createVolunteerObject = async (data: z.infer<typeof volunteerSchema>, status: VolunteerStatus) => {
    const dates = await formatDates(data.dates); //client formating
    const session = await getServerSession();
    if (!session) return;

    let volunteer: Prisma.VolunteerCreateArgs = {
        data: {
            title: data.title,
            avalible_spots: z.coerce.number().parse(data.avalible_spots),
            platform: data.platformInPerson ? data.platformInPerson : data.platformOnline!,
            description: data.description ? data.description : null,
            modality: data.modality,
            status: status,
            VolunteerProject: data.volunteerProject,
            beneficiary: data.beneficiary,
            kind_of_volunteer: data.kindOfVolunteer,
            supervisor: data.supervisor,
            ...dates,
            chapterId: session.chapterId,
        },
    };
    return volunteer;
};
export default createVolunteerObject;