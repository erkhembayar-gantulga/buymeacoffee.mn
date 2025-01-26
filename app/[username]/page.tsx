'use client'

import { useState, useEffect } from 'react'
import Header from "@/components/header"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Coffee, Facebook, Heart, Instagram, MessageCircle, Music, Twitter, Youtube } from "lucide-react"
import CommentForm from "@/components/comment-form"
import CommentsList from "@/components/comments-list"
import { Suspense } from "react"
import { Comment } from '@/lib/repositories/comment-repository'

interface CreatorData {
  id: number
  username: string
  email: string | null
  bio: string | null
  profileImage: string | null
  name: string | null
  isOwnProfile: boolean
}

export default function CreatorProfile({ params }: { params: { username: string } }) {
  const [lastComment, setLastComment] = useState<Comment | null>(null)
  const [creatorData, setCreatorData] = useState<CreatorData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedAmount, setSelectedAmount] = useState<number>(1)
  const [customAmount, setCustomAmount] = useState('')
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState<{ amount?: string }>({})
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    const loadCreatorData = async () => {
      try {
        const response = await fetch(`/api/creators/${params.username}`)
        if (!response.ok) {
          throw new Error('Failed to fetch creator data')
        }
        const data = await response.json()
        setCreatorData(data)
      } catch (error) {
        console.error('Failed to fetch creator data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadCreatorData()
  }, [params.username])

  const handleNewComment = (comment: Comment) => {
    setLastComment(comment)
  }

  const validateForm = () => {
    const newErrors: { amount?: string } = {}
    const amount = customAmount ? Number(customAmount) : selectedAmount
    
    if (isNaN(amount) || amount < 1) {
      newErrors.amount = 'Amount must be at least $1'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSupport = async () => {
    if (!validateForm()) return
    
    setIsProcessing(true)
    try {
      const amount = customAmount ? Number(customAmount) : selectedAmount
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: amount * 100, // Convert to cents
          creatorId: creatorData?.id,
          name,
          message
        })
      })
      
      const { clientSecret } = await response.json()
      // Integrate with Stripe.js here
    } finally {
      setIsProcessing(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-muted/50 to-background">
        <Header showLoginButton={false} />
        <main className="container py-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold">Loading...</h2>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    )
  }

  if (!creatorData) {
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
    )
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
                    {creatorData.isOwnProfile && (
                      <Link href={`/${creatorData.username}/edit`}>
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
                <div className="mb-4 flex justify-between gap-2">
                  {[1, 3, 5].map((amount) => (
                    <Button
                      key={amount}
                      variant={selectedAmount === amount ? 'default' : 'outline'}
                      className="w-[30%]"
                      onClick={() => {
                        setSelectedAmount(amount)
                        setCustomAmount('')
                      }}
                    >
                      <Coffee className="mr-2 h-4 w-4" />
                      ${amount}
                    </Button>
                  ))}
                </div>
                
                <div className="mb-4">
                  <Input
                    type="number"
                    min="1"
                    max="1000"
                    placeholder="Or enter custom amount"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value)
                      setSelectedAmount(0)
                    }}
                  />
                  {errors.amount && (
                    <p className="text-sm text-red-500 mt-1">{errors.amount}</p>
                  )}
                </div>

                <div className="space-y-4">
                  <Input
                    placeholder="Your name (optional)"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <Textarea
                    placeholder="Leave a message... (optional)"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <Button
                    className="w-full"
                    onClick={handleSupport}
                    disabled={isProcessing}
                  >
                    {isProcessing ? 'Processing...' : 'Support'}
                  </Button>
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
                <CommentForm 
                  creatorId={creatorData.id} 
                  onCommentAdded={handleNewComment}
                />
                <div className="mt-6">
                  <Suspense fallback={<div>Loading comments...</div>}>
                    <CommentsList 
                      username={params.username}
                      newComment={lastComment}
                    />
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
