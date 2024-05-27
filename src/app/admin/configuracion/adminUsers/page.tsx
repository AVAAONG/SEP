'use client';
import AdminUsersList from '@/components/admin/AdminUsersList';
import AdminCreationForm from '@/components/admin/forms/AdminCreationForm';
import { uploadBlob } from '@/lib/azure/azure';
import {
  createAdminProfileUser,
  deleteAdmin,
  deleteadminProfile,
  getAdminsProfiles,
} from '@/lib/db/utils/admins';
import { updateAdminProfilePicture } from '@/lib/db/utils/users';
import createSEPOnboardingMessage from '@/lib/mailMessages/sepOnboardingMessage';
import sendEmailWithDevAccount from '@/lib/sendEmails';
import { revalidateSpecificPath } from '@/lib/serverAction';
import { AdminProfile } from '@prisma/client';
import { nanoid } from 'nanoid';
import { BaseSyntheticEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const uploadProfilePic = async (file: File, scholarId: string) => {
  if (file) {
    const reader = new FileReader();
    let url: string = '';
    reader.onloadend = async function () {
      const base64String = reader.result;
      try {
        const response = await uploadBlob(base64String as string, 'picture');
        url = response!;
        console.log('File uploaded to Azure Blob Storage');
      } catch (error) {
        console.error('Error uploading file: ', error);
      }
      try {
        await updateAdminProfilePicture(scholarId, url);
        revalidateSpecificPath('/admin/');
      } catch (error) {
        console.error('Error saving the image ', error);
      }
    };
    reader.readAsDataURL(file);
  }
};

const page = () => {
  const { register, handleSubmit, reset, watch } = useForm<AdminProfile>({
    mode: 'onChange',
  });
  const email = watch('allowedEmail');

  const [image, setImage] = useState<File | null>(null);
  const [adminProfiles, setAdminProfile] = useState<AdminProfile[] | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const deleteAdmins = async (inputId: string) => {
    await deleteAdmin(inputId);
    revalidateSpecificPath('/admin/configuracion/adminUsers');
  };
  useEffect(() => {
    getAdminsProfiles().then((data) => {
      setAdminProfile(data);
    });
  }, [isCreating, deleteAdmins]);

  const createAdmin = async (
    data: AdminProfile,
    event: BaseSyntheticEvent<object, any, any> | undefined
  ) => {
    if (event === undefined) return;
    event.preventDefault();
    setIsCreating(true);
    let id = nanoid();

    data.id = id;
    data.profileName = data.profileName.trim();
    data.profilePic = '';
    const name = data.profileName.split(' ')[0];
    if (adminProfiles?.some((profile) => profile.allowedEmail === data.allowedEmail)) {
      setIsCreating(false);
      return alert('El correo que introduciste ya lo posee otro administrador.');
    }
    await createAdminProfileUser(data);
    await uploadProfilePic(image, id);
    const onboardingMessage = createSEPOnboardingMessage(data.gender, name);
    await sendEmailWithDevAccount(name, onboardingMessage, data.allowedEmail, data.gender);
    reset();
    setIsCreating(false);
    revalidateSpecificPath('/admin/configuracion/adminUsers');
  };

  const handleImageChange = (event: BaseSyntheticEvent<object, any, any>) => {
    setImage(event.target.files[0]);
  };

  const editAdmin = async (inputId: string) => {
    const adminUserToEdit = adminProfiles?.filter((admin: AdminProfile) => admin.id === inputId);
    await deleteadminProfile(inputId);
    if (adminUserToEdit === undefined) return;
    reset({ ...adminUserToEdit[0] });
  };

  return (
    <section className="w-full min-h-screen">
      <div className="flex flex-col md:flex-row justify-start w-full gap-8 xl:mt-16 p-4 md:p-8">
        <AdminCreationForm
          createAdmin={createAdmin}
          register={register}
          handleSubmit={handleSubmit}
          handleImageChange={handleImageChange}
          image={image}
          isCreating={isCreating}
        />
        <div className=" w-full md:w-1/2 flex flex-col items-center gap-4 h-full">
          <h1 className="text-xl font-semibold text-gray-900 md:text-2xl dark:text-white mb-4">
            Administradores del SEP
          </h1>
          <AdminUsersList
            adminUsers={adminProfiles}
            editUser={editAdmin}
            deleteUser={deleteAdmins}
          />
        </div>
      </div>
    </section>
  );
};

export default page;
