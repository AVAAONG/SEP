import React from 'react'

const HighlightsForm = () => {
    return (

        <div aria-hidden="true" className="z-50 fixed top-0 left-0 right-0 w-full h-full p-4 overflow-x-hidden overflow-y-auto max-h-full  bg-green-100 bg-opacity-70 dark:bg-slate-950 dark:bg-opacity-70 ">
        <div className="w-full max-w-2xl max-h-full m-auto">
            <div className="flex flex-col m-auto bg-white rounded-lg shadow dark:bg-emerald-950 !bg-opacity-100">
                <div className="flex items-center justify-center p-4 border-b rounded-t dark:border-gray-600">
                    <h3 className="text-xl text-center md:text-start font-semibold text-gray-900 dark:text-white">
                        ✨ Registro de logros ✨
                    </h3>
                    <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="staticModal">
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                        <span className="sr-only">Cerrar</span>
                    </button>
                </div>

                <div className="p-6 space-y-3 flex flex-col justify-center ">
                    <div className='grid grid-cols-7 gap-4 w-full justify-center'>
                        <div className="col-span-6 ">
                            <label htmlFor="studyArea" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Titulo del logro obtenido.</label>
                            <input type="text" />
                        </div>
                        <div className="col-span-6 ">
                            <label htmlFor="studyArea" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fecha del logro obtenido.</label>
                            <input type="date" />
                        </div>
                        <div className="col-span-6 ">
                            <label htmlFor="studyArea" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Institución, Programa o Actividad en la cual participaste y obtuviste ese logro.</label>
                            <input type="text" />
                        </div>

                        <div className="col-span-6 ">
                            <label htmlFor="studyArea" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Describe a continuación como fue la experiencia? a que se refiere? que habilidades o características te llevaron a obtener ese logro? Por qué consideras debemos resaltarlo?</label>
                            <input type="text" />
                        </div>
                        <div className="col-span-6 ">
                            <label htmlFor="studyArea" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Adjunta un soporte fotográfico.</label>
                            <input type="file" />
                        </div>
                    </div>
                    {/* <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                        Una vez que le des al boton de "Solicitar carta" se creara tu carta para solicitar el ingreso en la cede que seleccionaste. Esta te llegara por correo, con el fin de que puedas verificar que tus datos esten bien escritos.
                    </p>
                    <p className="text-base leading-relaxed text-green-700 dark:text-emerald-700">
                        Una vez realizado esto, pueden venir en cualquier momento a la oficina (dentro del horario laboral) para hacer el retiro de su carta. Ya que para ser entregada al CVA esta debe de contar con sello y firma húmeda.
                    </p> */}
                </div>

                <div className="flex items-center p-6 space-x-2  rounded-b dark:border-gray-600">
                    <button
                        className="text-white bg-green-600 hover:bg-green-500 hover:text-green-900 font-medium rounded-lg text-sm px-5 py-2.5 text-center" type="submit">Solicitar carta
                    </button>
                </div>
            </div>
        </div>
    </div>
    )
}

export default HighlightsForm;