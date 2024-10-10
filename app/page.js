import Image from 'next/image'
import Button from '../components/button'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Толгой хэсэг */}
      <header className="flex justify-between items-center p-4">
        <nav className="flex space-x-6">
          <a href="#" className="text-secondary-600 hover:text-secondary-900">Түгээмэл асуултууд</a>
          <a href="#" className="text-secondary-600 hover:text-secondary-900">Хайрын хана</a>
          <div className="relative group">
            <a href="#" className="text-secondary-600 hover:text-secondary-900">Нөөц ▼</a>
            {/* Доош унадаг цэс энд нэмэгдэж болно */}
          </div>
        </nav>
        <div className="flex items-center space-x-2">
          <Image src="/coffee-icon.png" alt="Надад кофе авч өгөөч" width={32} height={32} />
          <span className="font-bold text-xl">Надад кофе авч өгөөч</span>
        </div>
        <div className="flex space-x-4">
          <Button variant="secondary" size="sm">Нэвтрэх</Button>
          <Button variant="primary" size="sm">Бүртгүүлэх</Button>
        </div>
      </header>

      {/* Үндсэн агуулга */}
      <main className="flex-grow flex flex-col items-center justify-center text-center px-4">
        <div className="flex items-center mb-6">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="ml-2 text-secondary-600">1,000,000+ бүтээгчдийн хайрыг хүлээсэн</span>
        </div>
        <h1 className="text-6xl font-bold mb-4">Таны бүтээлч<br />ажлыг санхүүжүүлэх</h1>
        <p className="text-xl text-secondary-600 mb-8">
          Дэмжлэг хүлээн авах. Гишүүнчлэл эхлүүлэх. Дэлгүүр байгуулах. Энэ нь<br />таны бодсоноос илүү хялбар.
        </p>
        <Button variant="primary" size="lg">
          Миний хуудсыг эхлүүлэх
        </Button>
        <p className="text-secondary-600">Энэ нь үнэгүй бөгөөд нэг минутаас бага хугацаа шаардагдана!</p>
      </main>
    </div>
  )
}