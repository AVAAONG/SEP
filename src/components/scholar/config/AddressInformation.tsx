"use client";
import LoadingModal from '@/components/scholar/forms/LoadingModal';
import { BaseSyntheticEvent, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';

interface AddressInformationProps {
    scholarAddressInfo: {
        stateOfOrigin: string,
        currentZone: string,
    },
    id: string;
    title: string;
}



const AddressInformation = ({ scholarAddressInfo, title, id }: AddressInformationProps) => {
    const [updatinState, changeUpdatingState] = useState<"updating" | "updated" | "error" | "none">("none");

    useEffect(() => {
        if (updatinState === "updated") {
            setTimeout(() => {
                changeUpdatingState("none")
            }, 3000)
        }
    }, [updatinState])

    const { register, handleSubmit } = useForm({
        defaultValues: {
            ...scholarAddressInfo
        }
    });

    const saveData = async (data: any, event: BaseSyntheticEvent) => {
        event.preventDefault();
        changeUpdatingState("updating")
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
                    <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Estado de Origen</label>
                            <input type='text' {...register("stateOfOrigin")} placeholder='La guaira' required />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="state" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Direccion de Residencia Actual</label>
                            <input type='text' {...register("currentZone")} placeholder='AV San Martin - El Guarataro' required />
                        </div>
                        <div className="col-span-6 sm:col-full">
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

export default AddressInformation