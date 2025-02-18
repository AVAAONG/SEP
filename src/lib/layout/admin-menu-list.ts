import {
  BookmarkIcon,
  Cog6ToothIcon,
  PencilSquareIcon,
  Squares2X2Icon,
  TagIcon,
  UsersIcon
} from '@heroicons/react/24/outline';

type Submenu = {
  href: string;
  label: string;
  active?: boolean;
};

type Menu = {
  href: string;
  label: string;
  active?: boolean;
  icon: React.ElementType;
  submenus?: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Dashboard",
          icon: Squares2X2Icon,
          submenus: []
        }
      ]
    },
    {
      groupLabel: "Contents",
      menus: [
        {
          href: "",
          label: "Posts",
          icon: PencilSquareIcon,
          submenus: [
            {
              href: "/posts",
              label: "All Posts"
            },
            {
              href: "/posts/new",
              label: "New Post"
            }
          ]
        },
        {
          href: "/categories",
          label: "Categories",
          icon: BookmarkIcon
        },
        {
          href: "/tags",
          label: "Tags",
          icon: TagIcon
        }
      ]
    },
    {
      groupLabel: "Settings",
      menus: [
        {
          href: "/users",
          label: "Users",
          icon: UsersIcon
        },
        {
          href: "/account",
          label: "Account",
          icon: Cog6ToothIcon
        }
      ]
    }
  ];
}