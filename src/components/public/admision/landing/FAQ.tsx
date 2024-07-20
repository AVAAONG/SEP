import FAQAccordion from "@/components/admission/landing/FAQAccordion";

const FAQ = () => {
  return (
    <section className="min-h-screen w-full flex flex-col items-center gap-16 p-24" id="requisitos">
      <div className="space-y-2 w-1/2 ">
        <h2 className="text-primary-light z text-3xl font-bold tracking-tighter text-center sm:text-4xl md:text-5xl ">
          Preguntas frecuentes
        </h2>
      </div>
      <FAQAccordion />
    </section>
  );
};

export default FAQ;
