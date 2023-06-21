import React from 'react'

const WorkshopForm = () => {
    return (
        <form onSubmit={handleSubmit(async (data, event) => await scheduleWorkshop(data, event!))} className="grid gap-6 md:grid-cols-2 md:grid-rows-2 caret-green-500 text-slate-300 w-full">
            {WORKSHOP_INPUT_ELEMENTS(speakerResponse === undefined ? [] : speakerResponse).map((field) => {
                return (
                    <Input {...field} key={field.title} register={register as unknown as UseFormRegister<FieldValues>} />
                )
            })}
            <button type="submit" className='w-1/2 justify-self-center col-span-2 text-white bg-gradient-to-br from-emerald-500 to-lime-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none  focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2' >
                Agendar Taller
            </button>
        </form>
    )
}

export default WorkshopForm