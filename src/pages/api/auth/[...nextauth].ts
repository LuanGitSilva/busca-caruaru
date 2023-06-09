import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials';
import api from "../../../../libs/api";
import { AuthUser } from "../../../../types/AuthUser";

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            id: 'credentials',
            credentials: {
                email: { label: 'E-mail', type: 'text' },
                password: { label: 'Senha', type: 'password' }
            },
            authorize: async (credentials, req) => {
                if(credentials && credentials.email && credentials.password) {
                    const user = await api.getUserAdm(credentials.email);
                    if (user) {
                        return {
                            id: (user.id).toString(),
                            name: user.name,
                            email: user.email,
                            password: user.password
                        }
                    } 
                }
                return null;
            }
        })
    ],
    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) {
                token.user = user;
            }
            return token;
        },
        session: async ({ session, token }) => {
            if (token) {
                session.user = token.user as AuthUser;
            }
            return session; 
        }
    },
    // pages: {
    //     signIn: '/login'
    // }
}

export default NextAuth(authOptions);