import React, { BaseSyntheticEvent } from 'react'
import { Workshop } from '@/types/Workshop';
import { useForm } from 'react-hook-form';
import shortUUID from 'short-uuid';
import { Prisma, WorkshopSpeaker } from '@prisma/client';
import useSWR, { Fetcher } from 'swr';

const PROGRAM_PENSUM = ['Liderazgo', 'Ejercicio Ciudadano', 'Gerencia de sí mismo', 'TIC', 'Emprendimiento']
const MODALITY = ['Presencial', 'Virtual', 'Asincrono', 'Hibrido']
const PLATFORMS = ['Zoom', 'Google Meet', 'Otra', 'Padlet']
const WORKSHOP_YEAR = ['I', 'II', 'III', 'IV', 'V', 'V0', 'Todos']


const WorkshopForm = () => {
    const { register, handleSubmit, reset, } = useForm<Workshop>();
    const toSelect: Prisma.WorkshopSpeakerSelect = {
        id: true,
        name: true,
    }
    ///@ts-ignore
    const fetcher: Fetcher<WorkshopSpeaker[] | {}[], string> = (...args) => fetch([...args]).then(res => res.json())

    const { data, error, isLoading } = useSWR('/api/workshop/speakers', fetcher, { fallbackData: [{}, {}], })

    const scheduleWorkshop = async (data: Workshop, event: BaseSyntheticEvent<object, any, any> | undefined) => {
        if (event === undefined) return;
        event.preventDefault();
        data.id = shortUUID.generate();

        await fetch('/api/workshop', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        reset({
            title: "",
            pensum: "Liderazgo",
            date: "",
            startHour: "",
            endHour: "",
            speaker: "",
            spots: 0,
            modality: "presencial",
            platform: "zoom",
            workshopYear: ["I"],
            description: ""
        });
    }
    return (
        <form onSubmit={handleSubmit(async (data, event) => await scheduleWorkshop(data, event!))} className="grid gap-6 md:grid-cols-2 md:grid-rows-2 caret-green-500 text-slate-300 w-full" >

            <div className='col-span-2 h-fit'>
                <label className="block mb-2 text-sm m-l-1 font-medium  text-slate-400">Titulo del taller</label>
                <input {...register("title")} type={"text"} id={"Titulo del taller"} required={true} />
            </div>

            <div >
                <label className="block mb-2 text-sm font-medium  text-slate-400">Competencia asociada</label>
                <select  {...register("pensum")} id="Competencia asociada" className="focus:outline-none  focus:outline-offset-0 py-1 px-3 rounded-md w-full bg-emerald-950  ring-1 ring-emerald-900 active:border-zinc-950 focus:outline-emerald-600" required={true}>
                    {PROGRAM_PENSUM.map((option) => {
                        return (
                            <option key={option} >{option}</option>
                        )
                    })}
                </select>
            </div>
            <div >
                <label className="block mb-2 text-sm m-l-1 font-medium  text-slate-400"> Fecha</label>
                <input  {...register("date")} type={'date'} id={"Fecha"} required={true} />
            </div>

            <div >
                <label className="block mb-2 text-sm m-l-1 font-medium  text-slate-400"> Hora de inicio</label>
                <input  {...register("startHour")} type={'time'} id={"Hora de inicio"} required={true} />
            </div>

            <div >
                <label className="block mb-2 text-sm m-l-1 font-medium  text-slate-400"> Hora de cierre</label>
                <input  {...register("endHour")} type={'time'} id={"Hora de cierre"} required={true} />
            </div>

            <div >
                <label className="block mb-2 text-sm font-medium  text-slate-400">Facilitador</label>
                <select  {...register("speaker")} id="Facilitador" className="focus:outline-none  focus:outline-offset-0 py-1 px-3 rounded-md w-full bg-emerald-950  ring-1 ring-emerald-900 active:border-zinc-950 focus:outline-emerald-600" required={true}>
                    {
                        isLoading || data.length < 1 ?
                            <option>Cargando facilitadores ...</option>
                            :
                            data.map((value) => {
                                const { id, name } = value as WorkshopSpeaker;
                                return (
                                    <option key={id} value={id} >{name}</option>
                                )
                            })}
                </select>
            </div>
            <div >
                <label className="block mb-2 text-sm font-medium  text-slate-400">Cupos disponibles</label>
                <input {...register("spots")} type={"number"} id="first_name" required min={0} max={300} />
            </div>
            <div >
                <label className="block mb-2 text-sm font-medium  text-slate-400">Modalidad</label>
                <select  {...register("modality")} id="Modalidad" className="focus:outline-none  focus:outline-offset-0 py-1 px-3 rounded-md w-full bg-emerald-950  ring-1 ring-emerald-900 active:border-zinc-950 focus:outline-emerald-600" required={true}>
                    {MODALITY.map((option) => {
                        return (
                            <option key={option} >{option}</option>
                        )
                    })}
                </select>
            </div>
            <div>
                <label className="block mb-2 text-sm font-medium text-slate-400">Platafomra/Lugar</label>
                <input list="allowedSelection"  {...register("platform")} id={"Platafomra/Lugar"} ></input>
                <datalist id="allowedSelection">
                    {PLATFORMS.map((option) => {
                        return (
                            <option key={option}>{option}</option>

                        )
                    })}
                </datalist>
            </div>
            <div className="col-span-2 h-fit flex flex-col" >
                <p className="block mb-2 text-sm font-medium  text-slate-400">Año del taller</p>
                <div className="flex">
                    {WORKSHOP_YEAR.map((input) => {
                        return (
                            <div className="flex flex-row items-center mr-4" key={input}>
                                <input {...register("workshopYear")} type="checkbox" value={input} id='year' className='w-4 h-4 bg-emerald-900  accent-green-500 text-emerald-600 border-gray-300 focus:ring-0 ' />
                                <label htmlFor="year" className='ml-2 font-medium text-sm '>{input}</label>
                            </div>
                        )
                    })}
                </div>
            </div >
            <div className='col-span-2 h-fit' >
                <label className="block mb-2 text-sm m-l-1 font-medium max-h-10 text-slate-400">Descripción</label>
                <textarea {...register("description")} className="min-h-[4rem] focus:outline-none  focus:outline-offset-0 py-1 px-3 rounded-md w-full bg-emerald-950  ring-1 ring-emerald-900 active:border-zinc-950 focus:outline-emerald-600" />
            </div>

            <button type="submit" className='w-1/2 justify-self-center col-span-2 text-white bg-gradient-to-br from-emerald-500 to-lime-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none  focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2' >
                Agendar Taller
            </button>
        </form >
    )
}

export default WorkshopForm;