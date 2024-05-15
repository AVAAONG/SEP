import { getScholarsDataForEdusa } from "@/lib/db/utils/users"

export async function GET(req: Request) {
    const scholars = await getScholarsDataForEdusa()
    return Response.json(scholars)
}
