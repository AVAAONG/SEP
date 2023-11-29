import { Mentor } from "@prisma/client"
import { prisma } from "./prisma"


export const getMentors = async (): Promise<Mentor | null> => {
    try {
        const mentors = await prisma.mentor.findMany()
        return mentors
    }
    catch (error) {
        console.log(error)
        return null
    }
}

export const getMentor = async (id: string): Promise<Mentor | null> => {
    try {
        const mentor = await prisma.mentor.findUnique({
            where: {
                id
            }
        })
        return mentor
    }
    catch (error) {
        console.log(error)
        return null
    }
}