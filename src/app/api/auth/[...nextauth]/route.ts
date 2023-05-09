import { auth } from '@googleapis/oauth2';
import NextAuth, { type NextAuthOptions } from 'next-auth';
import CredentialsPrivider from 'next-auth/providers/credentials';


export const authIptions: NextAuthOptions = {
    session: {
        strategy: 'jwt',
    },
    providers: [
        CredentialsPrivider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "hola@gmail.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                // const user = { id: '1', name: 'hola', email: 'bravokevinto@gmail.com' };
                // return user;
                // const { email, password } = credentials;
                // const client = new auth.OAuth2Client(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.REDIRECT_URI);
                // const { tokens } = await client.getToken({ code: password });
                // client.setCredentials(tokens);
                // const { data } = await client.getTokenInfo(tokens.access_token);
                // if (data.email === email) {
                //     return { email: data.email };
                // }
                // return null;
            }
        })
    ],
    // callbacks: {
    //     async jwt(token, user) {

    //         if (user) {
    //             token.email = user.email;
    //         }
    //         return token;
    //     }
    // }
}
const handler = NextAuth(authIptions);
export { handler as GET, handler as POST };
