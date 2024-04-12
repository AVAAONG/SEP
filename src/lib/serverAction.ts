'use server';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { CHAT_CALENDAR_ID, WORKSHOP_CALENDAR_ID } from './constants';
import { enroleScholarInChat, enroleScholarInWorkshop } from './db/utils/Workshops';
import { getScholarByEmail } from './db/utils/users';

const handler = async (cookieValue: string) => {
  const cookieStore = cookies();
  const hasTheCookie = cookieStore.get('fromWhereYouCome')?.value;
  if (hasTheCookie === cookieValue) return;
  else if (hasTheCookie !== cookieValue) {
    // deletes the actual cookie and set the new one
    cookieStore.delete('fromWhereYouCome');
    cookieStore.set('fromWhereYouCome', cookieValue, {
      //set max age in 30 days
      maxAge: 30 * 24 * 60 * 60 * 1000,
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    });
    return;
  } else {
    cookieStore.set('fromWhereYouCome', cookieValue, {
      //set max age in 30 days
      maxAge: 30 * 24 * 60 * 60 * 1000,
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    });
    return;
  }
};

export default handler;

export const revalidateSpecificPath = async (path: string, type?: 'page' | 'layout') => {
  if (!type) revalidatePath(path, type);
  else revalidatePath(path);
};
export type KindOfCard = 'cva_incorporation_centro' | 'cva_incorporation_mercedes' | 'cva_desincorporation_centro' | 'cva_desincorporation_mercedes' | 'generic_program_proof' | 'program_proof_spanish' | 'program_proof_english';
export const createCVACard = async (
  email: string | undefined | null,
  kindOfCard: KindOfCard | undefined | null,
  programName?: string
) => {
  if (!email || !kindOfCard) return;
  const scholar = await getScholarByEmail(email);
  const result = await fetch(
    'https://script.google.com/macros/s/AKfycbygQcpeOSMqKy5B6mCWWTmgmcxtRYV1H-aW1gQB1SiZbFP6uyq8Itl9PdSzg6hp8L7kZQ/exec',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "kindOfCard": kindOfCard,
        "scholarFirstNames": scholar?.first_names,
        "scholarLastNames": scholar?.last_names,
        "gender": scholar?.gender,
        "scholarDni": scholar?.dni,
        "avaaAdmisionYear": new Date(scholar?.program_information?.program_admission_date).getFullYear(),
        "email": scholar?.email,
        "phoneNumber": scholar?.cell_phone_Number,
        "carrer": scholar?.collage_information[0].career,
        "collage": scholar?.collage_information[0].collage,
        "programToApply": programName
      }),
    }
  );
  if (result.status !== 200) throw new Error('Error');
};

export const handleEnrollment = async (
  activityId: string,
  scholarId: string,
  eventId: string,
  kindOfActivity: 'workshop' | 'chat',
  email: string
) => {
  if (kindOfActivity === 'workshop') await enroleScholarInWorkshop(activityId, scholarId);
  else if (kindOfActivity === 'chat') await enroleScholarInChat(activityId, scholarId);
  revalidatePath('/becario/oferta');
  const result = await fetch(
    'https://script.google.com/macros/s/AKfycbzSiMKnlwygmcPdvdGvmeLlvXc_bcdm4tcWcpZ2H7QBbz-g3dBqxgFfzd_G44YaEeKkZA/exec',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        newAttende: email,
        eventId,
        calendarId: kindOfActivity === 'workshop' ? WORKSHOP_CALENDAR_ID : CHAT_CALENDAR_ID,
      }),
    }
  );
  if (result.status !== 200) throw new Error('Error al inscribirte en la actividad');
};
