'use client';
import AdminUsersList from '@/components/admin/AdminUsersList';
import AdminCreationForm from '@/components/admin/forms/AdminCreationForm';
import { createAdminProfileUser, deleteAdmin, getAdminsProfiles } from '@/lib/db/utils/admins';
import { uploadImageToImgur } from '@/lib/imgurUpload';
import createSEPOnboardingMessage from '@/lib/mailMessages/sepOnboardingMessage';
import sendEmailWithDevAccount from '@/lib/sendEmails';
import { AdminProfile } from '@prisma/client';
import { BaseSyntheticEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const page = () => {
  const { register, handleSubmit, reset } = useForm<AdminProfile>();
  const [image, setImage] = useState<File | null>(null);
  const [adminProfiles, setAdminProfile] = useState<AdminProfile[] | null>(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getAdminsProfiles().then((data) => {
      setAdminProfile(data);
      setLoading(false);
    });
  }, [adminProfiles]);

  const createAdmin = async (
    data: AdminProfile,
    event: BaseSyntheticEvent<object, any, any> | undefined
  ) => {
    if (event === undefined) return;
    event.preventDefault();
    let imageLink;
    if (image) imageLink = await uploadImageToImgur(image!);
    else imageLink = null;
    data.profileImage = imageLink;
    await createAdminProfileUser(data);
    const onboardingMessage = createSEPOnboardingMessage(data.gender, data.profileName);
    await sendEmailWithDevAccount(data.profileName, onboardingMessage, data.allowedEmail);
    reset();
  };
  const deleteAdmins = async (inputId: string) => {
    await deleteAdmin(inputId);
  };

  const handleImageChange = (event: BaseSyntheticEvent<object, any, any>) =>
    setImage(event.target.files[0]);

  const editAdmin = (inputId: string) => {
    const adminUser = adminProfiles?.filter((admin: AdminProfile) => admin.id === inputId);
    if (adminUser === undefined) return;
    reset({ ...adminUser[0] });
  };

  return (
    <section className="w-full h-screen">
      <div className="flex flex-col sm:flex-row justify-start w-full gap-8 mt-16 p-8">
        <AdminCreationForm
          createAdmin={createAdmin}
          register={register}
          handleSubmit={handleSubmit}
          handleImageChange={handleImageChange}
          image={image}
        />
        <div className=" w-full sm:w-1/2  flex flex-col items-center gap-4 h-full">
          <h1 className="text-xl font-semibold text-gray-900 mt-16 sm:text-2xl dark:text-white mb-4">
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
