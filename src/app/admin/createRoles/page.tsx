'use client'
import { PartialAreaPermissions, setPermissions } from '@/lib/db/permisions'
import { createRole } from '@/lib/db/utils/admins'
import { Button } from '@nextui-org/react'

const CHATS_MANAGER_PERMISSIONS: PartialAreaPermissions = {
    chats: {
        read: true,
        create: true,
        update: true,
        delete: true,
        speakers: true
    },
    scholars: {
        read: true,
    },
    volunteers: {
        read: true,
        create: true,
        update: true,
        delete: true,
    },
}

const PROJECT_MANAGER_PERMISSIONS: PartialAreaPermissions = {
    scholars: {
        read: true,
    },
    volunteers: {
        read: true,
        create: true,
        update: true,
        delete: true,
    },
}

const CHAPTER_ADMIN_PERMISSIONS: PartialAreaPermissions = {
    volunteers: {
        read: true,
        create: true,
        update: true,
        delete: true,
        external: true
    },
    workshops: {
        read: true,
        create: true,
        update: true,
        delete: true,
        speakers: true
    },
    chats: {
        read: true,
        create: true,
        update: true,
        delete: true,
        speakers: true
    },
    scholars: {
        read: true, //generalRead
        individualRead: true,
        admission: true,
        create: true,
        delete: true,
        update: true,
        status: true,
    },
    admin: {
        read: true,
        create: true,
        update: true,
        delete: true,
        chapterChanage: false
    },
    mentorship: {
        read: true,
        create: true,
        update: true,
        delete: true,
        chapter: true
    }
}

const page = () => {
    const handle = async () => {
        const permisions = setPermissions(PROJECT_MANAGER_PERMISSIONS)
        // await createRole('CHAT_MANAGER', permisions)
        await createRole('CHAPTER_ADMIN', permisions)
        console.log(permisions)
    }
    return (
        <Button onPress={async () => await handle()}>Create Role</Button>
    )
}

export default page