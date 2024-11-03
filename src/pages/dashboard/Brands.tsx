import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  getbrandList,
  removeBrand,
  createBrand,
} from "@/services/bransService";
import { DeleteBrandDialog } from "@/components/dialogs/DeleteBrand";
import { CreateBrandDialog } from "@/components/dialogs/CreateBrand";
import { useToast } from "@/hooks/use-toast";


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
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchBrands = async () => {
      setIsLoading(true);
      const data = await getbrandList();
      setIsLoading(false);
      if (data) {
        setBrands(data.data);
      }
    };
    fetchBrands();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Brands</h2>
          <p className="text-muted-foreground">
            Manage your medical brands here.
          </p>
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

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {brands.map((brand) => (
          <div
            key={brand._id}
            className="rounded-xl border bg-card text-card-foreground shadow-sm"
          >
            <div className="p-6 flex flex-col space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{brand.name}</h3>
                <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
                  {brand.status}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Total Products: {brand.products}
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  disabled={isLoading}
                >
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 text-red-500"
                  onClick={() => {
                    setSelectedBrand(brand);
                    setOpenDeleteDialog(true);
                  }}
                  disabled={isLoading}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
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
              .then((data) => {
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
            if(!userId) return;
            const brandData = {
              name: data.brandName,
              createdBy: userId,
              updatedBy: userId,
            }
            await createBrand(brandData);
            const updatedList = await getbrandList();
            setBrands(updatedList.data);
            toast({
              variant: "default",
              title: "Brand Created",
              description: "Brand Name: " + data.brandName,
            })
            setOpenCreateDialog(false);
          } catch (error) {
            console.log(error);
            toast({
              variant: "destructive",
              title: "Failed to create brand",
              description: "error: " + error.response.data.message,
            })
          }
        }}
      />
    </div>
  );
}
