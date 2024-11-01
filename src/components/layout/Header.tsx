import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface HeaderProps {
  toggleSidebar: () => void
  openUserProfile: () => void
}

export default function Header({ toggleSidebar, openUserProfile }: HeaderProps) {
  return (
    <header className="fixed top-0 right-0 left-0 h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 z-50 ml-0 md:ml-64 transition-all duration-300">
      <div className="flex items-center justify-between h-full px-4">
        <Button variant="ghost" size="icon" onClick={toggleSidebar}>
          <Menu className="h-6 w-6" />
        </Button>
        
        <div className="ml-auto flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full"
            onClick={openUserProfile}
          >
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=faces"
              alt="User"
              className="rounded-full w-8 h-8"
            />
          </Button>
        </div>
      </div>
    </header>
  )
}