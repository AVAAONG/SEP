import React, { BaseSyntheticEvent } from 'react';
import { Workshop as FormTypeWorkshop } from '@/types/Workshop';
import { useForm } from 'react-hook-form';
import { WorkshopSpeaker } from '@prisma/client';
import useSWR, { Fetcher } from 'swr';

const PROGRAM_COMPONENTS = ['liderazgo', 'ejercicio ciudadano', 'gerencia de sí mismo', 'tic', 'emprendimiento'];
const MODALITY = ['presencial', 'virtual', 'asincrono', 'hibrido'];
const PLATFORMS = ['zoom', 'google meet', 'otra', 'padlet'];
const WORKSHOP_YEAR = ['I', 'II', 'III', 'IV', 'V', 'TODOS'];

const WorkshopForm = () => {

    const { register, handleSubmit, reset, } = useForm<FormTypeWorkshop>();
    ///@ts-ignore
    const fetcher: Fetcher<WorkshopSpeaker[] | {}[], string> = (...args) => fetch([...args]).then(res => res.json())

    const { data, isLoading } = useSWR('/api/workshop/speakers', fetcher, { fallbackData: [{}, {}], })

    const scheduleWorkshop = async (formWorkshopData: FormTypeWorkshop, event: BaseSyntheticEvent<object, any, any> | undefined) => {
        if (event === undefined) return;
        event.preventDefault();
        await fetch('/admin/api/workshops', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formWorkshopData)
        })
        reset({
            title: "",
            pensum: "",
            date: "",
            startHour: "",
            endHour: "",
            speaker: "",
            spots: "",
            modality: "",
            platform: "",
            workshopYear: "",
            description: ""
        });
    }

    return (
        <form onSubmit={handleSubmit(async (data, event) => await scheduleWorkshop(data, event!))} className="grid gap-6 md:grid-cols-2 md:grid-rows-2 caret-green-500 text-slate-300 w-full uppercase">

            <div className='col-span-2 h-fit'>
                <label className="block mb-2 text-xs m-l-1 font-semibold text-slate-400 ">titulo del taller</label>
                <input {...register("title")} type={"text"} id={"Titulo del taller"} required={true} />
            </div>

            <div >
                <label className="block mb-2 text-xs font-semibold  text-slate-400 ">Competencia asociada</label>
                <select  {...register("pensum")} id="Competencia asociada" className="focus:outline-none  focus:outline-offset-0 py-1 px-3 rounded-md w-full bg-emerald-950  ring-1 ring-emerald-900 active:border-zinc-950 focus:outline-emerald-600 uppercase" required={true}>
                    {PROGRAM_COMPONENTS.map((option) => {
                        return (
                            <option className='uppercase' key={option} >{option}</option>
                        )
                    })}
                </select>
            </div>

            <div >
                <label className="block mb-2 text-xs m-l-1 font-semibold  text-slate-400 ">fecha</label>
                <input  {...register("date")} type={'date'} id={"Fecha"} required={true} />
            </div>

            <div >
                <label className="block mb-2 text-xs m-l-1 font-semibold  text-slate-400 ">hora de inicio</label>
                <input  {...register("startHour")} type={'time'} id={"Hora de inicio"} required={true} />
            </div>

            <div >
                <label className="block mb-2 text-xs m-l-1 font-semibold  text-slate-400 ">hora de cierre</label>
                <input  {...register("endHour")} type={'time'} id={"Hora de cierre"} required={true} />
            </div>

            <div >
                <label className="block mb-2 text-xs font-semibold  text-slate-400 ">facilitador</label>
                <select  {...register("speaker")} id="Facilitador" className="focus:outline-none  focus:outline-offset-0 py-1 px-3 rounded-md w-full bg-emerald-950  ring-1 ring-emerald-900 active:border-zinc-950 focus:outline-emerald-600 uppercase" required={true}>
                    {
                        isLoading || data.length < 1 ?
                            <option>Cargando facilitadores ...</option>
                            :
                            data.map((value) => {
                                const { id, name } = value as WorkshopSpeaker;
                                return (
                                    <option className='uppercase' key={id} value={id} >{name}</option>
                                )
                            })}
                </select>
            </div>
            <div >
                <label className="block mb-2 text-xs font-semibold  text-slate-400 ">cupos disponibles</label>
                <input {...register("spots")} type={"number"} id="first_name" required min={0} max={300} />
            </div>
            <div >
                <label className="block mb-2 text-xs font-semibold  text-slate-400 ">modalidad</label>
                <select  {...register("modality")} id="Modalidad" className="focus:outline-none  focus:outline-offset-0 py-1 px-3 rounded-md w-full bg-emerald-950  ring-1 ring-emerald-900 active:border-zinc-950 focus:outline-emerald-600 uppercase" required={true}>
                    {MODALITY.map((option) => {
                        return (
                            <option className='uppercase' key={option} >{option}</option>
                        )
                    })}
                </select>
            </div>
            <div>
                <label className="block mb-2 text-xs font-semibold text-slate-400 ">platafomra/lugar</label>
                <input list="allowedSelection"  {...register("platform")} id={"Platafomra/Lugar"} ></input>
                <datalist id="allowedSelection">
                    {PLATFORMS.map((option) => {
                        return (
                            <option className='uppercase' key={option}>{option}</option>

                        )
                    })}
                </datalist>
            </div>
            <div className="col-span-2 h-fit flex flex-col" >
                <p className="block mb-2 text-xs font-semibold  text-slate-400 ">año del taller</p>
                <div className="flex">
                    {WORKSHOP_YEAR.map((input) => {
                        return (
                            <div className="flex flex-row items-center mr-4" key={input}>
                                <input {...register("workshopYear")} type="checkbox" value={input} id='year' className='w-4 h-4 bg-emerald-900  accent-green-500 text-emerald-600 uppercase border-gray-300 focus:ring-0 ' />
                                <label htmlFor="year" className='ml-2 font-semibold text-xs '>{input}</label>
                            </div>
                        )
                    })}
                </div>
            </div >
            <div className='col-span-2 h-fit' >
                <label className="block mb-2 text-xs m-l-1 font-semibold max-h-10 text-slate-400 ">descripción</label>
                <textarea {...register("description")} className="min-h-[4rem] focus:outline-none  focus:outline-offset-0 py-1 px-3 rounded-md w-full bg-emerald-950  ring-1 ring-emerald-900 active:border-zinc-950 focus:outline-emerald-600 uppercase" />
            </div>

            <button type="submit" className='w-1/2 justify-self-center col-span-2 text-white bg-gradient-to-br from-emerald-500 to-lime-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none  focus:ring-green-800 font-semibold rounded-lg text-xs px-5 py-2.5 text-center mr-2 mb-2' >
                Agendar Taller
            </button>
        </form >
    )
}

export default WorkshopForm;