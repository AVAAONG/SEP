'use client';

import { ActivityKind } from '@/lib/activities/utils';

interface EventBadgeProps {
    kind: ActivityKind;
    isSuspended?: boolean;
    className?: string;
}

/**
 * A badge component to visually indicate the type of activity.
 * Provides color-coded badges for workshops, chats, and volunteers.
 */
const EventBadge = ({ kind, isSuspended = false, className = '' }: EventBadgeProps) => {
    const getKindConfig = () => {
        if (isSuspended) {
            return {
                label: 'Suspendida',
                bgColor: 'bg-gray-500/20 dark:bg-gray-600/30',
                textColor: 'text-gray-700 dark:text-gray-300',
                dotColor: 'bg-gray-500',
            };
        }

        switch (kind) {
            case 'workshop':
                return {
                    label: 'Taller',
                    bgColor: 'bg-blue-500/20 dark:bg-blue-600/30',
                    textColor: 'text-blue-700 dark:text-blue-300',
                    dotColor: 'bg-blue-500',
                };
            case 'chat':
                return {
                    label: 'Charla',
                    bgColor: 'bg-red-500/20 dark:bg-red-600/30',
                    textColor: 'text-red-700 dark:text-red-300',
                    dotColor: 'bg-red-500',
                };
            case 'volunteer':
                return {
                    label: 'Voluntariado',
                    bgColor: 'bg-green-500/20 dark:bg-green-600/30',
                    textColor: 'text-green-700 dark:text-green-300',
                    dotColor: 'bg-green-500',
                };
            default:
                return {
                    label: 'Actividad',
                    bgColor: 'bg-gray-500/20 dark:bg-gray-600/30',
                    textColor: 'text-gray-700 dark:text-gray-300',
                    dotColor: 'bg-gray-500',
                };
        }
    };

    const config = getKindConfig();

    return (
        <span
            className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-semibold ${config.bgColor} ${config.textColor} ${className}`}
        >
            <span className={`w-1.5 h-1.5 rounded-full ${config.dotColor} animate-pulse`} />
            {config.label}
        </span>
    );
};

export default EventBadge;
