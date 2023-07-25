'use client'
import Input from '@/components/forms/Inputs';
import React, { BaseSyntheticEvent, useState } from 'react'
import { FieldValues, UseFormRegister, useForm } from 'react-hook-form';
import CHAT_INPUT_ELEMENTS from '@/components/forms/data/chatInputs';
import shortUUID from 'short-uuid';
import ChatsList from '@/components/lists/ChatsList';
import { Chat } from '@/types/Chat';

const page = () => {

    const { register, handleSubmit, formState: { errors }, reset, } = useForm<Chat>();
    const [chatData, setChatData] = useState<Chat[]>([
        // {
        //     "name": "Liderazgo para el siglo 21",
        //     "pensum": "Liderazgo",
        //     "date": "2023-04-20",
        //     "startHour": "18:33",
        //     "endHour": "22:30",
        //     "speaker": "Luis Lopéz",
        //     "numberOfParticipants": 20,
        //     "kindOfWorkshop": "Presencial",
        //     "platform": "Oficinas de AVAA",
        //     "avaaYear": [
        //         "V",
        //         "+V"
        //     ],
        //     "description": "Este taller...",
        //     "id": "guy2a9Z8oo7Nb45z343teEyBNAq" as shortUUID.SUUID
        // },
        // {
        //     "name": "Liderazgo para el siglo 21",
        //     "pensum": "Liderazgo",
        //     "date": "2023-04-20",
        //     "startHour": "18:33",
        //     "endHour": "22:30",
        //     "speaker": "Luis Lopéz",
        //     "numberOfParticipants": 20,
        //     "kindOfWorkshop": "Presencial",
        //     "platform": "Oficinas de AVAA",
        //     "avaaYear": [
        //         "V",
        //         "+V"
        //     ],
        //     "description": "Este taller...",
        //     "id": "guy2a9Z8oo7Nb43786778435zEyBNAq" as shortUUID.SUUID
        // },
        // {
        //     "name": "Liderazgo para el siglo 21",
        //     "pensum": "Liderazgo",
        //     "date": "2023-04-20",
        //     "startHour": "18:33",
        //     "endHour": "22:30",
        //     "speaker": "Luis Lopéz",
        //     "numberOfParticipants": 20,
        //     "kindOfWorkshop": "Presencial",
        //     "platform": "Oficinas de AVAA",
        //     "avaaYear": [
        //         "V",
        //         "+V"
        //     ],
        //     "description": "Este taller...",
        //     "id": "guy2a9Z8oo7Nb43435zEyBNAq" as shortUUID.SUUID
        // }
    ]);

    const deleteEntry = (inputId: shortUUID.SUUID) => {
        setChatData((oldValues: Chat[]) => {
            return oldValues.filter((chat: Chat) => chat.id !== inputId)
        })
    }

    const editEntry = (inputId: shortUUID.SUUID) => {
        const data = chatData.filter((workshop: Chat) => workshop.id === inputId)
        const { name, level, date, startHour, endHour, speaker, numberOfParticipants, kindOfChat, platform, turn, description } = data[0];
        reset({
            name,
            level,
            date,
            startHour,
            endHour,
            speaker,
            numberOfParticipants,
            kindOfChat,
            platform,
            turn,
            description
        })
        deleteEntry(inputId);
    }
    const createChat = (data: Chat, event: BaseSyntheticEvent<object, any, any> | undefined) => {
        if (event === undefined) return;
        event.preventDefault();
        data.id = shortUUID.generate();
        // delete data.subject;
        // delete data.group;
        setChatData([...chatData, data])
        reset({
            name: "",
            level: "Basico",
            date: "",
            startHour: "",
            endHour: "",
            speaker: "",
            numberOfParticipants: 0,
            kindOfChat: "Presencial",
            platform: "Zoom",
            turn: "A",
            description: ""
        });
        console.log(data)
        // setSubmit(true)
    }

    return (
        <div className="flex flex-col-reverse md:flex-row gap-8">
            <div className='w-screen md:w-1/2 p-4 flex flex-col items-center'>
                {
                    chatData.length >= 1 ?
                        <>
                            <text className='font-semibold text-3xl text-green-500 mb-6'>
                                Chats para enviar
                            </text>
                            <ChatsList chatsData={chatData} deleteEntry={deleteEntry} editEntry={editEntry} />
                            <button className='bg-green-600 text-white rounded-lg col-span-2 max-w-fit px-5 py-2 self-center mt-4' >
                                Enviar chats
                            </button>
                        </>
                        :
                        <></>
                    // <h3 className='font-semibold text-3xl text-green-500 mb-6'>
                    //     Talleres para enviar
                    // </h3>
                }
            </div>
            <div className=' w-full md:w-1/2 p-4 flex flex-col items-center gap-4'>
                <text className='font-semibold text-3xl text-green-500 mx-auto'>
                    Crea un chat
                </text>
                <form onSubmit={handleSubmit(createChat)} className="grid gap-6 md:grid-cols-2 md:grid-rows-2 caret-green-500 text-slate-300 w-full">
                    {CHAT_INPUT_ELEMENTS.map((field) => {
                        return (
                            <Input {...field} key={field.title} register={register as unknown as UseFormRegister<FieldValues>} />
                        )
                    })}
                    <button type="submit" className='w-1/2 justify-self-center col-span-2 text-white bg-gradient-to-br from-emerald-500 to-lime-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2' >
                        Crear Chat
                    </button>
                </form>
            </div>
            {/* 
            <div id="info-popup" tabIndex={-1} className={`${modalopen ? 'flex' : "hidden"}  items-center justify-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full`}>
                <div className="relative p-4 w-full max-w-lg h-full md:h-auto">
                  //aqui va el modal component
                </div>
            </div > */}
        </div >
    )
}

export default page