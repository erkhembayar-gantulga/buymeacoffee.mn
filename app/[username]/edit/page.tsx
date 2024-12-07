'use client'

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"

export default function EditProfilePage({ 
  params 
}: { 
  params: { username: string } 
}) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [formData, setFormData] = useState({
    username: '',
    bio: ''
  })

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/creators/${params.username}`)
        if (response.ok) {
          const userData = await response.json()
          setFormData({
            username: userData.username,
            bio: userData.bio || ''
          })
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error)
      }
    }

    if (session) {
      fetchUserData()
    }
  }, [session, params.username])

  if (status === "loading") {
    return <div>Loading...</div>
  }

  if (!session) {
    router.push('/auth/signin')
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch(`/api/creators/${params.username}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        router.push(`/${formData.username}`)
      }
    } catch (error) {
      console.error('Failed to update profile:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-muted/50 to-background">
      <Header />
      <main className="container py-8">
        <Card className="mx-auto max-w-2xl">
          <CardHeader>
            <CardTitle>Профайл засах</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium mb-1">
                  Хэрэглэгчийн нэр
                </label>
                <Input
                  id="username"
                  value={formData.username}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    username: e.target.value
                  }))}
                  required
                />
              </div>
              <div>
                <label htmlFor="bio" className="block text-sm font-medium mb-1">
                  Танилцуулга
                </label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    bio: e.target.value
                  }))}
                />
              </div>
              <Button type="submit" className="w-full">
                Хадгалах
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
} 