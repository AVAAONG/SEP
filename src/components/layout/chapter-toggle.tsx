'use client';

import { useSidebarContext } from '@/hooks/sidebar-context';
import useMobile from '@/hooks/use-mobile';
import { Avatar } from '@nextui-org/avatar';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from '@nextui-org/dropdown';
import { User } from '@nextui-org/user';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const CHAPTERS = {
  CARACAS: 'Rokk6_XCAJAg45heOEzYb',
  ZULIA: 'H0rvqSucbop6uozNUpuC-',
  CARABOBO: 'VYmgeeUPWwh_P_myJ1PCJ',
} as const;

type ChapterId = (typeof CHAPTERS)[keyof typeof CHAPTERS];

const CHAPTER_DATA = {
  [CHAPTERS.CARACAS]: {
    shortName: 'CCS',
    fullName: 'Caracas',
    color: 'success',
  },
  [CHAPTERS.ZULIA]: {
    shortName: 'ZUL',
    fullName: 'Zulia',
    color: 'warning',
  },
  [CHAPTERS.CARABOBO]: {
    shortName: 'CBO',
    fullName: 'Carabobo',
    color: 'danger',
  },
} as const;

const getChapterInfo = (id: string) => {
  return (
    CHAPTER_DATA[id as ChapterId] || {
      shortName: 'CCS',
      fullName: 'Caracas',
      color: 'success',
    }
  );
};

const ChapterToggle = () => {
  const { data, update, status } = useSession();
  const { isOpen } = useSidebarContext();
  const { isMobile, isMiddle } = useMobile();
  // When on mobile, always show full details regardless of sidebar open state.
  const displayFull = isMobile || isMiddle ? true : isOpen;
  const router = useRouter();

  const handleChapterChange = async (key: React.Key) => {
    await update({ chapterId: key as string });
    router.refresh();
    window.location.reload();
  };

  if (status === 'loading' || data === null) return null;

  const currentChapterId = data.chapterId;
  const chapterInfo = getChapterInfo(currentChapterId);

  const dropdownMenu = (
    <DropdownMenu
      aria-label="Cambiar capítulo"
      variant="flat"
      disabledKeys={['info']}
      defaultSelectedKeys={[currentChapterId]}
      onAction={handleChapterChange}
    >
      <DropdownSection showDivider>
        <DropdownItem key="info" className="font-normal">
          <div className="space-y-1">
            <p className="text-xs leading-none text-muted-foreground">Capítulo actual</p>
            <p className="text-sm font-bold leading-none">{chapterInfo.fullName}</p>
          </div>
        </DropdownItem>
      </DropdownSection>
      <DropdownItem key={CHAPTERS.CARACAS} textValue="Caracas">
        Caracas
      </DropdownItem>
      <DropdownItem key={CHAPTERS.ZULIA} textValue="Zulia">
        Zulia
      </DropdownItem>
      <DropdownItem key={CHAPTERS.CARABOBO} textValue="Carabobo">
        Carabobo
      </DropdownItem>
    </DropdownMenu>
  );
  if (data.email === 'erikacampos.avaa@gmail.com' || data.email === 'avaatecnologia@gmail.com') {
    return (
      <Dropdown size="sm" radius="sm">
        <DropdownTrigger>
          {displayFull ? (
            <User
              as="button"
              avatarProps={{
                color: chapterInfo.color,
                radius: 'sm',
                size: 'sm',
                isBordered: true,
                fallback: chapterInfo.shortName,
              }}
              className="transition-transform"
              description="Capítulo actual"
              name={chapterInfo.fullName}
            />
          ) : (
            <Avatar
              isBordered
              radius="sm"
              color={chapterInfo.color}
              as="button"
              size="sm"
              fallback={chapterInfo.shortName}
              className="transition-transform"
            />
          )}
        </DropdownTrigger>
        {dropdownMenu}
      </Dropdown>
    );
  }
  return (
    <>
      {displayFull ? (
        <User
          avatarProps={{
            color: chapterInfo.color,
            radius: 'sm',
            size: 'sm',
            isBordered: true,
            fallback: chapterInfo.shortName,
          }}
          className="transition-transform"
          description="Capítulo actual"
          name={chapterInfo.fullName}
        />
      ) : (
        <Avatar
          isBordered
          radius="sm"
          color={chapterInfo.color}
          size="sm"
          fallback={chapterInfo.shortName}
          className="transition-transform"
        />
      )}
    </>
  );
};


export default ChapterToggle;
