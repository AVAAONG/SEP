import "next-auth";

/// @see https://reacthustle.com/blog/extend-user-session-nextauth-typescript?expand_article=1
declare module "next-auth" {
    interface User extends DefaultUser {
        kind_of_user: 'SCHOLAR' | 'ADMIN';
    }
    interface Session extends DefaultSession {
        kindOfUser: 'SCHOLAR' | 'ADMIN';
        chapterId: string;
        scholarStatus?: string;
        isSpeaker?: boolean;
    }
}