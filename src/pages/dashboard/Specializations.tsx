import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchBrands = async () => {
      const data = await getSpecializations();
      if (data) {
        setSpecializations(data.data||[]);
      }
    };
    fetchBrands();
  }, []);

  const filteredSpecializations = specializations.filter((spec) =>
    spec.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Specializations</h2>
          <p className="text-muted-foreground">
            Manage medical specializations here.
          </p>
        </div>
        <div className="flex gap-4 items-center">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search specializations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 w-[250px]"
            />
          </div>
          <Button onClick={() => setOpenCreateModal(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Specialization
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Icon</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSpecializations.map((spec) => (
              <TableRow key={spec._id}>
                <TableCell>
                  {spec?.icons[0] && (
                    <img
                      src={spec.icons[0].url}
                      alt={spec.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  )}
                </TableCell>
                <TableCell className="font-medium">{spec.name}</TableCell>
                <TableCell className="text-muted-foreground">
                  {spec.description}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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
