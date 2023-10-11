import { chatIcon, userIcon, workshopIcon } from '../../../../public/svgs/svgs';

export const SIDEBAR_ACTIVITIES_ACTIONS = [
  {
    icon: workshopIcon,
    buttonName: 'Actividades de formación',
    itemList: [
      { name: 'Crear', link: '/admin/actividadesFormativas/crear' },
      // { name: "Estadísticas de talleres", link: "/talleres/estadisticas" },
      { name: 'Registro', link: '/admin/actividadesFormativas/lista' },
    ],
  },
  {
    icon: chatIcon,
    buttonName: 'Chats clubs',
    itemList: [
      { name: 'Crear', link: '/admin/chats/crear' },
      // { name: "Estadísticas de chats", link: "/chats/estadisticas" },
      { name: 'Registro', link: '/chats/lista' },
    ],
  },
  // {
  //   icon: volunterIcon,
  //   buttonName: 'Voluntariado',
  //   itemList: [
  //     { name: 'Crear', link: 'voluntariado/crear' },
  //     // { name: "Estadísticas de talleres", link: "voluntariado/estadisticas" },
  //     // { name: "Lista de voluntariado", link: "/voluntariado/lista" },
  //   ],
  // },
];

export const SIDEBAR_DB_BUTTONS = [
  {
    icon: userIcon,
    buttonName: 'Becarios',
    itemList: [
      { name: 'Becarios activos', link: '/admin/becarios' },
      { name: 'Estadísticas', link: '/admin/bd/becarios/estadisticas' },
    ],
  },
  {
    icon: userIcon,
    buttonName: 'Facilitadores de act. formativas',
    itemList: [{ name: 'Facilitadores', link: '/admin/facilitadores/actividadesFormativas' }],
  },
  {
    icon: userIcon,
    buttonName: 'Facilitadores de chats',
    itemList: [{ name: 'Facilitadores', link: '/admin/facilitadores/chats' }],
  },
];

export const SIDEBAR_ADMIN_ACTIONS = [
  {
    icon: userIcon,
    buttonName: 'Acciones de administrador',
    itemList: [{ name: 'control de administradores', link: '/admin/config/adminUsers' }],
  },
];
