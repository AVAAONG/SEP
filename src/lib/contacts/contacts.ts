// Compiled using avaa_workshops_pipeline 1.0.0 (TypeScript 4.6.2)
import { People } from "../auth/auth";


/**
 * It search for an specific group of contacs and returns the primary email address of all the contacts whithin that group
 *
 * @param groupName - The name of a contact group we want to grab the gmail addresses from
 * @returns  A list of the primary email address of the contract group
 */
export const getContactsPrimaryEmail = async (groupName: string): Promise<(string | null | undefined)[]> => {
    let contacts: (string | null | undefined)[];
    const contactGroups = await People.contactGroups.list();
    const group = contactGroups.data.contactGroups!.find((group) => group.name === groupName);
    if (!group) {
        throw new Error(`El grupo ${groupName} no existe`);
    }
    else {
        const groupMembers = await People.people.connections.list({
            resourceName: `contactGroups/${group.resourceName}`,
            personFields: 'emailAddresses',
        });
        contacts = groupMembers.data.connections?.map((c) => c.emailAddresses?.find((e) => e.metadata?.primary)?.value).filter(Boolean) ?? [];

    }
    return contacts;
};

/**
 * Search for only the the contacts groups (labels) we created in the actual account and returns its names.
 *
 * @notice It doesnt return those groups created by default by google or android.
 * @returns names of the contacts groups
 */
export const getGroupOfContacts = async () => {
    const groupsRes = await People.contactGroups.list();
    return groupsRes.data.contactGroups?.filter((group) => !group.resourceName?.startsWith('system/'))?.map((g) => g.name) ?? [];
};