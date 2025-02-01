import { KinOfUser, ScholarStatus } from "@prisma/client";
import "next-auth";

/// @see https://reacthustle.com/blog/extend-user-session-nextauth-typescript?expand_article=1
declare module "next-auth" {
    interface User extends DefaultUser {
        kind_of_user: KinOfUser;
    }
    interface Session extends DefaultSession {
        kindOfUser: 'SCHOLAR' | 'ADMIN';
        chapterId: string;
        scholarStatus?: ScholarStatus;
        isSpeaker?: boolean;
    }
}