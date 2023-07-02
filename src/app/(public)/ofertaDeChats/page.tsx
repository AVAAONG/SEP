'use client'
import React from 'react'
import { useSearchParams } from 'next/navigation'
import ChatCard from '@/components/card/ChatCard'
import { Chat } from '@/types/Chat'
import Image from 'next/image'

interface ChatQuery extends Chat {
  inscriptionLink: string
}

const page = () => {
  const searchParams = useSearchParams()
  const chats = searchParams.get('chats');
  const f = JSON.parse(chats);

  return (
    <main className='bg-purple-300 flex flex-col'>
      <div className='w-full border-b-8 border-purple-800 '>
        <Image src="https://i.imgur.com/ZDNRUC0.png" alt="" width={1600} height={300} />
      </div>
      <div className="bg-white w-full m-auto p-4 rounded-md mt-4 text-black text-center">
        <h2 className=' text-2xl sm:text-3xl font-bold'>
          Planed Schedule for the month
        </h2>
        <text>
          Click under the name to go to the Google Form to sign up!
        </text>
      </div>
      <div className="p-8 lg:space-y-0 lg:pt-12 min-h-screen ">
        <div className="flex flex-col items-center gap-8">
          <div className="flex flex-col gap-4 justify-center items-center">
            <h2 className='font-bold text-3xl sm:text-5xl mb-4 text-black bg-white w-full p-4 text-center rounded-md'>Chats Virtuales</h2>
            <div className="flex flex-wrap justify-center items-center gap-6 p-4 sm:p-0">
              {f.map((chat, index: number) => {
                const { workshop, completeFormUrl } = chat;
                if (workshop.kindOfChat === 'Virtual') {
                  return <ChatCard key={index} chatName={workshop.name} speaker={workshop.speaker} level={workshop.level} date={workshop.date} hour={workshop.startHour} inscriptionLink={completeFormUrl} />
                }
              })}
            </div>
          </div>
          <div className="flex flex-col gap-4 justify-center items-center ">
            <h2 className='font-bold text-3xl sm:text-5xl mb-4 text-black bg-white p-4 text-center w-full rounded-md'>Chats Presenciales</h2>
            <div className="flex flex-wrap justify-center items-center gap-6 p-4 sm:p-0">
              {f.map((chat, index: number) => {
                const { workshop, completeFormUrl } = chat;
                if (workshop.kindOfChat === 'Presencial') {
                  return <ChatCard key={index} chatName={workshop.name} speaker={workshop.speaker} level={workshop.level} date={workshop.date} hour={workshop.startHour} inscriptionLink={completeFormUrl} />
                }
              })}
            </div>
          </div>
          <div className="text-black text-lg font-semibold">
            ¡Inscribirse es un compromiso, no faltes al chat!
          </div>
        </div>
      </div>
    </main>
  )

}

export default page