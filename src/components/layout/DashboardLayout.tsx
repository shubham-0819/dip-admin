import { useState,useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar';
import cn from 'classnames';
import { getAdminProfile } from '@/services/adminService';

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const userId = localStorage.getItem('userId');
  const [adminData, setAdminData] = useState<any>(null);

  useEffect(() => {
    const fetchAdminDetails = async () => {
      if (userId) {
        const adminDetail = await getAdminProfile(userId);
        setAdminData(adminDetail.data);
      }
    };

    fetchAdminDetails();
  }, [userId]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 h-full overflow-hidden">
      <Sidebar isOpen={sidebarOpen} />
      <Header 
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
        isSidebarOpen={sidebarOpen}
        userInfo={adminData}
      />
      
      <main className={cn(
        "transition-all duration-300 pt-16 h-full overflow-hidden",
        sidebarOpen ? "md:ml-64" : "ml-16"
      )}>
        <div className="p-8 h-full overflow-hidden">
          <Outlet />
        </div>
      </main>
    </div>
  )
}