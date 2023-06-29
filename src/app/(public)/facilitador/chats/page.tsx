import React from 'react'
import Image from 'next/image'

import { chatIcon, workshopIcon, Star, Point } from '@/assets/svgs'
import NormalCard from '@/components/card/NormalCard'

const CARD_CONTENT = [
    {
        icon: workshopIcon,
        text: "Chats realizados",
        number: 15,
        bg: "bg-gradient-to-r from-blue-700  to-indigo-900",
        cardButtonBg: "bg-indigo-950 active:bg-blue-700 hover:bg-blue-700"
    },
    {
        icon: chatIcon,
        text: "Total de becarios unicos",
        number: 20,
        bg: "bg-gradient-to-r from-red-500  to-red-900",
        cardButtonBg: "bg-indigo-950 active:bg-blue-700"

    },
    {
        icon: Star,
        text: "Calificación promedio",
        number: 4.5,
        bg: "from-yellow-500  to-yellow-700",
        cardButtonBg: "bg-indigo-950 active:bg-blue-700 hover:bg-blue-700"
    },
]


const TEMPORAL_DATA = [
    {
        id:1,
        chatName: "Two experience at the US",
        kindOfChat: "Virtual",
        chatDate: "14/04/2023",
        level: "Basico",
        scholars: 10,
    },
    {
        id: 2,
        chatName: "Let's learn grammar thogether",
        kindOfChat: "Presencial",
        chatDate: "14/04/2023",
        level: "Intermedio",
        scholars: 15,
    },
    {
        id: 3,
        chatName: "Let's learn grammar thogether",
        kindOfChat: "Presencial",
        chatDate: "14/04/2023",
        level: "Intermedio",
        scholars: 8,
    },
    {
        id: 4,
        chatName: "The ABC",
        kindOfChat: "Presencial",
        chatDate: "14/04/2023",
        level: "Intermedio",
        scholars: 9,
    },
    {
        id:5,
        chatName: "How to be a good leader",
        kindOfChat: "Presencial",
        chatDate: "14/04/2023",
        level: "Intermedio",
        scholars: 7,
    },

]

