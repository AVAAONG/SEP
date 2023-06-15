import WorkshopsAloneList from "@/components/lists/WorkshopAloneList"
import { Workshop, WorkshopDates, WorkshopSpeaker, WorkshopTempData } from "@prisma/client";
const page = async () => {
    const data = await fetch('http://seb-git-adddb-mustafinho.vercel.app/api/workshop/schedule', {
        cache: "no-cache"
    })

    const workshopsData: Workshop & {
        speaker: WorkshopSpeaker[];
        dates: WorkshopDates[];
        tempData: WorkshopTempData | null;
    }[] = await data.json()


    return (
        <div className="">
            <h1 className="font-semibold text-3xl text-green-500 mb-6 text-center">Talleres Realizados</h1>
            <div className="h-[680px]">
                <WorkshopsAloneList workshopData={workshopsData} />
            </div>
        </div>

    )
}

export default page