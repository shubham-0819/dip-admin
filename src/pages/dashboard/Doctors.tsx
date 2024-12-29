import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Stethoscope } from "lucide-react";
import { DataTable } from "@/components/ui/data-table";
import { getDoctors } from "@/services/doctorService";
import { DeleteDoctorDialog } from "@/components/dialogs/DeleteDoctor";
import { CreateDoctorSheet } from "@/components/dialogs/CreateDoctor";
import { Badge } from "@/components/ui/badge";

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const loadDoctors = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await getDoctors();
      const formattedDoctors = response.data.map((doctor) => ({
        id: doctor._id,
        name: doctor.personalInfo.name,
        email: doctor.personalInfo.email,
        phone: doctor.personalInfo.phone,
        specialization: doctor.specialization,
        experience: doctor.experience,
        status: doctor.isDeleted ? "Inactive" : "Active",
      }));
      setDoctors(formattedDoctors);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDoctors();
  }, []);

  const filteredDoctors = doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.phone.includes(searchTerm)
  );

  const columns = [
    { header: "Name", accessorKey: "name" },
    { header: "Phone", accessorKey: "phone" },
    { header: "Email", accessorKey: "email" },
    { 
      header: "Status", 
      accessorKey: "status",
      cell: (doctor) => (
        <Badge variant={doctor.status === "Active" ? "success" : "destructive"}>
          {doctor.status}
        </Badge>
      )
    },
    {
      header: "Actions",
      accessorKey: "id",
      cell: (doctor) => (
        <div className="flex gap-2">
          <Button variant="ghost" size="sm">
            Edit
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-red-500"
            onClick={() => {
              setSelectedDoctor(doctor);
              setOpenDeleteDialog(true);
            }}
          >
            Delete
          </Button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Doctors</h2>
          <p className="text-muted-foreground">
            Manage your registered doctors here.
          </p>
        </div>
        <div className="flex gap-4 items-center">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search doctors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 w-[250px]"
            />
          </div>
          <Button onClick={() => setOpenAddDialog(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Doctor
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <DataTable
          data={filteredDoctors}
          columns={columns}
          isLoading={isLoading}
          error={error}
          onRetry={loadDoctors}
          emptyState={{
            title: "No doctors found",
            description: "Get started by adding your first doctor.",
            icon: <Stethoscope className="h-8 w-8 text-muted-foreground" />,
            action: {
              label: "Add Doctor",
              onClick: () => setOpenAddDialog(true)
            }
          }}
        />
      </div>

      <DeleteDoctorDialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        onConfirm={() => {
          console.log("confirm");
          setOpenDeleteDialog(false);
        }}
        doctorName={selectedDoctor?.name}
      />

      <CreateDoctorSheet
        open={openAddDialog}
        onClose={() => setOpenAddDialog(false)}
        onSubmit={() => {
          console.log("confirm");
          // setOpenAddDialog(false);
        }}
        specializations={[
          { id: "1", name: "Specialization 1" },
          { id: "2", name: "Specialization 2" },
          { id: "3", name: "Specialization 3" },
        ]}
        brands={[
          { id: "1", name: "Brand 1" },
          { id: "2", name: "Brand 2" },
          { id: "3", name: "Brand 3" },
        ]}
        cities={[
          { id: "1", name: "City 1" },
          { id: "2", name: "City 2" },
          { id: "3", name: "City 3" },
        ]}
      />
    </div>
  );
}