import MentorshipRecruitmentForm from '@/components/forms/mentorship/MentorshipRecruitmentForm';

const page = () => {
  return (
    <main className=" p-4 md:p-10 min-h-screen flex flex-col justify-between gap-4 bg-gray-100 dark:bg-black">
      <h1 className="text-center text-2xl md:text-4xl font-bold text-primary-light">
        Postulación al programa de Mentoría AVAA
      </h1>
      <MentorshipRecruitmentForm />
    </main>
  );
};

export default page;
