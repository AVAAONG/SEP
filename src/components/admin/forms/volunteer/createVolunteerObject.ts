

import { formatDates } from "@/lib/calendar/clientUtils";
import volunteerSchema from "@/lib/schemas/volunteerSchema";
import { getCookie } from "@/lib/serverAction";
import { Prisma, VolunteerStatus } from "@prisma/client";
import { z } from "zod";

const createVolunteerObject = async (data: z.infer<typeof volunteerSchema>, status: VolunteerStatus) => {
    const dates = await formatDates(data.dates); //client formating
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
            chapterId: await getCookie('chapter'),
        },
    };
    return volunteer;
};
export default createVolunteerObject;