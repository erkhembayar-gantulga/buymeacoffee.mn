import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Coffee } from "lucide-react"
import Link from "next/link"
import { getInitials } from '../utils/stringUtils'
import Header from "@/components/header"
import { UserRepository } from '@/app/repositories/userRepository'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { auth } from "@/auth"

export default async function Home(): Promise<JSX.Element> {
  const users = await UserRepository.getCreators()
  const session = await auth()
  
  // Get current user's profile if they're logged in
  const currentUserProfile = session?.user ? 
    await UserRepository.findByUsername(session.user.username) : null

  return (
    <div className="min-h-screen bg-gradient-to-b from-muted/50 to-background">
      <Header />
      
      <main className="container px-4 py-12">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-8 text-2xl font-semibold tracking-tight">
            Таны бүтээлч ажлыг санхүүжүүлэх
          </h2>
          <p className="mb-8 text-muted-foreground">
            Дэмжлэг хүлээн авах. Гишүүнчлэл эхлүүлэх. Дэлгүүр байгуулах. Энэ нь таны бодсоноос илүү хялбар.
          </p>
          <Link 
            href={currentUserProfile ? `/${currentUserProfile.username}` : "/create"}
          >
            <Button 
              size="lg" 
              className="!bg-emerald-500 hover:!bg-emerald-600"
            >
              Миний хуудсыг эхлүүлэх
            </Button>
          </Link>
          <p className="mt-4 text-sm text-muted-foreground">
            Энэ нь үнэгүй бөгөөд нэг минутаас бага хугацаа шаарддагдана!
          </p>
        </div>

        <div className="mt-16">
          <h3 className="mb-6 text-xl font-semibold">Бүтээгчид</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {users.map(user => (
              <Link key={user.username} href={`/${user.username}`}>
                <Card className="group relative aspect-square bg-amber-100 p-6 transition-colors hover:bg-amber-200">
                  <div className="flex flex-col items-center justify-center h-full space-y-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage 
                        src={user.profileImage || undefined} 
                        alt={user.name || user.username} 
                      />
                      <AvatarFallback>
                        {getInitials(user.name || user.username)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-lg font-medium text-amber-900">
                      {user.name || user.username}
                    </span>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <h3 className="mb-6 text-xl font-semibold">Сүүлийн сэтгэгдлүүд</h3>
          <div className="space-y-4">
            <div className="rounded-lg border bg-card p-4">
              <h4 className="font-medium">Сэтгэгдэл 1</h4>
            </div>
            <div className="rounded-lg border bg-card p-4">
              <h4 className="font-medium">Сэтгэгдэл 2</h4>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
