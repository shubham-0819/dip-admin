import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'
import UserProfileDialog from '../dialogs/UserProfileDialog'

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [profileOpen, setProfileOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar isOpen={sidebarOpen} />
      <Header 
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
        openUserProfile={() => setProfileOpen(true)}
      />
      
      <main className={cn(
        "transition-all duration-300 pt-16",
        sidebarOpen ? "md:ml-64" : "ml-0"
      )}>
        <div className="p-8">
          <Outlet />
        </div>
      </main>

      <UserProfileDialog 
        open={profileOpen} 
        onClose={() => setProfileOpen(false)} 
      />
    </div>
  )
}