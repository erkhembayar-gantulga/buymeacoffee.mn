'use client'

import { useState, useEffect } from 'react'

interface Comment {
  id: number
  username: string
  content: string
  createdAt: string
}

interface CommentsListProps {
  username: string
}

export default function CommentsList({ username }: CommentsListProps) {
  const [comments, setComments] = useState<Comment[]>([])

  useEffect(() => {
    // Simulating API call to fetch comments
    const fetchComments = async () => {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      setComments([
        { id: 1, username: 'fan1', content: 'Great work!', createdAt: '2023-04-01' },
        { id: 2, username: 'supporter2', content: 'Keep it up!', createdAt: '2023-04-02' },
      ])
    }

    fetchComments()
  }, [username])

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Comments</h2>
      {comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        <ul className="space-y-4">
          {comments.map((comment) => (
            <li key={comment.id} className="border-b pb-4">
              <p className="font-semibold">{comment.username}</p>
              <p>{comment.content}</p>
              <p className="text-sm text-gray-500">{comment.createdAt}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
