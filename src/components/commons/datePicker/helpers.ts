import { classNames } from '@/lib/scholar/utils';

/**
 * Generates an array of year objects starting from 2020 to the current year.
 *
 * Each year object has the following properties:
 * - `name`: The year as a string.
 * - `queryYear`: The year as a string, which can be used for querying data based on the year.
 * - `current`: A boolean indicating whether the year is the current year. This is always `false` in the current implementation.
 *
 * @returns An array of year objects.
 */
export const getYearObjects = (): { name: string; href: string; current: boolean }[] => {
  const currentYear = new Date().getFullYear();
  const years = [];

  for (let year = 2020; year <= currentYear; year++) {
    years.push({
      name: year.toString(),
      href: year.toString(),
      current: false,
    });
  }
  return years;
};

export const linkClass = (current: boolean) =>
  classNames(
    current
      ? 'text-white dark:text-primary-light font-semibold bg-primary-light  dark:bg-secondary-dark'
      : 'text-gray-500 hover:text-gray-700',
    'rounded-xl px-3 py-1 text-sm font-medium'
  );
