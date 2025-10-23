'use client';

import { BigCalendarEventType } from '@/types/Calendar';
import {
    ArrowTopRightOnSquareIcon,
    CalendarIcon,
    ClockIcon,
    DocumentTextIcon,
    MapPinIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/modal';
import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';

interface ActivityDetailsPopoverProps {
    isOpen: boolean;
    onClose: () => void;
    event: BigCalendarEventType | null;
}

/**
 * A modern popover component to display activity details with a clean, professional design.
 * Shows event information including time, location, description, and provides navigation to the full activity page.
 */
const ActivityDetailsPopover = ({ isOpen, onClose, event }: ActivityDetailsPopoverProps) => {
    const router = useRouter();

    if (!event) return null;

    const formatDate = (date: Date | undefined) => {
        if (!date) return '';
        return new Intl.DateTimeFormat('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }).format(new Date(date));
    };

    const formatTime = (date: Date | undefined) => {
        if (!date) return '';
        return new Intl.DateTimeFormat('es-ES', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        }).format(new Date(date));
    };

    const handleNavigate = () => {
        if (event.url) {
            router.push(event.url);
            onClose();
        }
    };

    const getActivityTypeLabel = (kind: string) => {
        const labels: Record<string, string> = {
            workshop: 'Taller',
            chat: 'Charla',
            volunteer: 'Voluntariado',
        };
        return labels[kind] || kind;
    };

    const getActivityTypeColor = (kind: string) => {
        const colors: Record<string, string> = {
            workshop: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
            chat: 'bg-red-500/10 text-red-600 dark:text-red-400',
            volunteer: 'bg-green-500/10 text-green-600 dark:text-green-400',
        };
        return colors[kind] || 'bg-gray-500/10 text-gray-600 dark:text-gray-400';
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size="2xl"
            placement="center"
            backdrop="blur"
            classNames={{
                base: 'bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-700 shadow-2xl',
                header: 'border-b border-gray-200 dark:border-gray-700',
                body: 'py-6',
                footer: 'border-t border-gray-200 dark:border-gray-700',
            }}
            motionProps={{
                variants: {
                    enter: {
                        scale: 1,
                        opacity: 1,
                        transition: {
                            duration: 0.2,
                            ease: 'easeOut',
                        },
                    },
                    exit: {
                        scale: 0.95,
                        opacity: 0,
                        transition: {
                            duration: 0.15,
                            ease: 'easeIn',
                        },
                    },
                },
            }}
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-2 pb-4">
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${getActivityTypeColor(event.kindOfActivity || '')}`}
                                        >
                                            {getActivityTypeLabel(event.kindOfActivity || '')}
                                        </span>
                                        {event.isSuspended && (
                                            <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide bg-red-500/10 text-red-600 dark:text-red-400">
                                                Suspendida
                                            </span>
                                        )}
                                    </div>
                                    <h2
                                        className={`text-xl font-bold text-gray-900 dark:text-white ${event.isSuspended ? 'line-through opacity-60' : ''}`}
                                    >
                                        {event.title}
                                    </h2>
                                </div>
                            </div>
                        </ModalHeader>

                        <ModalBody>
                            <div className="space-y-4">
                                {/* Date and Time */}
                                <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-slate-800 dark:to-slate-800/50 rounded-lg">
                                    <div className="flex-shrink-0">
                                        <div className="p-2 bg-white dark:bg-slate-700 rounded-lg shadow-sm">
                                            <CalendarIcon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                                        </div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                            Fecha
                                        </p>
                                        <p className="text-base font-semibold text-gray-900 dark:text-white capitalize">
                                            {formatDate(event.start)}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-slate-800 dark:to-slate-800/50 rounded-lg">
                                    <div className="flex-shrink-0">
                                        <div className="p-2 bg-white dark:bg-slate-700 rounded-lg shadow-sm">
                                            <ClockIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                        </div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                            Horario
                                        </p>
                                        <p className="text-base font-semibold text-gray-900 dark:text-white">
                                            {formatTime(event.start)} - {formatTime(event.end)}
                                        </p>
                                    </div>
                                </div>

                                {/* Location */}
                                {event.location && (
                                    <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-slate-800 dark:to-slate-800/50 rounded-lg">
                                        <div className="flex-shrink-0">
                                            <div className="p-2 bg-white dark:bg-slate-700 rounded-lg shadow-sm">
                                                <MapPinIcon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                                            </div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                                Ubicación
                                            </p>
                                            <p className="text-base font-semibold text-gray-900 dark:text-white">
                                                {event.location}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {/* Description */}
                                {event.description && (
                                    <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-slate-800 dark:to-slate-800/50 rounded-lg">
                                        <div className="flex-shrink-0">
                                            <div className="p-2 bg-white dark:bg-slate-700 rounded-lg shadow-sm">
                                                <DocumentTextIcon className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                                            </div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                                                Descripción
                                            </p>
                                            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                                                {event.description}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </ModalBody>

                        <ModalFooter className="gap-2">
                            <Button
                                color="default"
                                variant="light"
                                onPress={onClose}
                                startContent={<XMarkIcon className="w-4 h-4" />}
                            >
                                Cerrar
                            </Button>
                            <Button
                                color="success"
                                onPress={handleNavigate}
                                endContent={<ArrowTopRightOnSquareIcon className="w-4 h-4" />}
                                className="bg-gradient-to-r from-emerald-600 to-green-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
                            >
                                Ver actividad
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default ActivityDetailsPopover;
