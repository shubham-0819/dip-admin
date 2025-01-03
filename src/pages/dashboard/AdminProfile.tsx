import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { User, Mail, Phone, MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ChangePassword } from '@/components/dialogs/ChangePassword';
import { getAdminProfile } from '@/services/adminService';

export default function AdminProfile() {
  const [openChangePassword, setOpenChangePassword] = useState(false);
  const [adminData, setAdminData] = useState<any>(null);
  const [fullName, setFullName] = useState<string>('');

  useEffect(() => {
    const fetchAdminDetails = async () => {
      const id = localStorage.getItem('userId');
      if (!id) return;
      const adminDetail = await getAdminProfile(id);
      setFullName(adminDetail.data.firstName + ' ' + adminDetail.data.lastName);
     
      setAdminData(adminDetail.data);
    };

    fetchAdminDetails();
  }, []);


  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Admin Profile</h2>
        <p className="text-muted-foreground">Manage your account settings.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-8">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="name"
                placeholder="John Doe"
                className="pl-10"
                defaultValue={fullName}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                className="pl-10"
                defaultValue={adminData?.email}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="phone"
                placeholder="+1 (555) 000-0000"
                className="pl-10"
                defaultValue={adminData?.mobile}
              />
            </div>
          </div>

          {/* <Button className="w-full">Save Changes</Button> */}
        </div>

        <div className="space-y-6">
          {/* <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
            <h3 className="font-semibold text-lg mb-4">Profile Picture</h3>
            <div className="flex items-center justify-center p-6 border-2 border-dashed rounded-lg">
              <div className="text-center">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces"
                  alt="Profile"
                  className="rounded-full w-24 h-24 mx-auto mb-4"
                />
                <Button variant="outline">Change Picture</Button>
              </div>
            </div>
          </div> */}

          {/* <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
            <h3 className="font-semibold text-lg mb-4">Security</h3>
            <div className="space-y-4">
              <Button variant="outline" className="w-full"
                onClick={() => { setOpenChangePassword(true) }}
              >Change Password</Button>
            </div>
          </div> */}
        </div>
      </div>
      <ChangePassword 
        open={openChangePassword} 
        onClose={() => { setOpenChangePassword(false) }}
        onSubmit={() => { 
          console.log('Change password form submitted')
          setOpenChangePassword(false)
        }} />
    </div>
  )
}