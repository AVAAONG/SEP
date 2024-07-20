'use client';

import { ReactNode } from "react";

const ContactBox = ({ name, contact, subtitle, children, url }: { name: string, contact: string, subtitle: string, children: ReactNode, url?: string }) => (
    <div className="relative group col-span-2 md:col-span-1 flex flex-col items-center gap-1 border-1 border-gray-400 p-4 rounded-lg w-[350px]">
        {children}
        <p className="font-bold">{name}</p>
        <p className="text-gray-500 text-center">{contact}</p>
        <button onClick={url ? () => window.open(url) : () => null} className=" hover:font-bold flex text-center items-center gap-2">
            {subtitle}
            <span className="inline-block  transition-transform group-hover:translate-x-2 motion-reduce:transform-none ">
                <svg
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    width="30"
                    height="20"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                    ></path>
                </svg>
            </span>
        </button>
    </div>
)

export default ContactBox;