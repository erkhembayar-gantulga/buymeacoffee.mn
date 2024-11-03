import Image from 'next/image'
import Button from '../components/button'
import prisma from '../lib/prisma'
import Link from 'next/link'
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
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center p-4">
        <div className="flex items-center space-x-2">
          <Image src="/images/logo.png" alt="Logo" width={32} height={32} />
          <span className="font-bold text-xl">Надад кофе авч өгөөч</span>
        </div>
        <Button variant="secondary" size="sm">Нэвтрэх</Button>
      </header>

      {/* Banner */}
      <section className="flex-grow flex items-center justify-center bg-gray-200">
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-4">Таны бүтээлч<br />ажлыг санхүүжүүлэх</h1>
          <p className="text-xl text-secondary-600 mb-8">
            Дэмжлэг хүлээн авах. Гишүүнчлэл эхлүүлэх. Дэлгүүр байгуулах. Энэ нь<br />таны бодсоноос илүү хялбар.
          </p>
          <Button variant="primary" size="lg">
            Миний хуудсыг эхлүүлэх
          </Button>
          <p className="text-secondary-600 mt-2">Энэ нь үнэгүй бөгөөд нэг минутаас бага хугацаа шаардагдана!</p>
        </div>
      </section>

      {/* Creators */}
      <section className="p-4">
        <h2 className="text-2xl font-bold mb-4">Бүтээгчид</h2>
        <div className="flex space-x-4 overflow-x-auto">
          {users.map((user) => (
            <Link href={`/${user.username}`} key={user.id} className="flex-shrink-0">
              <div className="w-32 h-32 bg-gray-300 rounded-lg overflow-hidden">
                <Image
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(getInitials(user.name || user.username))}&background=random&color=fff`}
                  alt={user.name || user.username}
                  width={128}
                  height={128}
                  className="object-cover w-full h-full"
                />
                <p className="text-secondary-600">{user.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Latest Comments */}
      <section className="p-4">
        <h2 className="text-2xl font-bold mb-4">Сүүлийн сэтгэгдлүүд</h2>
        <div className="space-y-2">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="p-2 bg-gray-100 rounded-lg">
              <p className="text-secondary-600">Сэтгэгдэл {i + 1}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
