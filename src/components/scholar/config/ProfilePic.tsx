'use client';
import { deleteBlob, uploadBlob } from '@/lib/azure/azure';
import { updateProfilePicture } from '@/lib/db/utils/users';
import { revalidateSpecificPath } from '@/lib/serverAction';
import { Avatar, Button } from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import { ChangeEvent } from 'react';
import { toast } from 'react-toastify';

interface ProfilePicProps {
  image: string | null;
  scholarId: string;
}

const uploadProfilePic = async (event: ChangeEvent<HTMLInputElement>, scholarId: string) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    let url: string = '';
    reader.onloadend = async function () {
      const base64String = reader.result;
      try {
        const response = await uploadBlob(base64String as string, file.type);
        url = response!;
        console.log('File uploaded to Azure Blob Storage');
      } catch (error) {
        console.error('Error uploading file: ', error);
      }
      try {
        await updateProfilePicture(scholarId, url);
        revalidateSpecificPath('/becario/configuracion');
      } catch (error) {
        console.error('Error saving the image ', error);
      }
    };
    reader.readAsDataURL(file);
  }
};

const deleteProfilePic = async (image: string, scholarId: string) => {
  await deleteBlob(image);
  await updateProfilePicture(scholarId, null);
  revalidateSpecificPath('/becario/configuracion');
};

const ProfilePic = (props: ProfilePicProps) => {
  const { update } = useSession();
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="w-32 h-32">
        <Avatar
          className="rounded-lg w-full h-full"
          src={props.image ? props.image : undefined}
          alt="profile picture"
        />
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-green-900 text-xl font-semibold dark:text-white">Foto de perfil</h3>
        <div className=" text-sm text-gray-500 dark:text-gray-400">Solo archivos JPG o PNG.</div>
        <div className="flex items-center space-x-4">
          <Button
            isDisabled={props.image ? true : false}
            className="text-white bg-green-600 hover:bg-green-500 hover:text-green-900 font-medium rounded-lg text-sm  text-center"
          >
            <label
              className=" py-2.5 w-full h-full flex gap-1 cursor-pointer"
              htmlFor="dropzone-file"
            >
              <svg
                className="w-4 h-4 mr-2 -ml-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z"></path>
                <path d="M9 13h2v5a1 1 0 11-2 0v-5z"></path>
              </svg>
              <input
                id="dropzone-file"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(event) => {
                  toast.promise(uploadProfilePic(event, props.scholarId), {
                    pending: 'Subiendo imagen...',
                    success: 'Imagen subida',
                    error: 'Error subiendo imagen',
                  });
                  update();
                }}
              />
              Subir Foto
            </label>
          </Button>
          <Button
            isDisabled={!props.image}
            onPress={async () => {
              toast.promise(deleteProfilePic(props.image, props.scholarId), {
                pending: 'Eliminando imagen...',
                success: 'Imagen eliminada',
                error: 'Error eliminando imagen',
              });
              update();
            }}
            id="delete-profile-pic"
            isIconOnly
            type="button"
            className="py-2 px-3 text-sm font-medium text-red-900 focus:outline-none bg-transparent rounded-lg border border-red-700 hover:bg-red-700 hover:text-white  dark:text-red-400 dark:border-red-600 dark:hover:text-white dark:hover:bg-red-700"
          >
            X
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePic;
