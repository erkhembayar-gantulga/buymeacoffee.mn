import Header from "@/components/header"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Coffee, Facebook, Heart, Instagram, MessageCircle, Music, Twitter, Youtube } from "lucide-react"

interface CreatorProfileProps {
  params: { username: string }
}

interface CreatorData {
  username: string;
  bio: string;
  profileImage: string;
  socialLinks: {
    twitter?: string;
    instagram?: string;
    youtube?: string;
  };
}

async function fetchCreatorData(username: string): Promise<CreatorData> {
  // Simulating API call with a delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Mock data based on username
  const mockData: Record<string, CreatorData> = {
    johndoe: {
      username: 'johndoe',
      bio: 'Passionate photographer capturing the beauty of Mongolia. Join me on my visual journey through this stunning country!',
      profileImage: '/images/johndoe-profile.jpg',
      socialLinks: {
        instagram: 'https://instagram.com/johndoe_photos',
        twitter: 'https://twitter.com/johndoe_photos'
      }
    },
    sarahsmith: {
      username: 'sarahsmith',
      bio: 'Nomadic lifestyle blogger exploring the traditions of Mongolia. Let\'s discover the hidden gems together!',
      profileImage: '/images/sarahsmith-profile.jpg',
      socialLinks: {
        youtube: 'https://youtube.com/c/sarahsmithtravels',
        instagram: 'https://instagram.com/sarah_travels'
      }
    }
  };

  // Return mock data if exists, otherwise return default data
  return mockData[username] || {
    username,
    bio: `${username} is a creator based in Mongolia. Support their work!`,
    profileImage: '/images/default-profile.jpg',
    socialLinks: {}
  };
}

export default async function CreatorProfile({ params }: CreatorProfileProps) {
  const { username } = params
  const creatorData = await fetchCreatorData(username)

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
                    <AvatarImage alt="Creator" src="/placeholder.svg" />
                    <AvatarFallback>CR</AvatarFallback>
                  </Avatar>
                  <h2 className="text-2xl font-bold">{ creatorData?.name }</h2>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Hi! I'm a creative content creator passionate about sharing interesting stories and ideas. Your support
                  helps me continue creating content that matters.
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
          </div>
        </div>
      </main>
    </div>
  )
}
