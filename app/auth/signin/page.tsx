'use client'

import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react"
import { use } from "react"

export default function SignIn() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-full max-w-sm space-y-4 p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Нэвтрэх</h1>
          <p className="text-sm text-gray-500">
            Google хаягаараа нэвтэрнэ үү
          </p>
        </div>
        <Button
          className="w-full"
          onClick={() => signIn("google", { callbackUrl: "/" })}
        >
          Sign in with Google
        </Button>
      </div>
    </div>
  )
}
