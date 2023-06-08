'use client'
import Input from '@/components/forms/Inputs';
import { Workshop } from '@/types/Workshop';
import React, { BaseSyntheticEvent, useState } from 'react'
import { FieldValues, UseFormRegister, useForm } from 'react-hook-form';
import WORKSHOP_INPUT_ELEMENTS from '@/components/forms/data/workshopInputs';
import WorkshopsList from '@/components/lists/WorkshopList';
import shortUUID from 'short-uuid';
import { CheckIcon } from '@/assets/svgs';

const Page = () => {
    const [modalopen, setModalOpen] = useState(false)
    const [loading, setLoading] = useState("not");
    const { register, handleSubmit, formState: { errors }, reset, } = useForm<Workshop>();
    const [subjectAndGroup, setSubjectAndGroup] = useState({ subject: "", group: "" })
    const [workshopData, setWorkshopData] = useState<Workshop[]>([
        {
            "name": "Empoderamiento femenino",
            "pensum": "Liderazgo",
            "date": "2023-04-25",
            "startHour": "18:33",
            "endHour": "22:30",
            "speaker": "Luis Lopéz",
            "numberOfParticipants": 20,
            "kindOfWorkshop": "Virtual",
            "platform": "Zoom",
            "avaaYear": [
                "V",
                "+V"
            ],
            "description": "Este taller...",
            "id": "guy2a9Z8oo7Nb45z343teEyBNAq" as shortUUID.SUUID
        },
        {
            "name": "Liderazgo para el futuro",
            "pensum": "Liderazgo",
            "date": "2023-04-26",
            "startHour": "18:33",
            "endHour": "22:30",
            "speaker": "Luis Lopéz",
            "numberOfParticipants": 20,
            "kindOfWorkshop": "Presencial",
            "platform": "Oficinas de AVAA",
            "avaaYear": [
                "V",
                "+V"
            ],
            "description": "Este taller...",
            "id": "guy2a9Z8oo7Nb43786778435zEyBNAq" as shortUUID.SUUID
        },
        {
            "name": "Como crear un vision board",
            "pensum": "Liderazgo",
            "date": "2023-04-27",
            "startHour": "18:33",
            "endHour": "22:30",
            "speaker": "Luis Lopéz",
            "numberOfParticipants": 20,
            "kindOfWorkshop": "Presencial",
            "platform": "Oficinas de AVAA",
            "avaaYear": [
                "V",
                "+V"
            ],
            "description": "Este taller...",
            "id": "guy2a9Z8oo7Nb43435zEyBNAq" as shortUUID.SUUID
        }
    ]);

    const deleteEntry = (inputId: shortUUID.SUUID) => {
        setWorkshopData((oldValues: Workshop[]) => {
            return oldValues.filter((workshop: Workshop) => workshop.id !== inputId)
        })
    }

    const editEntry = (inputId: shortUUID.SUUID) => {
        const data = workshopData.filter((workshop: Workshop) => workshop.id === inputId)
        const { name, pensum, date, startHour, endHour, speaker, numberOfParticipants, kindOfWorkshop, platform, avaaYear, description } = data[0];
        reset({
            name,
            pensum,
            date,
            startHour,
            endHour,
            speaker,
            numberOfParticipants,
            kindOfWorkshop,
            platform,
            avaaYear,
            description
        })
        deleteEntry(inputId);
    }
    const createWorkshop = (data: Workshop, event: BaseSyntheticEvent<object, any, any> | undefined) => {

        if (event === undefined) return;
        event.preventDefault();
        data.id = shortUUID.generate();
        delete data.subject;
        delete data.group;
        setWorkshopData([...workshopData, data])
        reset({
            name: "",
            pensum: "Liderazgo",
            date: "",
            startHour: "",
            endHour: "",
            speaker: "",
            numberOfParticipants: 0,
            kindOfWorkshop: "Presencial",
            platform: "Zoom",
            avaaYear: ["I"],
            description: ""
        });
        // setSubmit(true)
    }

    const sendWorkshops = async (data, e: BaseSyntheticEvent) => {
        e.preventDefault();
        setLoading("sending")
        const payload = {
            subject: data.subject,
            group: data.group,
            workshops: workshopData
        }
        await fetch('/api/temp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })

        setLoading("seing");
        setWorkshopData([])
        setTimeout(() => {
            setLoading("not")
            setModalOpen(false)
        }, 10000)
    }

    const showModal = () => {
        const is = modalopen ? false : true;
        setModalOpen(is)
    }

    return (
        <div className="flex flex-col-reverse md:flex-row gap-8">
            <div className='w-screen md:w-1/2 p-4 flex flex-col items-center'>
                {
                    workshopData.length >= 1 ?
                        <>
                            <text className='font-semibold text-3xl text-green-500 mb-6'>
                                Talleres para enviar
                            </text>
                            <WorkshopsList workshopData={workshopData} deleteEntry={deleteEntry} editEntry={editEntry} />
                            <button onClick={showModal} className='bg-green-600 text-white rounded-lg col-span-2 max-w-fit px-5 py-2 self-center mt-4' >
                                Enviar Talleres
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
                    Crea un taller
                </text>
                <form onSubmit={handleSubmit(createWorkshop)} className="grid gap-6 md:grid-cols-2 md:grid-rows-2 caret-green-500 text-slate-300 w-full">
                    {WORKSHOP_INPUT_ELEMENTS.map((field) => {
                        return (
                            <Input {...field} key={field.title} register={register as unknown as UseFormRegister<FieldValues>} />
                        )
                    })}
                    <button type="submit" className='w-1/2 justify-self-center col-span-2 text-white bg-gradient-to-br from-emerald-500 to-lime-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2' >
                        Crear Taller
                    </button>
                </form>
            </div>
            <div id="info-popup" tabIndex={-1} className={`${modalopen ? 'flex' : "hidden"}  items-center justify-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full`}>
                <div className="relative p-4 w-full max-w-lg h-full md:h-auto">
                    <div className="relative p-4 bg-white rounded-lg shadow bg-slate-800 md:p-8">
                        {loading === "not" ?
                            <div className="text-sm font-light text-gray-500 text-gray-400">
                                <h3 className="mb-3 text-2xl font-bold text-gray-900 text-white">Coloca el Asusto y selecciona los contactos</h3>
                                <form onSubmit={handleSubmit(sendWorkshops)}>
                                    <div className="flex flex-col">
                                        <label htmlFor="subject" className="mb-1 text-lg font-bold text-gray-700 text-gray-200">Asunto</label>
                                        <input type="text" id="subject" {...register("subject")} placeholder="Asunto" className="px-4 py-2 border rounded-lg bg-gray-700 text-gray-300 border-gray-600 focus:outline-none focus:ring-gray-600 focus:border-gray-600" onChange={(e) => setSubjectAndGroup({ ...subjectAndGroup, subject: e.target.value })} />
                                    </div>
                                    <div className="flex flex-col mt-4">
                                        <label htmlFor="group" className="mb-1 text-lg font-bold text-gray-700 text-gray-200">Grupo</label>
                                        <select  {...register("group")} className="px-4 py-2 border rounded-lg bg-gray-700 text-gray-300 border-gray-600 focus:outline-none focus:ring-gray-600 focus:border-gray-600" onChange={(e) => setSubjectAndGroup({ ...subjectAndGroup, group: e.target.value })}>
                                            <option value="SOLO KEVIN">SOLO KEVIN</option>
                                            <option value="Todos los Becarios">Todos los Becarios</option>
                                            <option value="Becarios I">Becarios I</option>
                                            <option value="Becarios II">Becarios II</option>
                                            <option value="Becarios III">Becarios III</option>
                                            <option value="Becarios IV">Becarios IV</option>
                                            <option value="Becarios V">Becarios V</option>
                                            <option value="Becarios V+">Becarios V+</option>
                                        </select>
                                    </div>
                                    <div className="justify-between items-center pt-0 space-y-4 sm:flex sm:space-y-0 mt-4">
                                        <div className="items-center space-y-4 sm:space-x-4 sm:flex sm:space-y-0">
                                            <button onClick={showModal} type="button" className="py-2 px-4 w-full text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 sm:w-auto hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 bg-gray-700 text-gray-300 border-gray-500 hover:text-white hover:bg-gray-600 focus:ring-gray-600">Cancelar</button>
                                            {/* <button type="submit" className="py-2 px-4 w-full text-sm font-medium text-white bg-green-500 rounded-lg border border-transparent sm:w-auto hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-primary-300 focus:z-10">Enviar</button> */}
                                            <button type="submit" className="py-2 px-4 w-full text-sm font-medium text-center text-white rounded-lg bg-green-500 sm:w-auto hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 bg-primary-600 hover:bg-primary-700 focus:ring-primary-800">Enviar</button>
                                        </div>
                                    </div>
                                </form>
                            </div> : loading === "sending" ? <div className="flex flex-col justify-center items-center">
                                <h3 className="mb-3 text-sm opacity-50 font-bold text-gray-900 text-white">Enviando talleres</h3>
                                <div className="">
                                    <svg
                                        className="animate-spin h-20 w-20 text-green-500 transition-all duration-500"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="3"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zM20 12a8 004-4h4zm-2-5.291A7.962 7.962 0 0120 12h4c0-3.042-1.135-5.824-3-7.938l-3 2.647z"></path>
                                    </svg>
                                </div>
                            </div> : <div className="flex flex-col justify-center items-center transition-all duration-500">
                                <h3 className="mb-3 text-sm opacity-50 font-bold text-green-900 text-white">Talleres enviados de forma correcta</h3>
                                <CheckIcon color='' />
                                <button onClick={showModal} type="button" className="py-2 px-4 w-full text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 sm:w-auto hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 bg-gray-700 text-gray-300 border-gray-500 hover:text-white hover:bg-gray-600 focus:ring-gray-600">Cerrar</button>
                            </div>}
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Page