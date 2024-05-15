import { formatDatesClient } from "@/lib/calendar/clientUtils";
import { formatDates } from "@/lib/calendar/utils";
import workshopCreationFormSchema from "@/lib/schemas/workshopCreationFormSchema";
import { BaseSyntheticEvent } from "react";
import { z } from "zod";

const handleFormSubmit = async (
    data: z.infer<typeof workshopCreationFormSchema>,
    event: BaseSyntheticEvent<object, any, any> | undefined
) => {
    const buttonType = ((event?.nativeEvent as SubmitEvent)?.submitter as HTMLButtonElement)?.name;
    const dates = formatDatesClient(data.dates); //client formating
    const calendarDates = await formatDates(data.dates); //server formating
    const workshopSpeakersId = data.speakersId.split(',');
    const speakersData = workshopSpeakersId
        .map((speakerId: string) => {
            const speaker = speakers.find((speaker) => speaker.id === speakerId);
            if (!speaker) return null;
            return {
                id: speaker?.id,
                speakerName: `${speaker?.first_names.split(' ')[0]} ${speaker?.last_names.split(' ')[0]}`,
                speakerEmail: speaker?.email,
            };
        })
        .filter((speaker) => speaker !== null) as IWorkshopCalendar['speakersData'];
    const { platformInPerson, platformOnline, speakersId, ...restData } = data;
    const calendarWorkshop: IWorkshopCalendar = {
        platform: platformInPerson ? platformInPerson : platformOnline!,
        speakersData,
        ...calendarDates,
        ...restData,
        description: data.description ? data.description : null,
    };

    if (buttonType === 'edit') {
        const meetingDetails = await updateCalendarEvent(
            workshopForEdit?.calendar_ids!,
            calendarWorkshop,
            workshopForEdit?.meeting_id!
        );

        const editedWorkshop: Prisma.WorkshopUpdateArgs = {
            where: {
                id: workshopForEdit?.id!,
            },
            data: {
                title: data.title,
                avalible_spots: z.coerce.number().parse(data.avalible_spots),
                platform: data.platformInPerson ? data.platformInPerson : data.platformOnline!,
                description: data.description ? data.description : null,
                ...dates,
                modality: data.modality,
                asociated_skill: data.asociated_skill,
                activity_status: 'SCHEDULED',
                calendar_ids: workshopForEdit?.calendar_ids!,
                kindOfWorkshop: data.kindOfWorkshop,
                year: data.year as unknown as WorkshopYear[],
                meeting_id: meetingDetails.map(
                    (meetingDetail) => meetingDetail.meetingId || ''
                ) as string[],
                meeting_link: meetingDetails.map(
                    (meetingDetail) => meetingDetail.meetingLink || ''
                ) as string[],
                meeting_password: meetingDetails.map(
                    (meetingDetail) => meetingDetail.meetingPassword || ''
                ) as string[],
                speaker: {
                    connect: calendarWorkshop.speakersData.map((speaker) => ({ id: speaker.id })),
                },
            },
        };
        await editWorkshop(editedWorkshop);
    } else {
        const [eventsIds, meetingDetails] = await createCalendarEvent(calendarWorkshop);
        const workshop: Prisma.WorkshopCreateArgs = {
            data: {
                title: data.title,
                avalible_spots: z.coerce.number().parse(data.avalible_spots),
                platform: data.platformInPerson ? data.platformInPerson : data.platformOnline!,
                description: data.description ? data.description : null,
                kindOfWorkshop: data.kindOfWorkshop,
                calendar_ids: [...eventsIds],
                ...dates,
                year: data.year as unknown as WorkshopYear[],
                modality: data.modality,
                asociated_skill: data.asociated_skill,
                activity_status: 'SCHEDULED',
                speaker: {
                    connect: calendarWorkshop.speakersData.map((speaker) => ({ id: speaker.id })),
                },
            },
        };
        if (data.modality === 'ONLINE') {
            workshop.data.meeting_id = meetingDetails.map(
                (meetingDetail) => meetingDetail.meetingId || null
            ) as string[];
            workshop.data.meeting_link = meetingDetails.map(
                (meetingDetail) => meetingDetail.meetingLink || null
            ) as string[];
            workshop.data.meeting_password = ['null'];
            if (platformOnline === 'ZOOM') {
                workshop.data.meeting_password = meetingDetails.map(
                    (meetingDetail) => meetingDetail.meetingPassword || null
                ) as string[];
            }
        }
        if (buttonType === 'schedule') {
            workshop.data.activity_status = 'SCHEDULED';
            await createWorkshop(workshop);
        } else if (buttonType === 'send') {
            workshop.data.activity_status = 'SENT';
            await createWorkshop(workshop);
        } else {
        }
    }
    reset();
    await revalidateSpecificPath('/admin/actividadesFormativas/crear');
    router.push('/admin/actividadesFormativas/crear');
};