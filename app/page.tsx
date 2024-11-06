import Image from 'next/image'
import prisma from '../lib/prisma'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Coffee } from "lucide-react"
import Link from "next/link"
import { getInitials } from '../utils/stringUtils'

async function getUsers() {
  try {
    const users = await prisma.user.findMany({
      take: 3,
      orderBy: {
        createdAt: 'desc'
      }
    })
    return users
  } catch (error) {
    console.error('Failed to fetch users:', error)
    return []
  }
}

export default async function Home(): Promise<JSX.Element> {
  const users = await getUsers()

  return (
    <div className="min-h-screen bg-gradient-to-b from-muted/50 to-background">
      <header className="border-b">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Coffee className="h-6 w-6" />
            <h1 className="text-xl font-semibold">Надад кофе авч өгөөч</h1>
          </div>
          <Button 
            variant="outline" 
            className="border-2 border-emerald-500 text-emerald-500 hover:bg-emerald-50 bg-white"
          >
            Нэвтрэх
          </Button>
        </div>
      </header>
      
      <main className="container px-4 py-12">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-8 text-2xl font-semibold tracking-tight">
            Таны бүтээлч ажлыг санхүүжүүлэх
          </h2>
          <p className="mb-8 text-muted-foreground">
            Дэмжлэг хүлээн авах. Гишүүнчлэл эхлүүлэх. Дэлгүүр байгуулах. Энэ нь таны бодсоноос илүү хялбар.
          </p>
          <Button 
            size="lg" 
            className="!bg-emerald-500 hover:!bg-emerald-600"
          >
            Миний хуудсыг эхлүүлэх
          </Button>
          <p className="mt-4 text-sm text-muted-foreground">
            Энэ нь үнэгүй бөгөөд нэг минутаас бага хугацаа шаарддагдана!
          </p>
        </div>

        <div className="mt-16">
          <h3 className="mb-6 text-xl font-semibold">Бүтээгчид</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Link href="#">
              <Card className="group relative aspect-square bg-rose-100 p-6 transition-colors hover:bg-rose-200">
                <span className="text-2xl font-bold text-rose-900">SS</span>
              </Card>
            </Link>
            <Link href="#">
              <Card className="group relative aspect-square bg-amber-100 p-6 transition-colors hover:bg-amber-200">
                <span className="text-2xl font-bold text-amber-900">JD</span>
              </Card>
            </Link>
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
