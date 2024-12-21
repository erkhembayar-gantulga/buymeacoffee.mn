'use client'

import { useState } from 'react'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { useSession } from 'next-auth/react'
import { Smile } from 'lucide-react'

interface CommentFormProps {
  creatorId: number
  onSuccess?: () => void
}

export default function CommentForm({ creatorId, onSuccess }: CommentFormProps) {
  const { data: session } = useSession()
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!session?.user) return
    
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content,
          creatorId,
        }),
      })

      if (response.ok) {
        setContent('')
        onSuccess?.()
      }
    } catch (error) {
      console.error('Failed to post comment:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!session?.user) {
    return null
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src={session.user.image || undefined} />
          <AvatarFallback>
            {session.user.name?.substring(0, 2) || 'U'}
          </AvatarFallback>
        </Avatar>
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Leave a comment..."
          maxLength={500}
          className="flex-1"
        />
      </div>
      <div className="flex justify-between items-center">
        <Button type="button" variant="ghost" size="sm">
          <Smile className="w-4 h-4 mr-2" />
          Add emoji
        </Button>
        <Button 
          type="submit" 
          disabled={!content.trim() || isSubmitting}
        >
          Post comment
        </Button>
      </div>
    </form>
  )
}
