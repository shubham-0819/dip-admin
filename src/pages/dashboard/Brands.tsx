import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  getbrandList,
  removeBrand,
  createBrand,
} from "@/services/bransService";
import { DeleteBrandDialog } from "@/components/dialogs/DeleteBrand";
import { CreateBrandDialog } from "@/components/dialogs/CreateBrand";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Brands() {
  const { toast } = useToast();
  interface Brand {
    _id: string;
    name: string;
    status: string;
    products: number;
  }

  const [brands, setBrands] = useState<Brand[]>([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchBrands = async () => {
      setIsLoading(true);
      const res = await getbrandList();
      const brands = res.data.data;
      setIsLoading(false);

      if (brands) {
        setBrands(brands);
      }
    };
    fetchBrands();
  }, []);

  const filteredBrands = brands.filter((brand) =>
    brand.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col space-y-6 h-full overflow-hidden">
      <div className="flex justify-between items-center h-14 w-full">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Brands</h2>
          <p className="text-muted-foreground">
            Manage your medical brands here.
          </p>
        </div>
        <div className="flex flex-1 p-2 overflow-hidden gap-4 justify-end ">
          <div className="relative min-w-52 ">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search brands..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 w-[200px]"
            />
          </div>
          <Button
            onClick={() => {
              setOpenCreateDialog(true);
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Brand
          </Button>
        </div>
      </div>

      <div className="rounded-md border flex-1 overflow-hidden">
        <div className="overflow-y-auto h-full">
          <Table>
            <TableHeader className="sticky top-0 bg-background z-10 border-b">
              <TableRow>
                <TableHead>Brand Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBrands.map((brand) => (
                <TableRow key={brand._id}>
                  <TableCell className="font-medium">{brand.name}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
                      {brand.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" disabled={isLoading}>
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-500"
                        onClick={() => {
                          setSelectedBrand(brand);
                          setOpenDeleteDialog(true);
                        }}
                        disabled={isLoading}
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
      </div>
      <DeleteBrandDialog
        open={openDeleteDialog}
        onClose={() => {
          setOpenDeleteDialog(false);
        }}
        onConfirm={() => {
          console.log("Delete Brand");
          if (selectedBrand) {
            setIsLoading(true);
            removeBrand(selectedBrand?._id)
              .then(() => {
                setSelectedBrand(null);
                setIsLoading(false);
                // update brand list
                console.log(brands);

                const updatedBrands = brands.filter(
                  (brand) => brand._id != selectedBrand._id
                );
                console.log(updatedBrands);

                setBrands(updatedBrands);
              })
              .catch((error) => {
                console.log(error);
                setIsLoading(false);
              });
          }
          setOpenDeleteDialog(false);
        }}
        brandName={selectedBrand?.name}
      />

      <CreateBrandDialog
        open={openCreateDialog}
        onClose={() => {
          setOpenCreateDialog(false);
        }}
        onSubmit={async (data) => {
          try {
            const userId = localStorage.getItem("userId");
            if (!userId) return;
            const brandData = {
              name: data.brandName,
              createdBy: userId,
              updatedBy: userId,
            };
            await createBrand(brandData);
            const res = await getbrandList();
            const updatedList = res.data.data;
            setBrands(updatedList);
            toast({
              variant: "default",
              title: "Brand Created",
              description: "Brand Name: " + data.brandName,
            });
            setOpenCreateDialog(false);
          } catch (error) {
            console.log(error);
            toast({
              variant: "destructive",
              title: "Failed to create brand",
              description: "error: " + error.response.data.message,
            });
          }
        }}
      />
    </div>
  );
}
