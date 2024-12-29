import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { medicineService, Medicine } from '@/services/medicineService';

export default function Medicines() {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    loadMedicines();
  }, []);

  const loadMedicines = async () => {
    try {
      const response = await medicineService.getAll();
      setMedicines(response.data || []);
    } catch (error) {
      toast({
        title: "Error loading medicines",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const filteredMedicines = medicines.filter(medicine => 
    medicine.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Medicines</h2>
          <p className="text-muted-foreground">Manage medicine inventory</p>
        </div>
        <div className="flex gap-4 items-center">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search medicines..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 w-[250px]"
            />
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Medicine
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Icon</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Doctor</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMedicines.map((medicine) => (
              <TableRow key={medicine._id}>
                <TableCell>
                  {medicine.icon && (
                    <img
                      src={medicine.icon}
                      alt={medicine.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  )}
                </TableCell>
                <TableCell className="font-medium">{medicine.name}</TableCell>
                <TableCell>${medicine.price}</TableCell>
                <TableCell>{medicine.doctorId}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-500">
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}