import Header from "@/components/header"
import { auth } from "@/auth"
import Link from "next/link"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Coffee, Facebook, Heart, Instagram, MessageCircle, Music, Twitter, Youtube } from "lucide-react"
import { UserRepository } from "@/app/repositories/userRepository"
import CommentForm from "@/components/comment-form"
import CommentsList from "@/components/comments-list"
import { Suspense } from "react"

interface CreatorProfileProps {
  params: { username: string }
}

interface CreatorData {
  id: number;
  username: string;
  email: string | null;
  bio: string | null;
  profileImage: string | null;
  name: string | null;
}

async function fetchCreatorData(username: string): Promise<CreatorData | null> {
  try {
    const user = await UserRepository.findByUsername(username);

    if (!user) return null;

    return {
      username: user.username,
      email: user.email,
      bio: user.bio || `${username} is a creator based in Mongolia.`,
      profileImage: user.profileImage,
      name: user.name,
      id: user.id,
    };
  } catch (error) {
    console.error('Failed to fetch creator data:', error);
    return null;
  }
}

export default async function CreatorProfile({ params }: CreatorProfileProps) {
  const { username } = params;
  const creatorData = await fetchCreatorData(username);
  const session = await auth();
  const isOwnProfile = session?.user?.email === creatorData?.email;

  if (!creatorData) {
    // Handle case when creator is not found
    return (
      <div className="min-h-screen bg-gradient-to-b from-muted/50 to-background">
        <Header showLoginButton={false} />
        <main className="container py-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold">Creator not found</h2>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-muted/50 to-background">
      <Header showLoginButton={false} />

      <main className="container py-8">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Left Column */}
          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center space-y-4">
                  <Avatar className="h-32 w-32">
                    <AvatarImage alt="Creator" src={creatorData.profileImage || undefined} />
                    <AvatarFallback>
                      {creatorData.name?.substring(0, 2) || 'CR'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-center space-y-2">
                    <h2 className="text-2xl font-bold">
                      {creatorData.name || creatorData.username}
                    </h2>
                    {isOwnProfile && (
                      <Link href={`/${username}/edit`}>
                        <Button variant="outline" size="sm">
                          Edit Profile
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {creatorData.bio}
                </p>
                <div className="mt-6 flex space-x-4">
                  <Button size="icon" variant="ghost">
                    <Twitter className="h-5 w-5" />
                  </Button>
                  <Button size="icon" variant="ghost">
                    <Facebook className="h-5 w-5" />
                  </Button>
                  <Button size="icon" variant="ghost">
                    <Youtube className="h-5 w-5" />
                  </Button>
                  <Button size="icon" variant="ghost">
                    <Instagram className="h-5 w-5" />
                  </Button>
                  <Button size="icon" variant="ghost">
                    <Music className="h-5 w-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Support Creator</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex justify-between">
                  <Button variant="outline" className="w-[30%]">
                    <Coffee className="mr-2 h-4 w-4" />
                    $1
                  </Button>
                  <Button variant="outline" className="w-[30%]">
                    <Coffee className="mr-2 h-4 w-4" />
                    $3
                  </Button>
                  <Button variant="outline" className="w-[30%]">
                    <Coffee className="mr-2 h-4 w-4" />
                    $5
                  </Button>
                </div>
                <div className="space-y-4">
                  <Input placeholder="Your name" />
                  <Textarea placeholder="Leave a message..." />
                  <Button className="w-full">Support</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Support</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium">John Doe</p>
                      <p className="text-sm text-muted-foreground">Thanks!</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Coffee className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">1</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>AB</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Alice Brown</p>
                      <p className="text-sm text-muted-foreground">Баярлалаа</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Coffee className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">3</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>MS</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Mike Smith</p>
                      <p className="text-sm text-muted-foreground">bought a coffee</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Coffee className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">1</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Comments</CardTitle>
              </CardHeader>
              <CardContent>
                <CommentForm creatorId={creatorData.id} />
                <div className="mt-6">
                  <Suspense fallback={<div>Loading comments...</div>}>
                    <CommentsList username={creatorData.username} />
                  </Suspense>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
