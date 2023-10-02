import AdminCreationForm from '@/components/admin/forms/AdminCreationForm';
import { getAdminsProfiles } from '@/lib/db/utils/admins';
import { prisma } from '@/lib/db/utils/prisma';

const page = async () => {
  const adminUsers = await getAdminsProfiles();
  await prisma.adminUser.deleteMany();
  return (
    <section className="w-full h-screen">
      <div className="flex flex-col sm:flex-row justify-start w-full gap-8 mt-16 p-8">
        <AdminCreationForm />
        <div className=" w-full sm:w-1/2  flex flex-col items-center gap-4 h-full">
          <h1 className="text-xl font-semibold text-gray-900 mt-16 sm:text-2xl dark:text-white mb-4">
            Administradores del SEP
          </h1>
          {/* <AdminUsersList adminUsers={adminUsers} /> */}
        </div>
      </div>
    </section>
  );
};

export default page;
