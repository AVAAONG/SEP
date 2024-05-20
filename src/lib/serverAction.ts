'use server';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { getScholarByEmail } from './db/utils/users';
import { getCollageName } from './utils/parseFromDatabase';

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
        "avaaAdmisionYear": new Date(scholar?.program_information?.program_admission_date).getFullYear().toString(),
        "email": scholar?.email,
        "phoneNumber": scholar?.cell_phone_Number,
        "carrer": scholar?.collage_information[0].career,
        "collage": getCollageName(scholar?.collage_information[0].collage),
        "programToApply": programName
      }),
    }
  );
  if (result.status !== 200) throw new Error('Error');
};
