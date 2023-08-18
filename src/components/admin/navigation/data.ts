import { chatIcon, volunterIcon, workshopIcon } from '@/assets/svgs';

export const SIDEBAR_ACTIVITIES_ACTIONS = [
  {
    icon: workshopIcon,
    buttonName: 'Actividades de formación',
    itemList: [
      { name: 'Crear', link: '/admin/talleres/crear' },
      // { name: "Estadísticas de talleres", link: "/talleres/estadisticas" },
      { name: 'Listado', link: '/admin/talleres/lista' },
    ],
  },
  {
    icon: chatIcon,
    buttonName: 'Chats clubs',
    itemList: [
      { name: 'Crear', link: '/admin/chats/crear' },
      // { name: "Estadísticas de chats", link: "/chats/estadisticas" },
      // { name: "Lista de chats", link: "/chats/lista" },
    ],
  },
  {
    icon: volunterIcon,
    buttonName: 'Voluntariado',
    itemList: [
      { name: 'Crear', link: 'voluntariado/crear' },
      // { name: "Estadísticas de talleres", link: "voluntariado/estadisticas" },
      // { name: "Lista de voluntariado", link: "/voluntariado/lista" },
    ],
  },
];

export const SIDEBAR_DB_BUTTONS = [
  {
    icon: workshopIcon,
    buttonName: 'Becarios',
    itemList: [
      { name: 'Becarios activos', link: '/admin/bd/becarios' },
      { name: 'Estadísticas', link: '/admin/bd/becarios/estadisticas' },
    ],
  },
  {
    icon: workshopIcon,
    buttonName: 'Facilitadores de act. formativas',
    itemList: [
      { name: 'Facilitadores', link: '/admin/bd/facilitadores/talleres' },
      { name: 'Estadísticas', link: '/admin/talleres/estadisticas' },
    ],
  },
  {
    icon: workshopIcon,
    buttonName: 'Facilitadores de chats',
    itemList: [
      { name: 'Facilitadores', link: '/admin/bd/facilitadores/chats' },
      { name: 'Estadísticas', link: '/admin/talleres/estadisticas' },
    ],
  },
];
