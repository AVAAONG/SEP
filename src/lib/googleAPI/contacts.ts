// Compiled using avaa_workshops_pipeline 1.0.0 (TypeScript 4.6.2)
import { People } from "../auth/auth";


/**
 * It search for an specific group of contacs and returns the primary email address of all the contacts whithin that group
 *
 * @param groupName - The name of a contact group we want to grab the gmail addresses from
 * @returns  A list of the primary email address of the contract group
 */
export async function getPrimaryEmailsFromContactGroup(resourceName: string) {

    const { data } = await People.contactGroups.get(
        {
            resourceName,
            maxMembers: 10000,
        }
    );

    const contactsResourseNames = data.memberResourceNames ?? [];

    // const h = await People.people.getBatchGet({
    //     resourceNames: contactsResourseNames,
    //     personFields: "emailAddresses",
    // })
    return contactsResourseNames
}




/**
 * Search for only the the contacts groups (labels) we created in the actual account and returns its names.
 *
 * @notice It doesnt return those groups created by default by google or android.
 * @returns names of the contacts groups
 */
export const getGroupOfContacts = async () => {
    const groupsRes = await People.contactGroups.list();
    return groupsRes.data.contactGroups?.filter((group) => group.groupType === "USER_CONTACT_GROUP")?.map((g) => g.resourceName) ?? [];
};