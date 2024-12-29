import {
  HashRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Login from './pages/auth/login';
import Signup from './pages/auth/signup';
import DashboardLayout from './components/layout/DashboardLayout';
import Overview from './pages/dashboard/Overview';
import Doctors from './pages/dashboard/Doctors';
import Brands from './pages/dashboard/Brands';
import Specializations from './pages/dashboard/Specializations';
import Registration from './pages/dashboard/Registration';
import ApkLinks from './pages/dashboard/ApkLinks';
import AdminProfile from './pages/dashboard/AdminProfile';
import Invitations from './pages/dashboard/Invitations';
import Logs from './pages/dashboard/Logs';
import Admins from './pages/dashboard/Admins';
import SubAdmins from './pages/dashboard/SubAdmins';
import Problems from './pages/dashboard/Problems';
import Medicines from './pages/dashboard/Medicines';
import Tests from './pages/dashboard/Tests';
import { ThemeProvider } from 'next-themes';

function App() {
  const isAuthenticated = localStorage.getItem('accessToken');

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <HashRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route
            path="/dashboard"
            element={
              isAuthenticated ? (
                <DashboardLayout />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          >
            <Route index element={<Overview />} />
            <Route path="doctors" element={<Doctors />} />
            <Route path="brands" element={<Brands />} />
            <Route path="specializations" element={<Specializations />} />
            <Route path="registration" element={<Registration />} />
            <Route path="invitation" element={<Invitations />} />
            <Route path="logs" element={<Logs />} />
            <Route path="apk-links" element={<ApkLinks />} />
            <Route path="profile" element={<AdminProfile />} />
            <Route path="admins" element={<Admins />} />
            <Route path="subadmins" element={<SubAdmins />} />
            <Route path="problems" element={<Problems />} />
            <Route path="medicines" element={<Medicines />} />
            <Route path="tests" element={<Tests />} />
          </Route>

          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;