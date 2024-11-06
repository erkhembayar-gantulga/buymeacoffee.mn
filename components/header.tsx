import { Coffee } from "lucide-react"
import { Button } from "@/components/ui/button"

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
          <Button 
            variant="outline" 
            className="border-2 border-emerald-500 text-emerald-500 
              hover:bg-emerald-50 bg-white"
          >
            Нэвтрэх
          </Button>
        )}
      </div>
    </header>
  )
}
