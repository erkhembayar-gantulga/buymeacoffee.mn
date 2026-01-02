import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { getInitials } from '../utils/stringUtils'
import Header from "@/components/header"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CreatorRepository } from "@/lib/repositories/creator-repository"
import { CommentRepository } from "@/lib/repositories/comment-repository"
import { auth } from "@/auth"

export default async function Home() {
  const [creators, comments] = await Promise.all([
    CreatorRepository.getCreators(10),
    CommentRepository.getLatest(10)
  ])

  const session = await auth()

  const currentUserProfile = session?.user?.username
    ? await CreatorRepository.findByUsername(session.user.username)
    : null

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
            {creators.map((creator) => (
              <Link key={creator.username} href={`/${creator.username}`}>
                <Card className="group relative aspect-square bg-amber-100 p-6 transition-colors hover:bg-amber-200">
                  <div className="flex flex-col items-center justify-center h-full space-y-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={creator.profileImage || undefined} alt={creator.name || creator.username} />
                      <AvatarFallback>
                        {getInitials(creator.name || creator.username)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-lg font-medium text-amber-900">
                      {creator.name || creator.username}
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
            {comments.map((comment) => (
              <div key={comment.id} className="rounded-lg border bg-card p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage 
                      src={comment.author.profileImage || undefined}
                      alt={comment.author.name || comment.author.username} 
                    />
                    <AvatarFallback>
                      {getInitials(comment.author.name || comment.author.username)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium">
                    {comment.author.name || comment.author.username}
                  </span>
                  <span className="text-muted-foreground">→</span>
                  <Link 
                    href={`/${comment.creator.username}`}
                    className="text-sm text-muted-foreground hover:underline"
                  >
                    {comment.creator.name || comment.creator.username}
                  </Link>
                </div>
                <p className="text-sm text-muted-foreground">{comment.content}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
