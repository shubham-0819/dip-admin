import { Menu, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTheme } from 'next-themes'
import { MoonIcon, SunIcon } from 'lucide-react'
import dipLogoDark from '../../public/dip-logo-dark.svg'
import dipLogoLight from '../../public/dip-logo-light.svg'

interface HeaderProps {
  toggleSidebar: () => void
  isSidebarOpen: boolean
  userInfo?: {
    firstName: string
    email: string
  }
}

export default function Header({ toggleSidebar, isSidebarOpen, userInfo }: HeaderProps) {
  const { theme, setTheme } = useTheme()

  return (
    <header className={`fixed top-0 right-0 left-0 h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 z-50 transition-all duration-300 ${
      isSidebarOpen ? 'md:ml-64' : 'ml-0'
    }`}>
      <div className="flex items-center justify-between h-full px-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            <Menu className="h-6 w-6" />
          </Button>
          
          {!isSidebarOpen && (
            <img 
              src={theme === 'dark' ? dipLogoLight : dipLogoDark} 
              alt="Dentist India Plus" 
              className="h-8 w-auto" 
            />
          )}
        </div>
        
        <div className="ml-auto flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? (
              <SunIcon className="h-5 w-5" />
            ) : (
              <MoonIcon className="h-5 w-5" />
            )}
          </Button>

          {userInfo && (
            <div className="flex items-center gap-3 border-1 border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2">
              <div className="text-right">
                <p className="text-sm font-medium leading-none">{userInfo.firstName}</p>
                <p className="text-xs text-muted-foreground mt-1">{userInfo.email}</p>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full"
              >
                <User className="h-5 w-5" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}