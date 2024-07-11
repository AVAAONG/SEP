import { PagesOptions } from "next-auth";

/**
 * @description NextAuth pages
 * @summary By default, NextAuth.js will render a generic page for handilg sign in, sign out, email verification and displating error messages.
 * You can override these pages by creating a page object with the path to your custom page in where the user can signIn or signUp.
 * @see https://next-auth.js.org/configuration/pages
 *
 */
export const PAGES: Partial<PagesOptions> = {
    signIn: '/signin/postulante',
    error: '/signin/postulante',
    newUser: '/postulacion',
    verifyRequest: '/signin/becario/checkEmail',
};
