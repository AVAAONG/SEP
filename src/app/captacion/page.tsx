import AdmisionOptions from '@/components/public/admision/landing/AdmisionOptions';
import Contact from '@/components/public/admision/landing/Contact';
import Hero from '@/components/public/admision/landing/Hero';
import Requirements from '@/components/public/admision/landing/Requirements';
import Navbar from '@/components/public/admision/Navbar';

const page = () => (
  <>
    <Navbar showProfileDropdown={false} email="" />
    <main className="p-2 md:p-16 lg:p-24">
      <Hero />
      <AdmisionOptions title="Selecciona el Capítulo" />
      <Requirements />
      <div className="py-12 md:py-0"></div>
      <Contact />
      <AdmisionOptions title="¡Aplica al programa!" />
    </main>
  </>
);

export default page;
