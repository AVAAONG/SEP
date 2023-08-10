"use server";
import defailProfilePic from '@/../public/defaultProfilePic.png';
import Image from "next/image";

const workshopSpeakerColumns = async (cell) => {
  "use server";
  return (
    <div className="flex items-center w-8">
      <div className="flex-shrink-0 w-12 h-12">
        <Image
          className="w-full h-full rounded-full"
          src={defailProfilePic}
          alt="Foto de perfil"
        />
      </div>
      <div className="ml-4">
        <div className="text-sm text-gray-900 dark:text-slate-100">
          {cell.row.original.first_name}
        </div>
        <div className="text-sm text-gray-900 dark:text-slate-100">
          {cell.row.original.last_name}
        </div>
      </div>
    </div>

  )
}

export default workshopSpeakerColumns