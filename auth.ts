import NextAuth, { Session } from "next-auth"
import Google from "next-auth/providers/google"
import { UserRepository } from '@/app/repositories/userRepository'

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
    async session({ session, token }: { session: any; token: any }) {
      if (session.user?.email) {
        const dbUser = await UserRepository.findByEmail(session.user.email)
        if (dbUser) {
          session.user.id = dbUser.id
          session.user.username = dbUser.username
        }
      }
      return session as Session
    }
  },
  pages: {
    signIn: "/auth/signin",
  }
})
