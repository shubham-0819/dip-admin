import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  getSpecializations,
  createSpecialization,
  deleteSpecialization,
} from "@/services/specializationService";
import { CreateSpecializationDialog } from "@/components/dialogs/CreateSpecialization";
import { toast } from "@/hooks/use-toast";
import { DeleteSpecializationDialog } from "@/components/dialogs/DeleteSpecalization";

export default function Specializations() {
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [specializations, setSpecializations] = useState([]);
  const [selectedSpecialization, setSelectedSpecialization] = useState(null);

  useEffect(() => {
    const fetchBrands = async () => {
      const data = await getSpecializations();
      if (data) {
        setSpecializations(data.data);
      }
    };
    fetchBrands();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Specializations</h2>
          <p className="text-muted-foreground">
            Manage medical specializations here.
          </p>
        </div>
        <Button onClick={() => setOpenCreateModal(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Specialization
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {specializations.map((spec) => (
          <div
            key={spec._id}
            className="rounded-xl border bg-card text-card-foreground shadow-sm"
          >
            {spec?.icons[0] && (
              <div className="flex justify-center mt-4">
                <img
                  src={spec.icons[0].url}
                  alt={spec.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
              </div>
            )}
            <div className="px-6 w-full flex justify-center">
              <h3 className="text-lg font-semibold mb-2">{spec.name}</h3>
            </div>
            <div className="p-6">
              <p className="text-sm text-muted-foreground mb-4">
                {spec.description}
              </p>
              <div className="flex items-center justify-between">
                {/* <span className="text-sm font-medium">
                  {spec.doctors} Doctors
                </span> */}
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedSpecialization(spec);
                    }}
                  >
                    Edit
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-red-500"
                    onClick={() => {
                      setSelectedSpecialization(spec);
                      setOpenDeleteModal(true);
                    }}
                    >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <DeleteSpecializationDialog
        onClose={() => {setOpenDeleteModal(false); setSelectedSpecialization(null);}}
        open={openDeleteModal}
        specializationName={selectedSpecialization?.name}
        onConfirm={async () => {
          try {
            if(!selectedSpecialization?._id) {return;}
            await deleteSpecialization(selectedSpecialization._id);

            const updatedSpecializations = specializations.filter(
              (spec) => spec._id !== selectedSpecialization._id
            );
            setSpecializations(updatedSpecializations);

            toast({
              title: "Specialization Deleted",
              description: "Specialization : " + selectedSpecialization.name,
            });
            const newSpecializations = await getSpecializations();
            setSpecializations(newSpecializations.data);
            setOpenDeleteModal(false);
          } catch (error) {
            console.log(error);
            toast({
              title: "Failed to delete specialization",
              description: error.response.data.message,
              variant: "destructive",
            });
          }
        }}
      />

      <CreateSpecializationDialog
        open={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        onSubmit={async (data) => {
          const userId = localStorage.getItem("userId");
          if (!userId) {
            return;
          }
          const icon = data.icon[0];
          if (!icon) {
            toast({
              title: "Icon Required",
              description: "Please upload an icon for the specialization",
              variant: "destructive",
            });
            return;
          }
          const specializationData = {
            icons: icon,
            name: data.name,
            createdBy: userId,
            updatedBy: userId,
          };

          try {
            await createSpecialization(specializationData);
            toast({
              title: "Specialization Created",
              description: "Specialization : " + specializationData.name,
            });
            const newSpecializations = await getSpecializations();
            setSpecializations(newSpecializations.data);
            setOpenCreateModal(false);
          } catch (error) {
            console.log(error);
            toast({
              title: "Failed to create specialization",
              description: error.response.data.message,
              variant: "destructive",
            });
          }
        }}
      />
    </div>
  );
}
