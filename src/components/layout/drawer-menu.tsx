'use client';

import { Bars3Icon } from '@heroicons/react/24/outline';
import { Button } from '@heroui/button';
import { Drawer, DrawerBody, DrawerContent, DrawerHeader } from '@heroui/drawer';
import { useDisclosure } from '@heroui/react';
import Link from 'next/link';
import { Menu } from './menu';

export const DrawerMenu = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button className="lg:hidden" isIconOnly onPress={onOpen} variant="bordered" size="sm">
        <Bars3Icon className="h-5 w-5" />
      </Button>
      <Drawer isOpen={isOpen} onOpenChange={onOpenChange} placement="left" radius="sm" size="full">
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="flex flex-col gap-1">
                <Link href="/" className="flex items-center gap-2">
                  <span className="font-bold text-lg">Brand</span>
                </Link>
              </DrawerHeader>
              <DrawerBody>
                <Menu isOpen />
              </DrawerBody>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
};
