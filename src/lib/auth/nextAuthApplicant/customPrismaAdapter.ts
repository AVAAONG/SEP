import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { Prisma, PrismaClient } from "@prisma/client"
import { nanoid } from "nanoid"
import { Adapter } from "next-auth/adapters"

type CustomPrismaAdapter = Adapter & {
    createUser: (data: Prisma.UserCreateInput) => Promise<Prisma.UserCreateInput>
}

function customPrismaAdapterApplicant(p: PrismaClient): CustomPrismaAdapter {

    return {
        ...PrismaAdapter(p),
        createUser: (data: Prisma.UserCreateInput) => {
            if (!data.kind_of_user) {
                data.kind_of_user = 'APPLICANT'; // Default value if not provided
            }
            return p.user.create({
                data: {
                    ...data,
                    scholar: {
                        create: {
                            email: data.email,
                            first_names: data.name ? data.name.split(' ')[0] : '',
                            last_names: data.name ? data.name.split(' ')[1] : '',
                            gender: 'F',
                            photo: data.image,
                            dni: nanoid(),
                        },
                    },
                },
            })
        },
    }
}

export default customPrismaAdapterApplicant
