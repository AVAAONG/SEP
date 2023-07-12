import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();


export async function PATCH(req: NextRequest, res: NextResponse) {
    const body = await req.json()
    const { id, data } = body;
    try {
        await prisma.scholar.update({
            where: {
                userId: id
            },
            data: {
                ...data
            }
        })
        return NextResponse.json({ message: "success" }, { status: 200 } )
    }
    catch (error) {
        return NextResponse.json({ error: error }, { status: 500 })
    }
}