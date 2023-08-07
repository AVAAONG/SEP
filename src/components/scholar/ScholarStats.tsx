import { ScholarAttendance, Workshop, WorkshopSpeaker } from "@prisma/client";

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')

}
interface WorkshopTableProps {
    workshops: (Workshop & {
        speaker: WorkshopSpeaker[];
        scholarAttendance: {
            attendance: ScholarAttendance;
        }[];
    })[] | undefined
    kindOfActivity: string
}

const defineActivity = (kindOfActivity: string) => {
    if (kindOfActivity === "workshop") {
        return ["actividades de formación", 20]
    } else if (kindOfActivity === "chat") {
        return ["chats", 10]
    }
    else if (kindOfActivity === "volunteer") {
        return ["voluntarido", 100]
    }
    else {
        return ["", 0]
    }
}

const Stats = ({ workshops, kindOfActivity }: WorkshopTableProps) => {
    const [activityName, number] = defineActivity(kindOfActivity)


    let workshopsDone = 0;

    if (workshops) {
        workshopsDone = workshops.filter((workshop) => workshop.scholarAttendance[0].attendance === "ATTENDED").length
    }

    const pendingWorkshops = Number(number) - workshopsDone
    const donePercentage = workshopsDone / 20 * 100
    const pendingPercentage = 100 - donePercentage

    return (
        <div>
            <dl className="mt-5 grid grid-cols-1 rounded-lg bg-gradient-to-t from-green-600  dark:to-emerald-900 to-emerald-400 overflow-hidden shadow divide-y divide-emerald-600 dark:divide-emerald-950 md:grid-cols-2 md:divide-y-0 md:divide-x border border-emerald-600 dark:border-emerald-950">
                <div className="px-4 py-5 sm:p-6  ">
                    <dt className="text-base font-semibold text-white">Total de {activityName} realizados.</dt>
                    <dd className="mt-1 flex justify-between items-baseline md:block lg:flex">
                        <div className="flex items-baseline text-5xl font-bold dark:text-slate-950 text-white">
                            {workshopsDone}
                        </div>
                        <div
                            className={classNames(
                                'bg-green-100 text-green-800', 'inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium md:mt-2 lg:mt-0')}
                        >
                            {donePercentage}%
                        </div>
                    </dd>
                </div>
                <div className="px-4 py-5 sm:p-6  ">
                    <dt className="text-base font-semibold text-white">Total de {activityName} faltantes.</dt>
                    <dd className="mt-1 flex justify-between items-baseline md:block lg:flex">
                        <div className="flex items-baseline text-5xl font-bold dark:text-slate-950 text-white">
                            {pendingWorkshops}
                        </div>
                        <div
                            className={classNames('bg-red-100 text-red-800', 'inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium md:mt-2 lg:mt-0')}
                        >
                            ${pendingPercentage}%
                        </div>
                    </dd>
                </div>
            </dl>
        </div>
    )
}

export default Stats;