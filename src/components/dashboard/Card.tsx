import React from 'react'

type CardProps = {
    stat: number
    text: string
    bg: string
    Icon: React.FC
    cardButtonBg: string
}


const Card = ({ stat, text, bg, Icon, cardButtonBg }: CardProps) => {
    return (
        <div className={`flex flex-col bg-gradient-to-br gap-4 h-full rounded-lg relative overflow-hidden w-full shadow-lg z-10 ${bg} p-4`}>
            <div className="flex flex-row justify-between z-10 min-w-fit items-start">
                <div className=" ">
                    <p className="leading-snug text-white text-base font-medium flex-grow">
                        {text}
                    </p>
                    <p className="leading-tight text-5xl font-bold text-white dark:text-slate-950 ">
                        {stat}
                    </p>
                </div>
                {/* <div className="inline-flex justify-between max-w-[190px] justify-self-end gap-1">
                    <button className={`${cardButtonBg} flex items-center justify-center px-1 py-2 font-semibold rounded-lg text-sm w-16 h-8 capitalize pointer m-auto`}>
                        Mes
                    </button>
                    <button className={`${cardButtonBg} flex items-center justify-center px-1 py-2 font-semibold rounded-lg text-sm w-16 h-8 capitalize pointer m-auto`}>
                        Año
                    </button>
                </div> */}
            </div>
            <div className='absolute opacity-20 text-[190px] -z-10 w-48  -mt-9'>
                <Icon />
            </div>
        </div>
    )
}

export default Card