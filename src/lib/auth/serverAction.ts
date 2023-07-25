'use server'
import { cookies } from 'next/headers'

const handler = async (cookieValue: string) => {
    const cookieStore = cookies();
    const hasTheCookie = cookieStore.get('fromWhereYouCome')?.value;

    if (hasTheCookie === cookieValue) return 
    else if (hasTheCookie !== cookieValue) {
        // deletes the actual cookie and set the new one
        cookieStore.delete('fromWhereYouCome')
        cookieStore.set('fromWhereYouCome', cookieValue)
        return 
    }
    else {
        cookieStore.set('fromWhereYouCome', cookieValue)
        return 
    }
}

export default handler;