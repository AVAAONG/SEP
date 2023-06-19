import { Workshop, WorkshopDates, WorkshopSpeaker, WorkshopTempData } from "@prisma/client";
import { headers } from "next/headers";
import WorkshopTable from "@/components/tables/WorkshopTable";


const page = async () => {
    const host = headers().get("host");
    const data = await fetch(`http://${host}/api/workshop`, {
        cache: "no-cache"
    })

    const workshopsData: (Workshop & {
        speaker: WorkshopSpeaker[];
        dates: WorkshopDates[];
        tempData: WorkshopTempData | null;
    })[] = await data.json()

    return (
        <div className="">
            <h1 className="font-semibold text-3xl text-green-500 mb-6 text-center">Listado de talleres</h1>
            <div className="h-[680px]">
                <WorkshopTable workshopData={workshopsData} />
            </div>
        </div>

    )
}

export default page