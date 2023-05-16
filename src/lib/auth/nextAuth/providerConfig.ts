import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },

    providers: [
        GoogleProvider({
            clientId: process.env.CLIENT_ID!,
            clientSecret: process.env.CLIENT_SECRET!,
        }),
        // CredentialsPrivider({
        //     name: "Credentials",
        //     credentials: {
        //         email: { label: "Email", type: "email", placeholder: "hola@gmail.com" },
        //         password: { label: "Password", type: "password" }
        //     },

        //     async authorize(credentials) {
        //         const user = { id: '1', name: 'hola', email: 'bravokevinto@gmail.com' };
        //         // return user;
        //         // const { email, password } = credentials;
        //         // const client = new auth.OAuth2Client(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.REDIRECT_URI);
        //         // const { tokens } = await client.getToken({ code: password });
        //         // client.setCredentials(tokens);
        //         // const { data } = await client.getTokenInfo(tokens.access_token);
        //         // if (data.email === email) {
        //         //     return { email: data.email };
        //         // }
        //         return user;
        //     }
        // })
    ],
    secret: process.env.JWT_SECRET!,
    // callbacks: {
    //     async jwt(token, user) {

    //         if (user) {
    //             token.email = user.email;
    //         }
    //         return token;
    //     }
    // }
}

export default authOptions; 