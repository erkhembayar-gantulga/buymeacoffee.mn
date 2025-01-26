'use client'

import { useState, useEffect } from 'react'
import { Comment } from '@/lib/repositories/comment-repository'

interface CommentsListProps {
  username: string
  newComment?: Comment | null
}

export default function CommentsList({ username, newComment }: CommentsListProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadComments = async () => {
      try {
        console.log('loading comments for', username)
        const response = await fetch(`/api/comments/${username}`)
        if (!response.ok) {
          throw new Error('Failed to fetch comments')
        }
        const fetchedComments = await response.json()
        setComments(fetchedComments)
      } catch (error) {
        console.error('Failed to fetch comments:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadComments()
  }, [username])

  useEffect(() => {
    if (newComment) {
      setComments(prevComments => [newComment, ...prevComments])
    }
  }, [newComment])

  if (isLoading) {
    return <div className="bg-white p-6 rounded-lg shadow-md">Loading...</div>
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Comments</h2>
      {comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        <ul className="space-y-4">
          {comments.map((comment) => (
            <li key={comment.id} className="border-b pb-4">
              <p className="font-semibold">{comment.author.name || comment.author.username}</p>
              <p>{comment.content}</p>
              <p className="text-sm text-gray-500">{comment.createdAt}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
