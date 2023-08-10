import {
  CalendarIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  UsersIcon,
  ///@ts-ignore
} from '@heroicons/react/24/outline';
export const userNavigation = [
  { name: 'Perfil', href: '#' },
  { name: 'Configuración', href: '#' },
  { name: 'Sign out', href: '#' },
];

/**
 * takes any number of arguments and returns a
 * string that concatenates all the arguments that are truthy values
 * (i.e., not null, undefined, false, 0, NaN or an empty string) separated by a space character.
 * @param classes
 * @returns
 */
export const classNames = (...classes: string[]) => classes.filter(Boolean).join(' ');

export const navigation = [
  { name: 'Dashboard', href: '#', icon: HomeIcon, current: true },
  { name: 'Team', href: '#', icon: UsersIcon, current: false },
  { name: 'Projects', href: '#', icon: FolderIcon, current: false },
  { name: 'Calendar', href: '#', icon: CalendarIcon, current: false },
  { name: 'Documents', href: '#', icon: InboxIcon, current: false },
  { name: 'Reports', href: '#', icon: ChartBarIcon, current: false },
];
