import React from 'react'

interface MentoringProps {
    avaaYear: number,
    image: string,
}

const Mentoring = (props: MentoringProps) => {
    const { avaaYear, image } = props

    return (
        <div className="flow-root">
            <h3 className="text-xl font-semibold dark:text-white">Mentoria</h3>
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                <li className="py-4">
                    {
                        avaaYear > 3 ?
                            <div className="flex items-center space-x-4 ">
                                <div className="flex-shrink-0 mt-4">
                                    {<img className="mb-4 rounded-lg w-28 h-28 sm:mb-0 xl:mb-4 2xl:mb-0" src={props.image!!} alt="profile picture" />
                                        &&
                                        <svg className="mb-4 rounded-lg w-14 h-14 sm:mb-0 xl:mb-4 2xl:mb-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
                                    }
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-base font-semibold text-gray-900 truncate dark:text-white">
                                        Nombre del mentor
                                    </p>
                                    <p className="text-sm font-normal text-gray-500 truncate dark:text-gray-400">
                                        Trabajo actual del mentor
                                    </p>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-base font-semibold text-gray-900 truncate dark:text-white">
                                        Ultima reunion con el Mentor
                                    </p>
                                    <p className="text-sm font-normal text-gray-500 truncate dark:text-gray-400">
                                        19/03/23032
                                    </p>
                                </div>
                                <div className="inline-flex items-center">
                                    <a href="#" className="px-3 py-2 mb-3 mr-3 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-primary-300 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">informacion importante</a>
                                </div>
                                <div className="inline-flex items-center">
                                    <a href="#" className="px-3 py-2 mb-3 mr-3 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-primary-300 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">informacion importante</a>
                                </div>
                            </div>
                            : <div className="flex items-center space-x-4 ">
                                <p>Aun no puedes estar con un mentor ya que te encuentras en el {avaaYear} año del programa</p>
                            </div>
                    }
                </li>

            </ul>
        </div>
    )
}

export default Mentoring