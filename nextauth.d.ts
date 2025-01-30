import "next-auth";

/// @see https://reacthustle.com/blog/extend-user-session-nextauth-typescript?expand_article=1
declare module "next-auth" {
    interface Session extends DefaultSession {
        user?: User;
        scholarId: string;
        kindOfUser: 'SCHOLAR' | 'ADMIN';
    }
}