import { prisma } from "./prisma"

export const getChapters = async () => {
    return await prisma.chapter.findMany({
        select: {
            id: true,
            name: true
        }
    })

}

export const getAdminChapter = async (userId: string) => {
    return await prisma.user.findUnique({
        where: {
            id: userId
        },
        select: {
            admin: {
                select: {
                    chapter: {
                        select: {
                            id: true,
                            name: true
                        }
                    }
                }
            }
        }
    })
}