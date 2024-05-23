
type Permission = {
  read: boolean;
  create: boolean;
  update: boolean;
  delete: boolean;
  [key: string]: boolean;
};

type AreaPermissions = {
  volunteers: Permission;
  workshops: Permission;
  chats: Permission;
  scholars: Permission;
  admin: Permission;
  mentorship: Permission;
};

type PartialPermission = Partial<Permission>;

export type PartialAreaPermissions = {
  volunteers?: PartialPermission;
  workshops?: PartialPermission;
  chats?: PartialPermission;
  scholars?: PartialPermission;
  admin?: PartialPermission;
  mentorship?: PartialPermission;
};


const DEFAULT_PERMISSIONS: PartialAreaPermissions = {
  volunteers: {
    read: false,
    create: false,
    update: false,
    delete: false,
    external: false
  },
  workshops: {
    read: false,
    create: false,
    update: false,
    delete: false,
    speakers: false
  },
  chats: {
    read: false,
    create: false,
    update: false,
    delete: false,
    speakers: false
  },
  scholars: {
    read: false, //generalRead
    individualRead: false,
    admission: false,
    create: false,
    delete: false,
    update: false,
    status: false,
  },
  admin: {
    read: false,
    create: false,
    update: false,
    delete: false,
    chapterChanage: false
  },
  mentorship: {
    read: false,
    create: false,
    update: false,
    delete: false,
    chapter: false
  }
}
export const setPermissions = (newPermissions: PartialAreaPermissions): AreaPermissions => {
  // Create a new object and copy the DEFAULT_PERMISSIONS into it
  let updatedPermissions: AreaPermissions = JSON.parse(JSON.stringify(DEFAULT_PERMISSIONS));

  // Loop over each area in the new permissions
  for (let area in newPermissions) {
    // Cast the area to a key of AreaPermissions
    const key = area as keyof AreaPermissions;

    // If the area exists in the updated permissions
    if (updatedPermissions[key] && newPermissions[key]) {
      // Merge the existing permissions with the new permissions
      // The new permissions will overwrite the existing permissions
      updatedPermissions[key] = {
        ...updatedPermissions[key],
        ...newPermissions[key]
      } as Permission;
    }
  }

  // Return the updated permissions
  return updatedPermissions;
}

export const setAllPermissionsTrue = (permissions: PartialAreaPermissions = DEFAULT_PERMISSIONS): AreaPermissions => {
  // Create a new object to hold the updated permissions
  let updatedPermissions: AreaPermissions = JSON.parse(JSON.stringify(permissions));

  // Loop over each area in the permissions
  for (let area in updatedPermissions) {
    // Cast the area to a key of AreaPermissions
    const key = area as keyof AreaPermissions;

    // Loop over each permission in the area
    for (let permission in updatedPermissions[key]) {
      // Set the permission to true
      updatedPermissions[key][permission] = true;
    }
  }

  // Return the updated permissions
  return updatedPermissions;
}
