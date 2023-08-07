import { CheckIcon, LoadingIcon } from '@/assets/svgs'
import { KindOfActivity } from '@/types/General';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';

const CONTACTS_GROUP_OPTIONS = [
    { inputName: "Kevin", value: "SOLO KEVIN" },
    { inputName: "Todos los Becarios", value: "Todos los Becarios" },
    { inputName: "Becarios I", value: "Becarios I" },
    { inputName: "Becarios II", value: "Becarios II" },
    { inputName: "Becarios III", value: "Becarios III" },
    { inputName: "Becarios IV", value: "Becarios IV" },
    { inputName: "Becarios V", value: "Becarios V" },
    { inputName: "Becarios V+", value: "Becarios V+" },
]

type ModalProps = {
    kindOfActivity: KindOfActivity,
    state: string,
    color: string
}

const Modal = ({ kindOfActivity, state, color }: ModalProps) => {
    const [modalopen, setModalOpen] = useState(false)

    const showModal = () => {
        const is = modalopen ? false : true;
        setModalOpen(is)
    }
    const { register, handleSubmit } = useForm();
    const [subjectAndGroup, setSubjectAndGroup] = useState({ subject: "", group: "" })

    return (
        <div className="relative p-4 bg-white rounded-lg shadow bg-gray-800 md:p-8">
            {state === 'preparation' ?
                <div className="text-sm font-light text-gray-500 text-gray-400">
                    <h3 className="mb-3 text-2xl font-bold text-gray-900 text-white">Coloca el Asusto y selecciona el grupo de contacto</h3>
                    <form onSubmit={handleSubmit(sendWorkshops)}>
                        <div className="flex flex-col">
                            <label htmlFor="subject" className="mb-1 text-lg font-bold text-gray-700 text-gray-200">Asunto del correo</label>
                            <input type="text" id="subject" {...register("subject")} placeholder="Asunto" className="px-4 py-2 border rounded-lg bg-gray-700 text-gray-300 border-gray-600 focus:outline-none focus:ring-gray-600 focus:border-gray-600" onChange={(e) => setSubjectAndGroup({ ...subjectAndGroup, subject: e.target.value })} />
                        </div>

                        <div className="flex flex-col mt-4">
                            <label htmlFor="group" className="mb-1 text-lg font-bold text-gray-700 text-gray-200">Grupo de contacto</label>
                            <select  {...register("group")} className="px-4 py-2 border rounded-lg bg-gray-700 text-gray-300 border-gray-600 focus:outline-none focus:ring-gray-600 focus:border-gray-600" onChange={(e) => setSubjectAndGroup({ ...subjectAndGroup, group: e.target.value })}>
                                {CONTACTS_GROUP_OPTIONS.map((c) => {
                                    return <option value={c.value}
                                        key={c.value}
                                        className="text-gray-700 text-gray-300" >
                                        {c.inputName}
                                    </option>
                                })
                                }
                            </select>
                        </div>
                        <div className="justify-between items-center pt-0 space-y-4 sm:flex sm:space-y-0 mt-4">
                            <div className="items-center space-y-4 sm:space-x-4 sm:flex sm:space-y-0">
                                <button onClick={showModal} type="button" className="py-2 px-4 w-full text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 sm:w-auto hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 bg-gray-700 text-gray-300 border-gray-500 hover:text-white hover:bg-gray-600 focus:ring-gray-600">Cancelar</button>
                                <button type="submit" className="py-2 px-4 w-full text-sm font-medium text-center text-white rounded-lg bg-green-500 sm:w-auto hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 bg-primary-600 hover:bg-primary-700 focus:ring-primary-800">Enviar</button>
                            </div>
                        </div>
                    </form>
                </div>
                :
                state === "sending" ? <div className="flex flex-col justify-center items-center">
                    <h3 className="mb-3 text-sm opacity-50 font-bold text-gray-900 text-white">Enviando talleres</h3>
                    <div className="">
                        <LoadingIcon />
                    </div>
                </div>
                    :
                    <div className="flex flex-col justify-center items-center transition-all duration-500">
                        <h3 className="mb-3 text-sm opacity-50 font-bold text-green-900 text-white capitalize">${kindOfActivity}s enviados de forma exitosa!</h3>
                        <CheckIcon color='#ffffff' />
                        <button onClick={showModal} type="button" className="py-2 px-4 w-full text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 sm:w-auto hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 bg-gray-700 text-gray-300 border-gray-500 hover:text-white hover:bg-gray-600 focus:ring-gray-600">Cerrar</button>
                    </div>}
        </div>
    )
}

export default Modal