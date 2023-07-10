import { ProfileAvatarPlaceholder } from '@/assets/svgs'
import React from 'react'

interface ProfilePicProps {
    image: string | null
}

const uploadProfilePic = async () => {
    console.log('uploading profile pic')
}
const deleteProfilePic = async () => {
    console.log('deleting profile pic')
}


const ProfilePic = (props: ProfilePicProps) => {

    return (
        <div className="items-center sm:flex xl:block 2xl:flex sm:space-x-4 xl:space-x-0 2xl:space-x-4">
            <img className="mb-4 rounded-lg w-28 h-28 sm:mb-0 xl:mb-4 2xl:mb-0" src={props.image!!} alt="profile picture" />
            <div>
                <h3 className="mb-1 text-xl font-bold text-gray-900 dark:text-white">Foto de perfil</h3>
                <div className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                    JPG, GIF or PNG. MAX 800px
                </div>
                <div className="flex items-center space-x-4">
                    <button  type="button" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-[#008000] border border-[#008000] rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 hover:bg-[#008000] hover:text-slate-950 dark:focus:ring-primary-800">
                        <svg className="w-4 h-4 mr-2 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z"></path><path d="M9 13h2v5a1 1 0 11-2 0v-5z"></path></svg>
                        Subir Foto
                    </button>
                    <button  type="button"  className="py-2 px-3 text-sm font-medium text-red-900 focus:outline-none bg-white rounded-lg border border-red-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-red-400 dark:border-red-600 dark:hover:text-white dark:hover:bg-red-700">
                        Borrar foto actual
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProfilePic