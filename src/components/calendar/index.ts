/**
 * Calendar Module Exports
 * 
 * This module provides a modern, responsive calendar system with:
 * - Main Calendar component for displaying activities
 * - CalendarForEnrolling for scholar enrollment flows
 * - ActivityDetailsPopover for showing detailed event information
 * - EventBadge for activity type indicators
 * - Utility functions for formatting activities
 */

export { default as ActivityDetailsPopover } from './ActivityDetailsPopover';
export { default as Calendar } from './Calendar';
export { default as CalendarForEnrolling } from './CalendarForEnrolling';
export { default as EventBadge } from './EventBadge';
export { default as formatActivitiesForCalendarPanel, formatActivityForBigCalendar } from './utils';

