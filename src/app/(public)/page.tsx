import Image from 'next/image'
import { Roboto } from 'next/font/google'
import Link from 'next/link'


const roboto = Roboto({ subsets: ["latin"], weight: ["400", "700"] })

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-16 lg:p-24 gap-16 bg-gradient-to-b from-emerald-950 to-slate-950">
      <div className="z-10 w-full max-w-5xl items-center justify-left font-mono text-sm ">
        <div className="bottom-0 left-0 flex h-48 w-full items-end justify-center lg:justify-end lg:static lg:h-auto lg:w-auto">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://www.avaa.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{' '}
            <Image
              src="/avaa.png"
              alt="AVAA Logo"
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className="relative flex place-items-center">
        <Image
          className="relative drop-shadow-[0_0_1rem_#279902] animate-pulse"
          src="/proexcelencia.png"
          alt="Logo Proexcelencia"
          width={380}
          height={50}
          priority
        />
      </div>

      <div className="mb-32 grid text-center lg:grid-cols-2 lg:text-left gap-6">
        <Link
          href="/signin/becario"
          className="relative bg-black group rounded-lg  px-5 py-4  border-emerald-900 border-2"
          rel="noopener noreferrer"
        >
          <h2 className={`${roboto.className} mb-3 text-2xl font-semibold`}>
            Becarios{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              <svg fill="none" stroke="currentColor" strokeWidth="1.5" width="50" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"></path>
              </svg>
            </span>
          </h2>
          <p
            className={`${roboto.className} m-0 max-w-[30ch] text-xs lg:text-sm opacity-50`}
          >
            Ingresa para ver tu progreso en el programa. 
          </p>
        </Link>

        <Link
          href="/signin/admin"
          className="relative bg-black group rounded-lg px-5 py-4 border-emerald-900 border-2"
          rel="noopener noreferrer"
        >
          <h2 className={`${roboto.className} mb-3 text-2xl font-semibold`}>
            Administradores{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              <svg fill="none" stroke="currentColor" strokeWidth="1.5" width="50" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"></path>
              </svg>
            </span>
          </h2>
          <p className={`${roboto.className} m-0 max-w-[30ch] text-xs lg:text-sm opacity-50`}>
            Administra el SEP 
          </p>
        </Link>
      </div>
    </main>
  )
}