// src/lib/auth.js
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import GoogleProvider from "next-auth/providers/google"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/sign-in",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  // debug: true,

  callbacks: {
    // Runs whenever JWT is created/updated
    async jwt({ token, user }) {
      if (user) {
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email },
          select: {
            id: true,
            name: true,
            email: true,
            username: true,
            image: true,
            role: true,
          },
        })

        if (dbUser) {
          token.id = dbUser.id
          token.name = dbUser.name
          token.email = dbUser.email
          token.username = dbUser.username ?? null
          token.image = dbUser.image
          token.role = dbUser.role ?? "user"
        } else {
          const newUser = await prisma.user.create({
            data: {
              email: user.email,
              name: user.name,
              image: user.image,
              role: "user",
            },
          })
          token.id = newUser.id
          token.name = newUser.name
          token.email = newUser.email
          token.username = newUser.username ?? null
          token.image = newUser.image
          token.role = "user"
        }
      }
      return token
    },

    // Attach token data into the session
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id
        session.user.name = token.name
        session.user.email = token.email
        session.user.username = token.username
        session.user.image = token.image
        session.user.role = token.role
      }
      return session
    },

    redirect({ url, baseUrl }) {
      if (url.includes("/api/auth/signout")) {
        return baseUrl
      }
      if (url.includes("/api/auth/callback")) {
        return `${baseUrl}/dashboard`
      }
      if (url.startsWith(baseUrl)) {
        return url
      }
      return baseUrl
    }
  },
}

export const getAuthsession = () => getServerSession(authOptions)
