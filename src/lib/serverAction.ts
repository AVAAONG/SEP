'use server';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
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


export const revalidateSpecificPath = async (path: string) => {
  await revalidatePath(path)
}

export const createCVACard = async (email: string | undefined | null, sede: 'centro' | 'mercedes') => {
  if (!email) return
  const scholar = await getScholarByEmail(email)
  const result = await fetch('https://script.google.com/macros/s/AKfycbw4HXPBRWkcMFCt5Dd8gQp6ZCJYKFCNGed0dFq_R7DRY9HgnhJuJOrr1emtZxZNYFrrNg/exec',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        sede,
        scholarName: scholar?.first_names,
        scholarSurname: scholar?.last_names, dni: scholar?.dni,
        genre: scholar?.gender === 'M' ? 'masculino' : 'femenino',
        email,
        phoneNumber: scholar?.cell_phone_Number
      })
    })
  if (result.status !== 200) throw new Error('Error al crear la carta CVA')
}
