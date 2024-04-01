'use client';
import AdminUsersList from '@/components/admin/AdminUsersList';
import AdminCreationForm from '@/components/admin/forms/AdminCreationForm';
import {
  createAdminProfileUser,
  deleteAdmin,
  deleteadminProfile,
  getAdminsProfiles,
} from '@/lib/db/utils/admins';
import createSEPOnboardingMessage from '@/lib/mailMessages/sepOnboardingMessage';
import sendEmailWithDevAccount from '@/lib/sendEmails';
import { AdminProfile } from '@prisma/client';
import { BaseSyntheticEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const page = () => {
  const { register, handleSubmit, reset, watch } = useForm<AdminProfile>({
    mode: 'onChange',
  });
  const email = watch('allowedEmail');

  const [image, setImage] = useState<File | null>(null);
  const [adminProfiles, setAdminProfile] = useState<AdminProfile[] | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    getAdminsProfiles().then((data) => {
      setAdminProfile(data);
    });
  }, []);

  const createAdmin = async (
    data: AdminProfile,
    event: BaseSyntheticEvent<object, any, any> | undefined
  ) => {
    if (event === undefined) return;
    event.preventDefault();
    setIsCreating(true);
    let imageLink;
    if (image) imageLink = '';
    else imageLink = null;
    data.profilePic = imageLink || '';
    data.profileName = data.profileName.trim();
    const name = data.profileName.split(' ')[0];
    if (adminProfiles?.some((profile) => profile.allowedEmail === data.allowedEmail)) {
      setIsCreating(false);
      return alert('El correo que introduciste ya lo posee otro administrador.');
    }
    await createAdminProfileUser(data);
    const onboardingMessage = createSEPOnboardingMessage(data.gender, name);
    await sendEmailWithDevAccount(name, onboardingMessage, data.allowedEmail, data.gender);
    reset();
    setIsCreating(false);
  };
  const deleteAdmins = async (inputId: string) => {
    await deleteAdmin(inputId);
  };

  const handleImageChange = (event: BaseSyntheticEvent<object, any, any>) =>
    setImage(event.target.files[0]);

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
