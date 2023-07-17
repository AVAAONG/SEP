import { getWorkshops, getWorkshopsByScholar } from "@/lib/database/Workshops"

export async function GET(req: NextRequest, res: NextResponse) {
    const workshops = await getWorkshopsByScholar()
    return NextResponse.json(workshops)
}