'use client'

import { Coffee } from "lucide-react"
import SignInButton from "@/components/SignInButton"

interface HeaderProps {
  showLoginButton?: boolean
}

export default function Header({ showLoginButton = true }: HeaderProps) {
  return (
    <header className="border-b">
      <div className="container flex items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Coffee className="h-6 w-6" />
          <h1 className="text-xl font-semibold">Надад кофе авч өгөөч</h1>
        </div>
        {showLoginButton && (
          <SignInButton />
        )}
      </div>
    </header>
  )
}
