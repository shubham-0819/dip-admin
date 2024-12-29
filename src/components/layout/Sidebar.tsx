import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  LayoutDashboard,
  UserRound,
  Building2,
  Stethoscope,
  Link as LinkIcon,
  Smartphone,
  Settings,
  MailOpen,
  LogOut,
  ShieldCheck,
  Scroll,
  Users,
  AlertCircle,
  Pill,
  TestTube
} from 'lucide-react'
import dipLogoDark from '../../public/dip-logo-dark.svg'
import dipLogoLight from '../../public/dip-logo-light.svg'
import { useTheme } from 'next-themes'

const navItems = [
  { icon: LayoutDashboard, label: 'Overview', path: '/dashboard' },
  { icon: UserRound, label: 'Doctors', path: '/dashboard/doctors' },
  { icon: Building2, label: 'Brands', path: '/dashboard/brands' },
  { icon: Stethoscope, label: 'Specializations', path: '/dashboard/specializations' },
  { icon: LinkIcon, label: 'Registration Links', path: '/dashboard/registration' },
  { icon: MailOpen, label: 'Invitation', path: '/dashboard/invitation' },
  { icon: Smartphone, label: 'APK Links', path: '/dashboard/apk-links' },
  { icon: ShieldCheck, label: 'Admins', path: '/dashboard/admins' },
  { icon: Users, label: 'Sub Admins', path: '/dashboard/subadmins' },
  { icon: AlertCircle, label: 'Problems', path: '/dashboard/problems' },
  { icon: Pill, label: 'Medicines', path: '/dashboard/medicines' },
  { icon: TestTube, label: 'Tests', path: '/dashboard/tests' },
  { icon: Settings, label: 'Admin Profile', path: '/dashboard/profile' },
  { icon: Scroll, label: 'Logs', path: '/dashboard/logs' },
]

const logout = () => {
  localStorage.removeItem('accessToken')
  window.location.href = '/login'
}

interface SidebarProps {
  isOpen: boolean
}

export default function Sidebar({ isOpen }: SidebarProps) {
  const location = useLocation()
  const { theme } = useTheme()
  
  return (
    <aside className={cn(
      "fixed top-0 left-0 h-screen bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 z-40",
      isOpen ? "w-64" : "w-16"
    )}>
      <div className="flex flex-col h-full">
        <div className={cn("p-4", !isOpen && "p-4")}>
          {isOpen ? (
            <img 
              src={theme === 'dark' ? dipLogoLight : dipLogoDark} 
              alt="dentist india plus logo" 
              className="h-8 w-auto" 
            />
          ) : (
            <LayoutDashboard className="h-6 w-6 text-gray-800 dark:text-white" />
          )}
        </div>
        
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={location.pathname === item.path ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start hover:bg-gray-100 dark:hover:bg-gray-700",
                    !isOpen && "px-2 justify-center"
                  )}
                >
                  <Icon className={cn("h-4 w-4", isOpen && "mr-2")} />
                  {isOpen && item.label}
                </Button>
              </Link>
            )
          })}
        </nav>
        <div className="p-4">
          <Button 
            onClick={logout} 
            variant="ghost" 
            className={cn(
              "w-full justify-start hover:text-red-600 hover:bg-red-50",
              !isOpen && "px-2 justify-center"
            )}
          >
            <LogOut className={cn("h-4 w-4", isOpen && "mr-2")} />
            {isOpen && "Logout"}
          </Button>
        </div>
      </div>
    </aside>
  )
}