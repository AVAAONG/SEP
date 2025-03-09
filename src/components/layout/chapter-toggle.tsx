'use client';

import { useSidebarContext } from '@/hooks/sidebar-context';
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
import { memo, useCallback } from 'react';

const CHAPTERS = {
  CARACAS: 'Rokk6_XCAJAg45heOEzYb',
  ZULIA: 'H0rvqSucbop6uozNUpuC-',
  CARABOBO: 'VYmgeeUPWwh_P_myJ1PCJ',
} as const;

type ChapterId = (typeof CHAPTERS)[keyof typeof CHAPTERS];

// Chapter data mapping
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

const ChapterSelector = memo(() => {
  const { data, update, status } = useSession();
  const { isOpen } = useSidebarContext();
  const router = useRouter();

  // Memoize the handler to prevent recreating on every render
  const handleChapterChange = useCallback(
    async (key: React.Key) => {
      await update({ chapterId: key as string });
      router.refresh();
    },
    [update, router]
  );

  // Don't render anything during loading or when data is null
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

  // Conditional rendering based on sidebar state
  return (
    <Dropdown placement="right-end" size="sm" radius="sm">
      <DropdownTrigger>
        {isOpen ? (
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
});

ChapterSelector.displayName = 'ChapterSelector';

export default ChapterSelector;
