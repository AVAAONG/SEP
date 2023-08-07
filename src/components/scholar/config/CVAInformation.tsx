"use client";
import LoadingModal from '@/components/scholar/forms/LoadingModal';
import React, { BaseSyntheticEvent, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';

interface CVAInformationProps {
    title: string;
    id: string;
    scholarCVAInfo: {
        isInCVA: boolean,
        cvaLocation: string,
        cvaModality: string,
        englishLevel: string,
        notStartedCvaRreason: string,
    }
}


const CVAInformation = ({ scholarCVAInfo, id, title }: CVAInformationProps) => {

    const [updatinState, changeUpdatingState] = useState<"updating" | "updated" | "error" | "none">("none");

    useEffect(() => {
        if (updatinState === "updated") {
            setTimeout(() => {
                changeUpdatingState("none")
            }, 3000)
        }
    }, [updatinState])

    const { handleSubmit, register } = useForm({
        defaultValues: {
            ...scholarCVAInfo
        }
    });

    const saveData = async (data: any, event: BaseSyntheticEvent) => {
        event.preventDefault();
        changeUpdatingState("updating")
        if (data.isInCVA === "TRUE") data.isInCVA = true
        else data.isInCVA = false
        const response = await fetch(`/becario/api/scholar`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data, id })
        })
        if (response.status === 200) {
            changeUpdatingState("updated")
        }
        else {
            changeUpdatingState("error")
        }
    }

    if (updatinState !== "none") {
        return (
            <LoadingModal state={updatinState} changeState={changeUpdatingState} />
        )
    }
    else {
        return (
            <>
                <h3 className="text-green-900 mb-4 text-xl font-semibold dark:text-white">{title}</h3>
                <form action="#">
                    <div className="grid grid-cols-2 gap-2">
                        <div className="col-span-2 sm:col-span-1">
                            <label htmlFor="isCurrentlyWorking" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">¿Te encuentras cursando el curso de Ingles en el CVA?</label>
                            <select {...register("isInCVA")} className="bg-gray-50 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required>
                                <option value="TRUE">Si</option>
                                <option value="FALSE">No</option>
                            </select>
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                            <label htmlFor="isCurrentlyWorking" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">¿En que sede te encuentras?</label>
                            <select {...register("cvaLocation")} className="bg-gray-50 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" >
                                <option value="MERCEDES">Las mercedes</option>
                                <option value="CENTRO">El centro</option>
                            </select>
                        </div>
                        <div className="col-span-2 sm:col-span-">
                            <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">¿En que modalidad te encuentras estudiando en el CVA?</label>
                            <select {...register("cvaModality")} className="bg-gray-50 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" >
                                <option value="DIARIO">Diario</option>
                                <option value="INTERDIARIO">Interdiario</option>
                                <option value="SABATINO">Sabatino</option>
                            </select>                        </div>
                        <div className="col-span-2 sm:col-span-2">
                            <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Modulo en el que te encuentras</label>
                            <input type='number' {...register("englishLevel")} placeholder='3' required />
                        </div>
                        <div className="col-span-2 sm:col-span-2">
                            <label htmlFor="state" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Razon de no estar estudiando en el CVA</label>
                            <textarea {...register("notStartedCvaRreason")} />
                        </div>
                        <div className="col-span-2 sm:col-full">
                            <button
                                onClick={handleSubmit((data, event) => saveData(data, event!))}
                                className="text-white bg-green-600 hover:bg-green-500 hover:text-green-900 font-medium rounded-lg text-sm px-5 py-2.5 text-center" type="submit">Guardar cambios</button>
                        </div>
                    </div>
                </form>
            </>
        )
    }
}

export default CVAInformation