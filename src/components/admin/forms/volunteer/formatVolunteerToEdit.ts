import volunteerSchema from '@/lib/schemas/volunteerSchema';
import { Volunteer } from '@prisma/client';
import moment from 'moment';
import { z } from 'zod';

const formatVolunteer = (
    values: Volunteer
): z.infer<typeof volunteerSchema> & { id: string } => {
    return {
        id: values?.id,
        title: values?.title ?? '',
        dates: [
            {
                date: moment(values?.start_dates[0]).format('YYYY-MM-DD'),
                startHour: moment(values?.start_dates[0]).format('HH:mm'),
                endHour: moment(values?.end_dates[0]).format('HH:mm'),
                endDate: moment(values?.end_dates[0]).format('YYYY-MM-DD'),
            },
        ],
        modality: values?.modality!,
        platformInPerson: values?.platform ?? '',
        platformOnline: values?.platform ?? '',
        description: values?.description ?? undefined,
        avalible_spots: values?.avalible_spots ?? 0,
        beneficiary: values?.beneficiary ?? '',
        kindOfVolunteer: values?.kind_of_volunteer ?? '',
        supervisor: values?.supervisor ?? '',
        volunteerProject: values?.VolunteerProject || 'EXTERNAL',
    };
};

export default formatVolunteer;
