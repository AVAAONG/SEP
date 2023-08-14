'use client'

import { useState } from "react"

const ExpandTableButton = () => {
    const [isExpanded, toggleExpanded] = useState(false)
    return (
        <button
            onClick={() => toggleExpanded(isExpanded ? false : true)}
            className="w-full md:w-auto flex gap-2 items-center justify-center p-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10  dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            type="button"
        >
            {isExpanded ?
                <svg
                    className="w-5 h-5 text-green-500"
                    fill="currentColor"
                    version="1.1"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 92 92"
                    enable-background="new 0 0 92 92"
                    xmlSpace="preserve"
                >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                        <path id="XMLID_1129_" d="M88.4,83.2c1.6,1.6,1.6,4.1,0,5.7c-0.8,0.8-1.8,1.2-2.8,1.2c-1,0-2.1-0.4-2.9-1.2L61,67.2v10.3 c0,2.2-1.8,4-4,4c-2.2,0-4-1.8-4-4v-20c0-1.1,0.5-2.1,1.2-2.8c0.8-0.7,1.8-1.2,2.9-1.2h0l20,0c2.2,0,4,1.8,4,4s-1.8,4-4,4 c0,0,0,0,0,0l-10.3,0L88.4,83.2z M56.9,39h20c2.2,0,4-1.8,4-4c0-2.2-1.8-4-4-4H66.6L88.8,8.8c1.6-1.6,1.6-4.1,0-5.6 c-1.6-1.6-4.1-1.5-5.6,0L61,25.4V15.1c0-2.2-1.8-4.1-4-4.1h0c-2.2,0-4,1.8-4,4l0,20c0,1.1,0.4,2,1.2,2.8C54.9,38.6,55.9,39,56.9,39z M34.9,11.3c-2.2,0-3.9,1.8-3.9,4v10.3L8.9,3.5C7.3,2,4.8,2,3.2,3.5c-1.6,1.6-1.6,4,0,5.5l22,21.9H15v0.1c-2,0-4.1,1.9-4.1,4.1 c0,2.2,1.8,4,4,4l20,0v0c1,0,2-0.4,2.8-1.2c0.8-0.8,1.1-1.8,1.1-2.8l0-20C38.9,13.1,37.1,11.3,34.9,11.3z M34.7,53h-20 c-2.2,0-4,1.8-4,4c0,2.2,1.8,4,4,4H25L3.2,83c-1.6,1.6-1.6,4.2,0,5.7C4,89.5,5,89.9,6.1,89.9c1,0,2.2-0.4,3-1.2L31,67v10.3 c0,2.2,1.6,3.7,3.8,3.7h-0.1c2.2,0,4-1.6,4-3.8l0-19.9c0-1.1-0.4-2.2-1.2-3C36.8,53.5,35.8,53,34.7,53z">
                        </path>
                    </g>
                </svg>
                :
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-green-500" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0">
                </g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                        <path d="M16 8L21 3M21 3H16M21 3V8M8 8L3 3M3 3L3 8M3 3L8 3M8 16L3 21M3 21H8M3 21L3 16M16 16L21 21M21 21V16M21 21H16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        </path>
                    </g>
                </svg>
            }

        </button>
    )
}

export default ExpandTableButton