import { ChatLevel } from '@/types/Chat'
import Link from 'next/link'
import React from 'react'

interface ChatCardProps {
  chatName: String,
  speaker: String,
  level: ChatLevel,
  date: string,
  hour: string,
  inscriptionLink: string
}

const ChatCard = ({ chatName, speaker, level, date, hour, inscriptionLink }: ChatCardProps) => {
  const formatedDate = new Date(date)
  console.log(inscriptionLink)
  return (
    <div className='flex gap-4 bg-white p-4 rounded-md w-[420px] items-center justify-center overflow-hidden text-black '>
      <div className="flex flex-col gap-2 items-center">
        < text className='font-bold text-2xl' >
          {chatName}
        </text >
        <span className=' flex gap-1'>
          <text className=''>
            Dicatado por:
          </text>
          <text className='font-bold'>
            {speaker}
          </text>
        </span>
        <span className=' flex gap-1'>
          <text className=''>
            Nivel:
          </text>
          <text className='font-bold'>
            {level}
          </text>
        </span>
        <span className=' flex gap-1 font-bold'>
          <text className=''>
            {formatedDate.toLocaleString('es-ES', { month: 'long' , day: 'numeric', year: 'numeric'})}
          </text>
          <text className=''>
            a las {hour}
          </text>
        </span>
        <div className='absolute -ml-40'>
          <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path clipRule="evenodd" fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm0 8.625a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zM15.375 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zM7.5 10.875a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z" />
          </svg>
        </div>
        <div className='h-6'>
          <a target='_blank' href={inscriptionLink} role='button' type="button" className="absolute w-[420px] -ml-[210px]  text-white bg-purple-800  font-medium rounded-b-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Inscribirse</a>
        </div>
      </div>
    </div>
  )
}

export default ChatCard;