const page = () => {
    return (
        <main >
            <section className="bg-slate-950 flex flex-col lg:flex-row min-h-screen">
                <div className="bg-gradient-to-b from-emerald-950 to-slate-950 w-full lg:w-1/4 lg:min-h-screen shadow-2xl flex flex-col lg:justify-start items-center gap-4  lg:px-4">
                    <div className="flex flex-col gap-4 justify-center items-center mt-14 mb-8 sm:flex-row lg:flex-col md:max-w-min">
                        <div className='w-52 flex items-center justify-center sm:w-max rounded-full  shadow-2xl border-4 border-white p-1'>
                            <Image
                                src="https://media.licdn.com/dms/image/D4E03AQHmoaa1u1tn1g/profile-displayphoto-shrink_800_800/0/1681582874013?e=2147483647&v=beta&t=UoLUkXLZTauN5CsW8p-7ETy8WNSQwZiPOzp97WN66D0"
                                alt="Imagen del facilitador"
                                width={250}
                                height={250}
                                priority
                                className='rounded-full'
                            />
                        </div>
                        <div className="flex flex-col justify-center items-center gap-2 sm:gap-1 sm:justify-start sm:items-start ">
                            <h1 className='text-3xl text-green-700 font-bold '>
                                Atenea Giménez
                            </h1>
                            <p className=''>
                                Facilitador Chats Clubs de Ingléss
                            </p>
                            <div className="flex  w-full gap-6 text-center opacity-50 justify-center sm:justify-start lg:hidden ">
                                <a href="https://twitter.com/avaa_org" target="_blank" rel="noreferrer">
                                    <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="twitter" className="inline-block h-5 hover:text-green-600 hover:opacity-100 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path></svg>
                                </a>
                                <a href="https://www.youtube.com/@avaa_org/" target="_blank" rel="noreferrer">
                                    <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="youtube" className="inline-block  h-5 hover:text-green-600 hover:opacity-100" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"></path></svg>
                                </a>
                                <a href="https://www.instagram.com/avaa_org/" target="_blank" rel="noreferrer">
                                    <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="instagram" className="inline-block h-5 hover:text-green-600 hover:opacity-100" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path></svg>
                                </a>
                                <a href="https://www.linkedin.com/company/avaa/?originalSubdomain=ve" target="_blank" rel="noreferrer">
                                    <svg viewBox="0 0 20 20" version="1.1" focusable="false" xmlns="http://www.w3.org/2000/svg" className="inline-block h-5 hover:text-green-600 hover:opacity-100" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>linkedin [#ffffff]</title><g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-180.000000, -7479.000000)" fill="#ffffff"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M144,7339 L140,7339 L140,7332.001 C140,7330.081 139.153,7329.01 137.634,7329.01 C135.981,7329.01 135,7330.126 135,7332.001 L135,7339 L131,7339 L131,7326 L135,7326 L135,7327.462 C135,7327.462 136.255,7325.26 139.083,7325.26 C141.912,7325.26 144,7326.986 144,7330.558 L144,7339 L144,7339 Z M126.442,7323.921 C125.093,7323.921 124,7322.819 124,7321.46 C124,7320.102 125.093,7319 126.442,7319 C127.79,7319 128.883,7320.102 128.883,7321.46 C128.884,7322.819 127.79,7323.921 126.442,7323.921 L126.442,7323.921 Z M124,7339 L129,7339 L129,7326 L124,7326 L124,7339 Z" id="linkedin-[#ffffff]"> </path> </g> </g> </g> </g></svg>
                                </a>
                                <a href="https://www.facebook.com/avaa.org" target="_blank" rel="noreferrer">
                                    <svg viewBox="-5 0 20 20" version="1.1" focusable="false" xmlns="http://www.w3.org/2000/svg" className="inline-block h-5 hover:text-green-600 hover:opacity-100" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#ffffff" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <defs> </defs> <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-385.000000, -7399.000000)" fill="#ffffff"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M335.821282,7259 L335.821282,7250 L338.553693,7250 L339,7246 L335.821282,7246 L335.821282,7244.052 C335.821282,7243.022 335.847593,7242 337.286884,7242 L338.744689,7242 L338.744689,7239.14 C338.744689,7239.097 337.492497,7239 336.225687,7239 C333.580004,7239 331.923407,7240.657 331.923407,7243.7 L331.923407,7246 L329,7246 L329,7250 L331.923407,7250 L331.923407,7259 L335.821282,7259 Z" id="facebook-[#ffffff]"> </path> </g> </g> </g> </g></svg>
                                </a>
                            </div>
                            <div className="text-white flex italic lg:hidden text-center sm:text-start px-4 sm:px-0">
                                <span className='opacity-60 text-sm'>
                                    Atenea es estudiante de estudios internacionales en la Universidad Central de Venezuela (UCV)
                                </span>
                            </div>
                        </div>
                        <div className=" flex gap-2 items-center sm:w-56 sm:flex-col lg:hidden">
                            <p className='text-lg font-bold'>
                                Logros
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <a href="/mustafinho?achievement=yolo&amp;tab=achievements" className="w-10 lg:w-16 ">
                                    <img src="https://github.githubassets.com/images/modules/profile/achievements/yolo-default.png" data-hovercard-type="achievement" data-hovercard-url="/users/mustafinho/achievements/yolo/detail?hovercard=1" alt="Achievement: YOLO" data-view-component="true" className="achievement-badge-sidebar" />
                                </a>
                                <a href="/mustafinho?achievement=pull-shark&amp;tab=achievements" className="w-10 lg:w-16 ">
                                    <img src="https://github.githubassets.com/images/modules/profile/achievements/pull-shark-default.png" data-hovercard-type="achievement" data-hovercard-url="/users/mustafinho/achievements/pull-shark/detail?hovercard=1" alt="Achievement: Pull Shark" data-view-component="true" className="achievement-badge-sidebar" />
                                </a>                                <a href="/mustafinho?achievement=pull-shark&amp;tab=achievements" className="w-10 lg:w-16 ">
                                    <img src="https://github.githubassets.com/images/modules/profile/achievements/pull-shark-default.png" data-hovercard-type="achievement" data-hovercard-url="/users/mustafinho/achievements/pull-shark/detail?hovercard=1" alt="Achievement: Pull Shark" data-view-component="true" className="achievement-badge-sidebar" />
                                </a>
                                <a href="/mustafinho?achievement=pull-shark&amp;tab=achievements" className="w-10 lg:w-16 ">
                                    <img src="https://i.imgur.com/avelT4I.png" data-hovercard-type="achievement" data-hovercard-url="/users/mustafinho/achievements/pull-shark/detail?hovercard=1" alt="Achievement: Pull Shark" data-view-component="true" className="achievement-badge-sidebar" />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="hidden lg:flex  w-full justify-center gap-6  text-center opacity-50">
                        <a href="https://twitter.com/avaa_org" target="_blank" rel="noreferrer">
                            <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="twitter" className="inline-block h-5 hover:text-green-600 hover:opacity-100 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path></svg>
                        </a>
                        <a href="https://www.youtube.com/@avaa_org/" target="_blank" rel="noreferrer">
                            <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="youtube" className="inline-block  h-5 hover:text-green-600 hover:opacity-100" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"></path></svg>
                        </a>
                        <a href="https://www.instagram.com/avaa_org/" target="_blank" rel="noreferrer">
                            <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="instagram" className="inline-block h-5 hover:text-green-600 hover:opacity-100" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path></svg>
                        </a>
                        <a href="https://www.linkedin.com/company/avaa/?originalSubdomain=ve" target="_blank" rel="noreferrer">
                            <svg viewBox="0 0 20 20" version="1.1" focusable="false" xmlns="http://www.w3.org/2000/svg" className="inline-block h-5 hover:text-green-600 hover:opacity-100" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>linkedin [#ffffff]</title><g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-180.000000, -7479.000000)" fill="#ffffff"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M144,7339 L140,7339 L140,7332.001 C140,7330.081 139.153,7329.01 137.634,7329.01 C135.981,7329.01 135,7330.126 135,7332.001 L135,7339 L131,7339 L131,7326 L135,7326 L135,7327.462 C135,7327.462 136.255,7325.26 139.083,7325.26 C141.912,7325.26 144,7326.986 144,7330.558 L144,7339 L144,7339 Z M126.442,7323.921 C125.093,7323.921 124,7322.819 124,7321.46 C124,7320.102 125.093,7319 126.442,7319 C127.79,7319 128.883,7320.102 128.883,7321.46 C128.884,7322.819 127.79,7323.921 126.442,7323.921 L126.442,7323.921 Z M124,7339 L129,7339 L129,7326 L124,7326 L124,7339 Z" id="linkedin-[#ffffff]"> </path> </g> </g> </g> </g></svg>
                        </a>
                        <a href="https://www.facebook.com/avaa.org" target="_blank" rel="noreferrer">
                            <svg viewBox="-5 0 20 20" version="1.1" focusable="false" xmlns="http://www.w3.org/2000/svg" className="inline-block h-5 hover:text-green-600 hover:opacity-100" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#ffffff" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <defs> </defs> <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-385.000000, -7399.000000)" fill="#ffffff"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M335.821282,7259 L335.821282,7250 L338.553693,7250 L339,7246 L335.821282,7246 L335.821282,7244.052 C335.821282,7243.022 335.847593,7242 337.286884,7242 L338.744689,7242 L338.744689,7239.14 C338.744689,7239.097 337.492497,7239 336.225687,7239 C333.580004,7239 331.923407,7240.657 331.923407,7243.7 L331.923407,7246 L329,7246 L329,7250 L331.923407,7250 L331.923407,7259 L335.821282,7259 Z" id="facebook-[#ffffff]"> </path> </g> </g> </g> </g></svg>
                        </a>
                    </div>
                    <div className="text-white text-center hidden lg:flex ">
                        <span className='opacity-60 text-sm'>
                            Atenea es estudiante de estudios internacionales en la Universidad Central de Venezuela (UCV)
                        </span>
                    </div>
                    <div className="hidden border-t-2 border-emerald-950 w-full lg:flex flex-col gap-2">
                        <p className='text-lg font-bold'>
                            Logros
                        </p>
                        <div className="flex gap-2">
                            <a href="/mustafinho?achievement=yolo&amp;tab=achievements" className="position-relative">
                                <img src="https://github.githubassets.com/images/modules/profile/achievements/yolo-default.png" data-hovercard-type="achievement" data-hovercard-url="/users/mustafinho/achievements/yolo/detail?hovercard=1" width="64" alt="Achievement: YOLO" data-view-component="true" className="achievement-badge-sidebar" />
                            </a>
                            <a href="/mustafinho?achievement=pull-shark&amp;tab=achievements" className="position-relative">
                                <img src="https://github.githubassets.com/images/modules/profile/achievements/pull-shark-default.png" data-hovercard-type="achievement" data-hovercard-url="/users/mustafinho/achievements/pull-shark/detail?hovercard=1" width="64" alt="Achievement: Pull Shark" data-view-component="true" className="achievement-badge-sidebar" />
                            </a>
                            <a href="/mustafinho?achievement=pull-shark&amp;tab=achievements" className="w-10 lg:w-20 ">
                                <img src="https://i.imgur.com/avelT4I.png" data-hovercard-type="achievement" data-hovercard-url="/users/mustafinho/achievements/pull-shark/detail?hovercard=1" alt="Achievement: Pull Shark" data-view-component="true" className="achievement-badge-sidebar" />
                            </a>
                        </div>
                    </div>

                </div>
                <div className="flex flex-col min-h-screen justify-center items-center w-full lg:w-3/4">
                    <div className="w-[95%] flex gap-2 justify-center items-center h-28">
                        {CARD_CONTENT.map(({ icon, text, number, bg }) => {
                            return (
                                <NormalCard key={text} stat={number} Icon={icon} text={text} bg={bg} />
                            )
                        })}
                    </div>
                    <div className="overflow-x-scroll md:overflow-x-clip rounded-lg w-[95%] mb-8 mt-16 scroll ">
                        <table className="w-full text-sm text-left text-gray-300 bg-gradient-to-b from-emerald-950 to-slate-950">
                            <thead className="text-xs text-green-500 uppercase bg-transparent text-center border-b-2 border-green-600">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Chat
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Tipo de chat
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Nivel de chat
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Fecha en que se realizó
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Becarios beneficiados
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Calificacion obtenida
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    TEMPORAL_DATA.map(({ chatName, level, chatDate, kindOfChat, scholars, id }) => {
                                        return (
                                            <tr className="border-b bg-transparent border-gray-700 hover:bg-green-700 hover:text-white text-center" key={id}>
                                                <th scope="row" className="px-6 py-4 font-medium  whitespace-nowrap text-white">
                                                    {chatName}
                                                </th>
                                                <td className="px-6 py-4">
                                                    {kindOfChat}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {level}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {chatDate}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {scholars}
                                                </td>
                                                <td className="px-6 py-4 w-1">
                                                    <svg aria-hidden="true" className="w-5 h-5 text-yellow-400 inline" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                                    <svg aria-hidden="true" className="w-5 h-5 text-yellow-400 inline" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Second star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                                    <svg aria-hidden="true" className="w-5 h-5 text-yellow-400 inline" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Third star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                                    <svg aria-hidden="true" className="w-5 h-5 text-yellow-400 inline" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fourth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                                    {/* <svg aria-hidden="true" className="w-5 h-5 text-gray-500 inline" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fifth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg> */}
                                                </td>
                                            </tr>
                                        )
                                    })
                                }

                            </tbody>
                        </table>
                        <nav className="flex items-center justify-between pt-4" aria-label="Table navigation">
                            {/* <span className="text-sm font-normal text-gray-500 dark:text-gray-400">Showing <span className="font-semibold text-gray-900 dark:text-white">1-10</span> of <span className="font-semibold text-gray-900 dark:text-white">1000</span></span> */}
                            <ul className="inline-flex items-center -space-x-px">
                                <li>
                                    <a href="#" className="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                        <span className="sr-only">Previous</span>
                                        <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
                                </li>
                                <li>
                                    <a href="#" className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
                                </li>
                                <li>
                                    <a href="#" aria-current="page" className="z-10 px-3 py-2 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
                                </li>
                                <li>
                                    <a href="#" className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">...</a>
                                </li>
                                <li>
                                    <a href="#" className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">100</a>
                                </li>
                                <li>
                                    <a href="#" className="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                        <span className="sr-only">Next</span>
                                        <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>

                </div>
            </section>
        </main >
    )
}

export default page