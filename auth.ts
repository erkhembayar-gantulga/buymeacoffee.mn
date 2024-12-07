import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import prisma from "@/lib/prisma"

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    })
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (!user.email) return false

      try {
        await prisma.user.upsert({
          where: { email: user.email },
          update: {
            name: user.name,
            profileImage: user.image,
          },
          create: {
            email: user.email,
            name: user.name,
            profileImage: user.image,
            username: user.email.split('@')[0], // Default username from email
          },
        })
        return true
      } catch (error) {
        console.error('Error during user registration:', error)
        return false
      }
    },
    async session({ session, token }) {
      if (session.user?.email) {
        const dbUser = await prisma.user.findUnique({
          where: { email: session.user.email },
        })
        if (dbUser) {
          session.user.id = dbUser.id
          session.user.username = dbUser.username
        }
      }
      return session
    }
  },
  pages: {
    signIn: "/auth/signin",
  }
})
