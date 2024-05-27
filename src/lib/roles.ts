import { PartialAreaPermissions } from "./db/permisions";

const CHATS_MANAGER_PERMISSIONS: PartialAreaPermissions = {
  chats: {
    read: true,
    create: true,
    update: true,
    delete: true,
    speakers: true,
  },
  scholars: {
    read: true,
  },
  volunteers: {
    read: true,
    create: true,
    update: true,
    delete: true,
  },
};

const PROJECT_MANAGER_PERMISSIONS: PartialAreaPermissions = {
  scholars: {
    read: true,
  },
  volunteers: {
    read: true,
    create: true,
    update: true,
    delete: true,
  },
};

const CHAPTER_ADMIN_PERMISSIONS: PartialAreaPermissions = {
  volunteers: {
    read: true,
    create: true,
    update: true,
    delete: true,
    external: true,
  },
  workshops: {
    read: true,
    create: true,
    update: true,
    delete: true,
    speakers: true,
  },
  chats: {
    read: true,
    create: true,
    update: true,
    delete: true,
    speakers: true,
  },
  scholars: {
    read: true, //generalRead
    individualRead: true,
    admission: true,
    create: true,
    delete: true,
    update: true,
    status: true,
  },
  admin: {
    read: true,
    create: true,
    update: true,
    delete: true,
    chapterChanage: false,
  },
  mentorship: {
    read: true,
    create: true,
    update: true,
    delete: true,
    chapter: true,
  },
};