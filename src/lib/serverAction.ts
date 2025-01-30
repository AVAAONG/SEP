'use server';
import { formatDate } from '@/components/probation/commonComponents';
import { Probation } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import formatDni from './db/utils/formatDni';
import { getScholarByEmail } from './db/utils/users';
import { getCollageName } from './utils/parseFromDatabase';

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

export async function setCookie(name: string, value: string) {
  cookies().set(name, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 3600 // 1 hour
  })
}

export const getCookie = async (name: string) => {
  return cookies().get(name)?.value;
}

export const createProbationAct = async (scholarInProbation, probationInfo: Probation) => {
  const nes = probationInfo
  delete nes.probation_reason
  probationInfo.next_meeting = new Date(probationInfo.next_meeting).toLocaleDateString('es-ES', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
  const result = await fetch(
    'https://script.google.com/macros/s/AKfycbw6KsnrfzdfwcxpalQEUi6NOqygIzhM2w552dj1Gl84lavJxJEFp7CTJVb8XLWt4yFTHQ/exec',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: scholarInProbation.first_names,
        surNames: scholarInProbation.last_names,
        dni: `V-${formatDni(scholarInProbation.dni)}`,
        kindOfProbation:
          probationInfo.kind_of_probation === 'PROBATION_I' ? 'I' : 'II',
        date: formatDate(probationInfo.starting_date),
        ...probationInfo,
      }),
    }
  );
  if (result.status !== 200) throw new Error('Error');
}
