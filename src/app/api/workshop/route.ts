import { setTokens } from '@/lib/auth/auth';
import { createEvent } from '@/lib/calendar/calendar';
import { getFormatedDate } from '@/lib/calendar/utils';
import {
  createWorkshop,
  getScheduledWorkshops,
  getWorkshops,
  getWorkshopsCount,
} from '@/lib/database/Workshops';
import { getSpeakerName, getSpeakerNames } from '@/lib/database/speaker';
import { createFormDescription } from '@/lib/form/form';
import { Workshop } from '@/types/Workshop';
import { activityStatus, Prisma, WorkshopTempData } from '@prisma/client';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';
import shortUUID from 'short-uuid';

export async function GET(req: NextRequest, res: NextResponse) {
  const workshops = await getWorkshops();
  return NextResponse.json(workshops);
}

interface WorkshopPrismaObj extends Workshop {
  calendarID: string;
  activityStatus: activityStatus;
  dates: Prisma.JsonArray;
}

export async function POST(req: NextRequest, res: NextResponse) {
  const data = await req.json();
  const BASE_URL =
    'https://script.google.com/macros/s/AKfycbypXIh8iD-Pbf7gEKHEDrjxTj7EB_DHbWoOO53KgukwDDgaB6PO42xQqeNUReFo4jty/exec';
  const token = await getToken({ req });
  setTokens(token?.accessToken as string, token?.refreshToken as string);

  const { title, date, startHour, endHour, modality, spots, id, speaker } = data;

  const tempDataObj: WorkshopTempData = {
    id: shortUUID.generate(),
    meetingPassword,
    meetingLink,
    meetingId,
    formLink: formUrl,
  };
  data.calendarID = calendarEventId!;
  data.year = data.workshopYear[0];

  createWorkshop(data, datesObj, speakerId, tempDataObj);

  return NextResponse.json({ message: 'ok' });
}
