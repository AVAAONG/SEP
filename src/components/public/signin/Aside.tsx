import Image from 'next/image'

const Aside = () => {
  return (
    <section className="flex items-center  w-full px-4 mx-auto md:px-0 md:items-center md:w-1/3">
      <div className="flex flex-col items-center w-full max-w-sm py-4 mx-auto md:mx-0 my-auto min-w-min relative md:-left-2.5 pt-4 md:py-4 transform origin-left md:gap-44">
        <hr className="hidden md:block w-full h-px my-8  border-0 bg-emerald-700 opacity-75 rotate-90 -translate-x-36 " />
        <div className="flex items-center space-x-1 -translate-x-10 relative drop-shadow-[0_0_1rem_#279902]">
          <Image src='/logo-proexcelencia-cap.png' alt='Proexcelencia Logo' width={80} height={80}></Image>
          <Image src='/logo-proexcelencia-words.png' alt='Proexcelencia Logo' width={200} height={100} className='animate-pulse'></Image>
        </div>
        <hr className="hidden w-full overflow-hidden -z-10 md:block  h-px my-8  border-0 bg-emerald-700 opacity-75 rotate-90 -translate-x-36" />
      </div>
    </section>
  )
}

export default Aside