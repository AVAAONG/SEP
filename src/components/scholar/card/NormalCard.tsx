import React from 'react'

type CardProps = {
    stat: number
    text: string
    bg: string
    Icon: React.FC
}


const NormalCard = ({ stat, text, bg, Icon }: CardProps) => {
    return (
        <div className={`flex flex-col bg-gradient-to-br h-full rounded-lg relative overflow-hidden w-full shadow-lg z-10 ${bg} p-2`}>
            <div className="flex flex-row justify-between z-10 min-w-fit items-start">
                <div className="text-white ">
                    <p className="leading-tight text-5xl font-bold">
                        {stat}
                    </p>
                    <p className="leading-snug text-base flex-grow font-semibold">
                        {text}
                    </p>
                </div>
            </div>
            <div className='absolute opacity-20 text-[190px] -z-10 w-28 '>
                <Icon />
            </div>
        </div>
    )
}

export default NormalCard;