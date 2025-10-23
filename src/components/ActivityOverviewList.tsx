'use client'
import {
    getActivityKind,
    getActivityLink,
    getActivityStartDate,
    groupActivitiesByTimeline,
} from '@/lib/utils/activityCategorization';
import { Accordion, AccordionItem, } from '@nextui-org/accordion';
import { Card, CardBody, CardHeader } from '@nextui-org/card';
import { Divider } from '@nextui-org/divider';
import { Tooltip } from '@nextui-org/tooltip';
import { Chat, Volunteer, Workshop } from '@prisma/client';
import Link from 'next/link';
import DisplayDate from './DisplayDate';
import DisplayTime from './DisplayTime';
import ActivityListIcon from './scholar/dashboard/ActivityListIcon';

const ActivityOverviewList = ({ activities, height = 360 }: { activities: (Workshop | Chat | Volunteer)[]; height?: number | string }) => {
    const now = new Date();
    const relativeTimeFormatter = new Intl.RelativeTimeFormat('es', { numeric: 'auto' });
    const { overdue, upcomingSoon, upcomingLater } = groupActivitiesByTimeline(activities, {
        now,
        daysForSoon: 7,
    });

    const sections = [
        {
            id: 'overdue',
            title: 'Pendiente de asistencia',
            description: 'Actividades ya ocurridas.',
            badgeClass: 'bg-gray-100 text-gray-700 dark:bg-gray-900/60 dark:text-gray-200 border border-gray-200/60 dark:border-gray-800/60',
            relativeClass: 'text-yellow-600 dark:text-yellow-400',
            activities: overdue,
        },
        {
            id: 'upcomingSoon',
            title: 'Próximos 7 días',
            description: 'Actividades próximas',
            badgeClass: 'bg-gray-100 text-gray-700 dark:bg-gray-900/60 dark:text-gray-200 border border-gray-200/60 dark:border-gray-800/60',
            relativeClass: 'text-blue-600 dark:text-blue-400',
            activities: upcomingSoon,
        },
        {
            id: 'upcomingLater',
            title: 'Futuras actividades',
            description: 'Planificate con tiempo.',
            badgeClass: 'bg-gray-100 text-gray-700 dark:bg-gray-900/60 dark:text-gray-200 border border-gray-200/60 dark:border-gray-800/60',
            relativeClass: 'text-gray-500 dark:text-gray-400',
            activities: upcomingLater,
        },
    ];

    const formatRelativeToNow = (startDate: Date) => {
        const diffMs = startDate.getTime() - now.getTime();
        const minutes = Math.round(diffMs / (1000 * 60));
        if (Math.abs(minutes) < 60) {
            return relativeTimeFormatter.format(minutes, 'minute');
        }

        const hours = Math.round(minutes / 60);
        if (Math.abs(hours) < 24) {
            return relativeTimeFormatter.format(hours, 'hour');
        }

        const days = Math.round(hours / 24);
        if (Math.abs(days) < 7) {
            return relativeTimeFormatter.format(days, 'day');
        }

        const weeks = Math.round(days / 7);
        return relativeTimeFormatter.format(weeks, 'week');
    };

    const renderActivity = (
        activity: Workshop | Chat | Volunteer,
        relativeClass: string
    ) => {
        const startDate = getActivityStartDate(activity);
        if (!startDate) return null;

        const link = getActivityLink(activity);
        const kind = getActivityKind(activity);
        const isoDate = startDate.toISOString();
        const relativeLabel = formatRelativeToNow(startDate);

        return (
            <>
                <li
                    className="group   transition-colors"
                    key={String(activity.id)}
                >
                    <Link href={link} target="_self" className="flex items-center w-full py-1 ">
                        <ActivityListIcon kindOfActivity={kind} />
                        <div className="flex flex-col ml-3 min-w-0">
                            <Tooltip content={activity.title}>
                                <p className="font-medium truncate text-sm text-gray-900 dark:text-gray-100">
                                    {activity.title}
                                </p>
                            </Tooltip>
                            <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-gray-500 dark:text-gray-400">
                                <span className="flex items-center text-green-600 dark:text-green-400 font-medium">
                                    <svg
                                        fill="none"
                                        className="w-4 h-4 mr-1 text-current"
                                        stroke="currentColor"
                                        strokeWidth={1.5}
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                                        />
                                    </svg>
                                    <span>
                                        <DisplayDate date={isoDate} kind="short" />
                                        {' · '}
                                        <DisplayTime time={isoDate} />
                                    </span>
                                </span>
                                <span className={`font-medium ${relativeClass}`}>{relativeLabel}</span>
                            </div>
                        </div>
                    </Link>
                </li>
                <Divider />
            </>
        );
    };

    return (
        <Card fullWidth className='w-full flex flex-col' radius='sm' style={{ height: typeof height === 'number' ? `${height}px` : height }}>
            <CardHeader>
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">Listado de actividades</p>
            </CardHeader>
            <CardBody className='flex-1 overflow-y-auto'>
                <Accordion>
                    {sections.map((section) => (
                        <AccordionItem
                            key={section.id}
                            aria-label={section.title}
                            title={
                                <div className="flex items-center justify-between w-full">
                                    <div className="flex flex-col text-left">
                                        <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">{section.title}</span>
                                        <span className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{section.description}</span>
                                    </div>
                                    <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${section.badgeClass}`}>{section.activities.length}</span>
                                </div>
                            }
                        >
                            {section.activities.length === 0 ? (
                                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">No hay actividades en esta sección.</p>
                            ) : (
                                <ul role="list" className="mt-2 space-y-2">
                                    {section.activities.map((activity) => renderActivity(activity, section.relativeClass))}
                                </ul>
                            )}
                        </AccordionItem>
                    ))}
                </Accordion>
            </CardBody>
        </Card >
    );
};

export default ActivityOverviewList;
