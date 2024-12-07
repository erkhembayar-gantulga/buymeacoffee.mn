import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Coffee } from "lucide-react"
import Link from "next/link"
import { getInitials } from '../utils/stringUtils'
import Header from "@/components/header"
import { UserRepository } from '@/app/repositories/userRepository'

export default async function Home(): Promise<JSX.Element> {
  const users = await UserRepository.getCreators()

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
          <Link href="/create">
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
                  <span className="text-2xl font-bold text-amber-900 ">
                    {getInitials(user.name || user.username)}
                  </span>
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
