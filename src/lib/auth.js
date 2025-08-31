import { PrismaAdapter } from "@next-auth/prisma-adapter"
import GoogleProvider from "next-auth/providers/google"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: 'jwt'
    },
    pages: {
        signIn: "/sign-in"
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    callbacks: {
        // whenever any jwt is created or updated this functio runs
        async jwt({ token, user }) {
            
            if(user){
                const dbUser = await prisma.user.findUnique({
                    where: {email: user.email},
                    select: { id: true, name: true, email: true, username: true, image: true, role: true }
                })
                if(dbUser) {
                    token.id = dbUser.id;
                    token.name = dbUser.name;
                    token.email = dbUser.email;
                    token.username = dbUser.username;
                    token.image = dbUser.image;
                    token.role = dbUser.role
                } else {
                    const newUser = await prisma.user.create({
                        data: {
                            email: user.email,
                            name: user.name,
                            image: user.image,
                            role: 'user'
                        }
                    });
                    token.id = newUser.id;
                }
            }
            return token;
        },
        async session({ session, token }) {
            if(token){
                session.user.id = token.id;
                session.user.name = token.name;
                session.user.email = token.email;
                session.user.username = token.username;
                session.user.image = token.image;
                session.user.role = token.role;
            }
            return session;
        },
        redirect() {
            return '/dashboard'
        }
    }
}

export const getAuthsession = ()=> getServerSession(authOptions)