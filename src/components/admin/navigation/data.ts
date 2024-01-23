import { chatIcon, userIcon, workshopIcon } from '../../../../public/svgs/svgs';

export const PROGRAM_COMPONENTS = [
  {
    icon: workshopIcon,
    buttonName: 'Actividades formativas',
    itemList: [
      { name: 'Crear', link: '/admin/actividadesFormativas/crear' },
      { name: "Facilitadores", link: "/admin/actividadesFormativas/facilitadores" },
      { name: 'Registro', link: '/admin/actividadesFormativas' },
    ],
  },
  {
    icon: chatIcon,
    buttonName: 'Chat clubs de inglés',
    itemList: [
      { name: 'Crear', link: '/admin/chats/crear' },
      { name: "Facilitadores", link: "/admin/chats/facilitadores" },
      { name: 'Registro', link: '/admin/chats' },
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

export const SCHOLARS = [
  {
    buttonName: 'Becarios',
    icon: userIcon,
    itemList: [
      { name: "Activos", link: "/admin/becarios" },
      // { name: 'Retirados', link: '/admin/becarios/retirados' },
      // { name: 'Renuncias', link: '/admin/becarios/renuncias' },
      // { name: 'Alumni', link: '/admin/becarios/alumni' },
    ],
    link: null,
  },
];

export const SIDEBAR_ADMIN_ACTIONS = [
  {
    icon: userIcon,
    buttonName: 'Acciones de administrador',
    itemList: [{ name: 'Control de administradores', link: '/admin/config/adminUsers' }],
  },
];
