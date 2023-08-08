import { chatIcon, volunterIcon, workshopIcon } from '@/assets/svgs';

export const SIDEBAR_ACTIVITIES_ACTIONS = [
  {
    icon: workshopIcon,
    buttonName: 'Talleres',
    itemList: [
      { name: 'Crear Taller', link: '/admin/talleres/crear' },
      // { name: "Estadísticas de talleres", link: "/talleres/estadisticas" },
      { name: 'Lista de talleres', link: '/admin/talleres/lista' },
    ],
  },
  {
    icon: chatIcon,
    buttonName: 'Chats',
    itemList: [
      { name: 'Crear Chat', link: '/admin/chats/crear' },
      // { name: "Estadísticas de chats", link: "/chats/estadisticas" },
      // { name: "Lista de chats", link: "/chats/lista" },
    ],
  },
  {
    icon: volunterIcon,
    buttonName: 'Voluntariado',
    itemList: [
      { name: 'Crear Voluntariado', link: 'voluntariado/crear' },
      // { name: "Estadísticas de talleres", link: "voluntariado/estadisticas" },
      // { name: "Lista de voluntariado", link: "/voluntariado/lista" },
    ],
  },
];
