import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "./prisma";
import { getServerSession } from "next-auth";

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: 'jwt'
    },
    pages: {
        signIn: "/sign-in",
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    callbacks: {
        // async jwt({ session, user }) {
        //     if (user) {
        //         const dbuser = prisma.user.findUnique({
        //             where: { email: user.email },
        //             select: { id: true, name: true, email: true, role: true, username: true, image: true }
        //         })
        //         if (dbuser) {
        //             token.id = dbuser.id
        //             token.name = dbuser.name
        //             token.email = dbuser.email
        //             token.username = dbuser.username
        //             token.image = dbuser.image
        //             token.role = dbuser.role
        //         } else{
        //             const newUser = await prisma.user.create({
        //                 email: user.email,
        //                 name: user.name,
        //                 image: user.image,
        //                 role: 'user'
        //             });
        //             token.id = newUser.id; 
        //         }
        //     }
        //     return token;
        // },

        async jwt({ token, user }) {
            if (user) {
                const dbuser = await prisma.user.findUnique({
                    where: { email: user.email },
                    select: { id: true, name: true, email: true, role: true, username: true, image: true }
                });

                if (dbuser) {
                    token.id = dbuser.id;
                    token.name = dbuser.name;
                    token.email = dbuser.email;
                    token.username = dbuser.username;
                    token.image = dbuser.image;
                    token.role = dbuser.role;
                } else {
                    const newUser = await prisma.user.create({
                        data: {
                            email: user.email,
                            name: user.name,
                            image: user.image,
                            role: "user",
                        },
                    });
                    token.id = newUser.id;
                    token.name = newUser.name;
                    token.email = newUser.email;
                    token.image = newUser.image;
                    token.role = newUser.role;
                }
            }
            return token;
        },

        async session({ session, token }) {
            if (token) {
                session.user.id = token.id;
                session.token.id = dbuser.id;
                session.token.name = dbuser.name;
                session.token.email = dbuser.email;
                session.token.username = dbuser.username;
                session.token.image = dbuser.image;
                session.token.role = dbuser.role;
            }
            return session;
        },
        redirect() {
            return '/dashboard'
        }
    }
}

export const getAuthsession = () => getServerSession(authOptions)