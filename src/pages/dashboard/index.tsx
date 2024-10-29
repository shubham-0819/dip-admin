import { useNavigate } from 'react-router-dom'
import { LogOut, User, Settings, LayoutDashboard } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Dashboard() {
  const navigate = useNavigate()

  const handleLogout = () => {
    // Here you would clear the auth token/state
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="fixed top-0 left-0 h-screen w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
        <div className="flex flex-col h-full">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Dashboard</h2>
          </div>
          
          <nav className="flex-1 p-4 space-y-2">
            <Button variant="ghost" className="w-full justify-start">
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Overview
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <User className="mr-2 h-4 w-4" />
              Profile
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </nav>

          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <Button
              variant="destructive"
              className="w-full"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Welcome back!
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              This is your dashboard. You can start adding your content here.
            </p>
          </div>

          {/* Dashboard Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {[
              { title: 'Total Users', value: '1,234' },
              { title: 'Active Sessions', value: '56' },
              { title: 'Revenue', value: '$12,345' },
            ].map((card, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {card.title}
                </h3>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-2">
                  {card.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}