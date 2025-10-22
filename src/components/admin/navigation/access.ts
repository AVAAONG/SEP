const NAVIGATION_RESTRICTED_EMAILS = new Set<string>([
    'angelrnievesp@gmail.com',
    'soniagarcial@hotmail.com',
    'mujicavicky26@gmail.com',
    'rjlozadam@gmail.com',
    'caneloneskarhil@gmail.com',
    'msolazzo25@gmail.com',
]);

export const hasExtendedNavigationAccess = (email?: string | null) => {
    if (!email) {
        return true;
    }
    return !NAVIGATION_RESTRICTED_EMAILS.has(email.toLowerCase());
};
