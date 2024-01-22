'use server';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

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