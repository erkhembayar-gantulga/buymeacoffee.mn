'use client'

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"

export default function CreatePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [formData, setFormData] = useState({
    username: '',
    bio: ''
  })
  const [error, setError] = useState('')

  if (status === "loading") {
    return <div>Loading...</div>
  }

  if (!session) {
    router.push('/auth/signin')
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    try {
      const response = await fetch('/api/creators', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        router.push(`/${formData.username}`)
      } else {
        const data = await response.json()
        setError(data.error || 'Хуудас үүсгэхэд алдаа гарлаа')
      }
    } catch (error) {
      console.error('Failed to create creator page:', error)
      setError('Хуудас үүсгэхэд алдаа гарлаа')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-muted/50 to-background">
      <Header />
      <main className="container py-8">
        <Card className="mx-auto max-w-2xl">
          <CardHeader>
            <CardTitle>Бүтээгчийн хуудас үүсгэх</CardTitle>
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
                  className={error ? 'border-red-500' : ''}
                />
                {error && (
                  <p className="text-sm text-red-500 mt-1">{error}</p>
                )}
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
                Үүсгэх
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
} 