"use client";
import { useForm } from 'react-hook-form';


const page = () => {
    const { register, handleSubmit } = useForm();
    return (
        <section className='flex flex-col px-2 pt-6  justify-start items-center w-full gap-4 h-screen'>
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white mb-4">¡Sube tu voluntariado externo!</h1>
            <form className="flex justify-center">
                <div className='grid grid-cols-7 gap-4 w-full justify-center'>
                    <div className="col-span-6 ">
                        <label htmlFor="studyArea" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Lugar donde realizó la actividad</label>
                        <input type='text' placeholder='' required  className='bg-white'/>
                    </div>
                    <div className="col-span-6 ">
                        <label htmlFor="currentAcademicPeriod" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fecha de la actividad </label>
                        <input type='date' required   className='bg-white'/>
                    </div>
                    <div className="col-span-6 ">
                        <label htmlFor="grade" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Indique el número de horas dedicadas a la actividad.</label>
                        <input type='number' required  className='bg-white' />
                    </div>
                    <div className="col-span-6 ">
                        <label htmlFor="grade" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre de la organización, empresa o institución beneficiada</label>
                        <input type='text' required  className='bg-white' />
                    </div>
                    <div className="col-span-6 ">
                        <label htmlFor="grade" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre del beneficiario o supervisor responsable</label>
                        <input type='text' required  className='bg-white' />
                    </div>
                    <div className="col-span-6 ">
                        <label htmlFor="carrer" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Describa brevemente la actividad realizada</label>
                        <textarea required  className='bg-white' />
                    </div>
                </div>
                <div className="flex w-full h-full">
                    <label htmlFor="dropzone-file" className=" p-4 flex flex-col items-center justify-center w-full h-full border-2 border-green-300 border-dashed rounded-lg cursor-pointer bg-green-50 dark:hover:bg-bray-800 dark:bg-emerald-950 hover:bg-green-100 dark:border-emerald-900 dark:hover:border-emerald-800 dark:hover:bg-emerald-900">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg className="w-8 h-8 mb-4 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                            </svg>
                            <p className="mb-2 text-sm text-green-500 dark:text-green-400 font-semibold text-center">
                                Adjunte aqui la constancia emitida por la organización, empresa o institución beneficiada.
                            </p>
                            <p className="text-xs text-green-500 dark:text-green-400"> PNG, JPG o PDF (MAX. 800x400px)</p>
                        </div>
                        <input id="dropzone-file" type="file" className="hidden" />
                    </label>
                </div>
            </form>
            <button
                className="text-white bg-green-600 hover:bg-green-500 hover:text-green-900 font-medium rounded-lg text-sm px-5 py-2.5 text-center" type="submit">Subir voluntariado
            </button>
        </section>
    )
}

export default page