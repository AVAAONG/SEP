import { chatIcon, volunterIcon, workshopIcon } from '@/assets/svgs'
import Card from '@/components/dashboard/Card'
import ActivityList from '@/components/scholar/dashboard/ActivityList'
import { SUUID } from 'short-uuid'
import Calendar from '@/components/calendar/Calendar'
import { BigCalendarEventType } from '@/types/Calendar'

const examples = [
  {
    title: 'All Day Event very long title',
    startHour: "4:00PM",
    date: "13/07/2023",
    kindOfActivity: "volunteering",
    speaker: "Kevin Bravo",
  }
]

const ExampleEvents: BigCalendarEventType[] = [
  {
    title: 'All Day Event very long title',
    start: new Date(2023, 7, 13),
    end: new Date(2023, 7, 13),
    allDay: true,
  }
]



const page = async ({ params }: { params: { scholarId: SUUID } }) => {
  const CARD_CONTENT = [
    {
      icon: workshopIcon,
      text: "Talleres realizados",
      number: 23,
      bg: "bg-gradient-to-r from-blue-700  to-indigo-900",
      cardButtonBg: "bg-indigo-950 active:bg-blue-700 hover:bg-blue-700"
    },
    {
      icon: chatIcon,
      text: "Chats Realizados",
      number: 23,
      bg: "bg-gradient-to-r from-red-500  to-red-900",
      cardButtonBg: "bg-indigo-950 active:bg-blue-700"

    },
    {
      icon: volunterIcon,
      text: "Horas de voluntariado realizadas",
      number: 0,
      bg: " from-green-600  to-emerald-800",
      cardButtonBg: "bg-indigo-950 active:bg-blue-700"

    },
  ]
  return (
    <div>
      <div className="flex flex-col px-2 pt-6 gap-4">
        <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">Hola, Kevin! 💚</h1>
        <div className="mb-4 flex flex-col sm:flex-row  gap-4 xl:mb-2">
          {CARD_CONTENT.map(({ icon, text, number, bg, cardButtonBg }) => {
            return (
              <Card key={text} stat={number} Icon={icon} text={text} bg={bg} cardButtonBg={cardButtonBg} />
            )
          })}
        </div>
        <div className='flex flex-col lg:flex-row gap-4 '>
          <div className='h-full max-h-[600px] min-h-screen text-gray-800 capitalize dark:text-gray-300 shadow-sm overflow-x-clip w-full bg-white border border-gray-200  shadow-emerald-600 dark:border-emerald-800  dark:bg-slate-950 rounded-md bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-40 p-2'>
            <Calendar events={ExampleEvents}  />
          </div>
          <div className="w-full lg:w-2/5 p-4 sm:p-6 bg-white border border-gray-200 rounded-lg shadow-sm shadow-emerald-600 dark:border-emerald-800  dark:bg-slate-950">
            <ActivityList activityList={examples} />
          </div>
        </div>


      </div>
    </div >
  )
}

export default page