import { chatIcon, userIcon, volunterIcon, workshopIcon } from '../../../../public/svgs/svgs';

export const PROGRAM_COMPONENTS = [
  {
    icon: workshopIcon,
    buttonName: 'Actividades formativas',
    itemList: [
      { name: 'Crear', link: '/admin/actividadesFormativas/crear' },
      { name: 'Facilitadores', link: '/admin/actividadesFormativas/facilitadores' },
      { name: 'Registro', link: '/admin/actividadesFormativas' },
    ],
  },
  {
    icon: chatIcon,
    buttonName: 'Chat clubs de inglés',
    itemList: [
      { name: 'Crear', link: '/admin/chats/crear' },
      { name: 'Facilitadores', link: '/admin/chats/facilitadores' },
      { name: 'Registro', link: '/admin/chats' },
    ],
  },
  {
    icon: volunterIcon,
    buttonName: 'Voluntariado',
    itemList: [
      { name: 'Crear', link: '/admin/voluntariado/crear' },
      { name: "Registro", link: "/admin/voluntariado" },
      { name: "Voluntariado Externo", link: "/admin/voluntariado/externo" },
    ],
  },
];

export const SCHOLARS = [
  {
    buttonName: 'Becarios',
    icon: userIcon,
    itemList: [
      { name: 'Activos', link: '/admin/becarios' },
      { name: 'Renuncias y retiros', link: '/admin/becarios/renuncias-retiros' },
      { name: 'Egresados', link: '/admin/becarios/egresados' },
    ],
    link: null,
  },
];

export const SIDEBAR_ADMIN_ACTIONS = [
  {
    icon: userIcon,
    buttonName: 'Acciones de administrador',
    itemList: [{ name: 'Control de administradores', link: '/admin/configuracion/adminUsers' }],
  },
];
