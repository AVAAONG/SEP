/**
 * @file This is the main page of the application.
 * @author Kevin Bravo (kevinbravo.me)
 */

import AdmisionOptions from '@/components/public/admision/landing/AdmisionOptions';
import Contact from '@/components/public/admision/landing/Contact';
import FAQ from '@/components/public/admision/landing/FAQ';
import Hero from '@/components/public/admision/landing/Hero';
import Requirements from '@/components/public/admision/landing/Requirements';

const page = () => (
  <main className="dark:bg-dark bg-gray-100 flex  flex-col w-full items-center justify-between  overflow-y-clip">
    <Hero />
    <Requirements />
    <AdmisionOptions title="Selecciona el Capítulo" />
    <Contact />
    <FAQ />
    <div className="dark:bg-black bg-white w-full">
      <AdmisionOptions title="¡Aplica al programa!" />
    </div>
  </main>
);

export default page;
