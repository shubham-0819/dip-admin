import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, UserCog } from "lucide-react";
import { DataTable } from "@/components/ui/data-table";
import {
  AdminData,
  fetchAdmins,
  createAdmin,
  updateAdmin,
  updateAdminPassword,
} from "@/services/adminService";
import AdminForm from "@/components/dialogs/AdminForm";
import ChangePasswordDialog from "@/components/dialogs/ChangePasswordDialog";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";

const Admins: React.FC = () => {
  const [admins, setAdmins] = useState<AdminData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<AdminData | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadAdmins();
  }, []);

  const loadAdmins = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await fetchAdmins();
      if (data && Array.isArray(data)) {
        setAdmins(data);
      } else {
        throw new Error("Failed to load admins");
      }
    } catch (err) {
      setError(err as Error);
      toast({
        title: "Error",
        description: "Failed to load admins",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
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
        Object.entries(data).filter(
          ([key, value]) =>
            key in selectedAdmin &&
            value !== selectedAdmin[key as keyof AdminData]
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
      updateAdminPassword(selectedAdmin._id, password)
        .then((result) => {
          if (result) {
            toast({
              title: "Success",
              description: "Password updated successfully",
            });
            setIsPasswordDialogOpen(false);
          }
        })
        .catch((error) => {
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
        isActive: !admin.isActive,
      });
      if (result) {
        toast({
          title: "Success",
          description: `Admin ${admin.firstName} ${admin.lastName} is now ${
            !admin.isActive ? "active" : "inactive"
          }`,
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

  const filteredAdmins =
    admins?.filter(
      (admin) =>
        admin.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        admin.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        admin.email.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  const columns = [
    {
      header: "First Name",
      accessorKey: "firstName"
    },
    {
      header: "Last Name",
      accessorKey: "lastName"
    },
    { header: "Email", accessorKey: "email" },
    { header: "Mobile", accessorKey: "mobile" },
    {
      header: "Status",
      accessorKey: "isActive",
      cell: ({
        row,
      }: {
        row: { getValue: (key: string) => boolean; original: AdminData };
      }) => (
        <div className="flex items-center space-x-2">
          {row && row.getValue("isActive") ? (
            <Switch
              checked={row.getValue("isActive")}
              onChange={() => handleToggleActive(row.original)}
            />
          ) : (
            <Switch
              checked={false}
              onChange={() => handleToggleActive(row.original)}
            />
          )}
          {/* <span className="text-sm text-muted-foreground">
            {row.getValue("isActive") ? 'Active' : 'Inactive'}
          </span> */}
        </div>
      ),
    },
    {
      header: "Actions",
      cell: (row: { row: { original: AdminData } }) => (
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSelectedAdmin(row.row.original);
              setIsEditDialogOpen(true);
            }}
          >
            Edit
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSelectedAdmin(row.row.original);
              setIsPasswordDialogOpen(true);
            }}
          >
            Change Password
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Admins</h2>
          <p className="text-muted-foreground">
            Manage system administrators here.
          </p>
        </div>
        <div className="flex gap-4 items-center">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search admins..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 w-[250px]"
            />
          </div>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Admin
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <DataTable
          data={filteredAdmins}
          columns={columns}
          isLoading={isLoading}
          error={error}
          onRetry={loadAdmins}
          emptyState={{
            title: "No admins found",
            description: "Get started by adding your first admin.",
            icon: <UserCog className="h-8 w-8 text-muted-foreground" />,
            action: {
              label: "Add Admin",
              onClick: () => setIsCreateDialogOpen(true),
            },
          }}
        />
      </div>

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
        adminName={
          selectedAdmin
            ? `${selectedAdmin.firstName} ${selectedAdmin.lastName}`
            : undefined
        }
      />
    </div>
  );
};

export default Admins;
