import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { getDoctors } from "@/services/doctorService";
import { DeleteDoctorDialog } from "@/components/dialogs/DeleteDoctor";
// import { EditDoctorDialog } from "@/components/dialogs/EditDoctor";
import { CreateDoctorSheet } from "@/components/dialogs/CreateDoctor";

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  // const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false);

  useEffect(() => {
    getDoctors().then((data) => {
      console.log(data);
      const doctors = data.data.map((doctor) => ({
        id: doctor._id,
        name: doctor.personalInfo.name,
        email: doctor.personalInfo.email,
        phone: doctor.personalInfo.phone,
        // city: doctor.personalInfo.city,
        specialization: doctor.specialization,
        experience: doctor.experience,
        status: doctor.isDeleted ? "Inactive" : "Active",
      }));
      setDoctors(doctors);
    });
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Doctors</h2>
          <p className="text-muted-foreground">
            Manage your registered doctors here.
          </p>
        </div>
        <Button
          onClick={() => setOpenAddDialog(true)}
          className="flex items center"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Doctor
        </Button>
      </div>

      <div className="rounded-md border">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <th className="h-12 px-4 text-left align-middle font-medium">
                  Name
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium">
                  Phone
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium">
                  Email
                </th>
                {/* <th className="h-12 px-4 text-left align-middle font-medium">City</th> */}
                <th className="h-12 px-4 text-left align-middle font-medium">
                  Status
                </th>

                <th className="h-12 px-4 text-left align-middle font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {doctors.map((doctor) => (
                <tr
                  key={doctor.id}
                  className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                >
                  <td className="p-4 align-middle">{doctor.name}</td>
                  <td className="p-4 align-middle">{doctor.phone}</td>
                  <td className="p-4 align-middle">{doctor.email}</td>
                  {/* <td className="p-4 align-middle">{doctor.city}</td> */}
                  <td className="p-4 align-middle">
                    <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
                      {doctor.status}
                    </span>
                  </td>
                  <td className="p-4 align-middle">
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500"
                        onClick={() => setOpenDeleteDialog(true)}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <DeleteDoctorDialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        onConfirm={() => {
          console.log("confirm");
          setOpenDeleteDialog(false);
        }}
      />

      {/* <EditDoctorDialog
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
        onConfirm={() => {
          console.log("confirm");
          setOpenEditDialog(false);
        }}
      /> */}

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
