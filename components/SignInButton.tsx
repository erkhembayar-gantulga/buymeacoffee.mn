'use client'

import { signIn, signOut } from "next-auth/react"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"

export default function SignInButton() {
  const { data: session } = useSession()

  if (session && session.user) {
    return (
      <div className="flex gap-4 items-center">
        <span className="text-emerald-500">{session.user.name}</span>
        <Button 
          variant="outline" 
          className="border-2 border-red-500 text-red-500 
            hover:bg-red-50 bg-white"
          onClick={() => signOut()}
        >
          Гарах
        </Button>
      </div>
    )
  }

  return (
    <Button 
      variant="outline" 
      className="border-2 border-emerald-500 text-emerald-500 
        hover:bg-emerald-50 bg-white"
      onClick={() => signIn("google")}
    >
      Нэвтрэх
    </Button>
  )
}
