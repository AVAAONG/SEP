'use client'
import Input from '@/components/forms/Inputs';
import React, { BaseSyntheticEvent, useState } from 'react'
import { FieldValues, UseFormRegister, useForm } from 'react-hook-form';
import VOLUNTEER_INPUT_ELEMENTS from '@/components/forms/data/volunteerInputs';
import shortUUID from 'short-uuid';
import { Volunteer } from '@/types/Volunteer';
import VolunteerList from '@/components/lists/VolunteerList';

const page = () => {

    const { register, handleSubmit, formState: { errors }, reset, } = useForm<Volunteer>();
    const [volunteerData, setVolunteerData] = useState<Volunteer[]>([
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
        setVolunteerData((oldValues: Volunteer[]) => {
            return oldValues.filter((chat: Volunteer) => chat.id !== inputId)
        })
    }

    const editEntry = (inputId: shortUUID.SUUID) => {
        const data = volunteerData.filter((workshop: Volunteer) => workshop.id === inputId)
        const { name, asociatedProject, startDate, endDate, startHour, endHour, inCharge, numberOfParticipants, kindOfVolunteer, place, description } = data[0];
        reset({
            name,
            asociatedProject,
            startDate,
            endDate,
            startHour,
            endHour,
            inCharge,
            numberOfParticipants,
            kindOfVolunteer,
            place,
            description
        })
        deleteEntry(inputId);
    }
    const createChat = (data: Volunteer, event: BaseSyntheticEvent<object, any, any> | undefined) => {
        if (event === undefined) return;
        event.preventDefault();
        data.id = shortUUID.generate();
        // delete data.subject;
        // delete data.group;
        setVolunteerData([...volunteerData, data])
        reset({
            name: "",
            asociatedProject: "UMAA",
            startDate: "",
            endDate: "",
            startHour: "",
            endHour: "",
            inCharge: "",
            numberOfParticipants: 0,
            kindOfVolunteer: "Presencial",
            place: "",
            description: "",
        });
        console.log(data)
        // setSubmit(true)
    }

    return (
        <div className="flex flex-col-reverse md:flex-row gap-8">
            <div className='w-screen md:w-1/2 p-4 flex flex-col items-center'>
                {
                    volunteerData.length >= 1 ?
                        <>
                            <text className='font-semibold text-3xl text-green-500 mb-6'>
                                Voluntariado para enviar
                            </text>
                            <VolunteerList volunteerData={volunteerData} deleteEntry={deleteEntry} editEntry={editEntry} />
                            <button className='bg-green-600 text-white rounded-lg col-span-2 max-w-fit px-5 py-2 self-center mt-4' >
                                Enviar voluntariado
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
                    Crea una actividad de voluntariado
                </text>
                <form onSubmit={handleSubmit(createChat)} className="grid gap-6 md:grid-cols-2 md:grid-rows-2 caret-green-500 text-slate-300 w-full">
                    {VOLUNTEER_INPUT_ELEMENTS.map((field) => {
                        return (
                            <Input {...field} key={field.title} register={register as unknown as UseFormRegister<FieldValues>} />
                        )
                    })}
                    <button type="submit" className='w-1/2 justify-self-center col-span-2 text-white bg-gradient-to-br from-emerald-500 to-lime-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2' >
                        Crear Voluntariado
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