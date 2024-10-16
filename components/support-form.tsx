'use client'

import { useState } from 'react'
import Button from './button'

interface SupportFormProps {
  username: string
}

export default function SupportForm({ username }: SupportFormProps) {
  const [amount, setAmount] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement support submission logic
    console.log(`Supporting ${username} with $${amount} and message: ${message}`)
    // Reset form
    setAmount('')
    setMessage('')
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-bold mb-4">Support {username}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="amount" className="block mb-2">Amount ($)</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block mb-2">Message (optional)</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-2 border rounded"
            rows={4}
          ></textarea>
        </div>
        <Button type="submit">Send Support</Button>
      </form>
    </div>
  )
}
