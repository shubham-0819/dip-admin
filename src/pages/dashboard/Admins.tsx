import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AdminData, fetchAdmins, createAdmin, updateAdmin, deleteAdmin, updateAdminPassword } from '@/services/adminService';
import AdminForm from '@/components/dialogs/AdminForm';
import ChangePasswordDialog from '@/components/dialogs/ChangePasswordDialog';
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";

const Admins: React.FC = () => {
  const [admins, setAdmins] = useState<AdminData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<AdminData | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadAdmins();
  }, []);

  const loadAdmins = async () => {
    const data = await fetchAdmins();
    if (data && Array.isArray(data)) {
      setAdmins(data);
    } else {
      setAdmins([]);
      toast({
        title: "Error",
        description: "Failed to load admins",
        variant: "destructive",
      });
    }
  };

  const handleCreateAdmin = async (data: AdminData) => {
    const result = await createAdmin(data);
    if (result) {
      toast({
        title: "Success",
        description: "Admin created successfully",
      });
      setIsCreateDialogOpen(false);
      loadAdmins();
    } else {
      toast({
        title: "Error",
        description: "Failed to create admin",
        variant: "destructive",
      });
    }
  };

  const handleUpdateAdmin = async (data: AdminData) => {
    if (selectedAdmin?._id) {
      // Only include fields that exist in AdminData type
      const updatedData = Object.fromEntries(
        Object.entries(data).filter(([key, value]) =>
          key in selectedAdmin && value !== selectedAdmin[key as keyof AdminData]
        )
      ) as Partial<AdminData>;

      const result = await updateAdmin(selectedAdmin._id, updatedData);
      if (result) {
        toast({
          title: "Success",
          description: "Admin updated successfully",
        });
        setIsEditDialogOpen(false);
        loadAdmins();
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to update admin",
          variant: "destructive",
        });
      }
    }
  };

  const handlePasswordChange = async (password: string) => {
    if (selectedAdmin?._id) {
      //   const result = await updateAdminPassword(selectedAdmin._id, password);
      //   if (result) {
      //     toast({
      //       title: "Success",
      //       description: "Password updated successfully",
      //     });
      //     setIsPasswordDialogOpen(false);
      //   } else {
      //     toast({
      //       title: "Error",
      //       description: result.message || "Failed to update password",
      //       variant: "destructive",
      //     });
      //   }
      updateAdminPassword(selectedAdmin._id, password).then((result) => {
        if (result) {
          toast({
            title: "Success",
            description: "Password updated successfully",
          });
          setIsPasswordDialogOpen(false);
        }
      }).catch((error) => {
        console.log(error);
        toast({
          title: "Error",
          description: error.message || "Failed to update password",
          variant: "destructive",
        });
      });
    }
  };

  const handleToggleActive = async (admin: AdminData) => {
    if (admin._id) {
      const result = await updateAdmin(admin._id, {
        isActive: !admin.isActive
      });
      if (result) {
        toast({
          title: "Success",
          description: `Admin ${admin.firstName} ${admin.lastName} is now ${!admin.isActive ? 'active' : 'inactive'}`,
        });
        loadAdmins();
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to update admin status",
          variant: "destructive",
        });
      }
    }
  };

  const filteredAdmins = admins?.filter(admin =>
    admin.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.email.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Admins</h2>
        <Button onClick={() => setIsCreateDialogOpen(true)}>Create Admin</Button>
      </div>

      <Input
        placeholder="Search admins..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="max-w-sm"
      />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Mobile</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredAdmins.map((admin) => (
            <TableRow key={admin._id}>
              <TableCell>{`${admin.firstName} ${admin.lastName}`}</TableCell>
              <TableCell>{admin.email}</TableCell>
              <TableCell>{admin.mobile}</TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={admin.isActive}
                    onCheckedChange={() => handleToggleActive(admin)}
                  />
                  <span className="text-sm text-muted-foreground">
                    {admin.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedAdmin(admin);
                      setIsEditDialogOpen(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedAdmin(admin);
                      setIsPasswordDialogOpen(true);
                    }}
                  >
                    Change Password
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <AdminForm
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onSubmit={handleCreateAdmin}
        mode="create"
      />

      <AdminForm
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        onSubmit={handleUpdateAdmin}
        initialData={selectedAdmin || undefined}
        mode="edit"
      />

      <ChangePasswordDialog
        isOpen={isPasswordDialogOpen}
        onClose={() => setIsPasswordDialogOpen(false)}
        onSubmit={handlePasswordChange}
        adminName={selectedAdmin ? `${selectedAdmin.firstName} ${selectedAdmin.lastName}` : undefined}
      />
    </div>
  );
};

export default Admins; 