import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Link as LinkIcon, Copy } from "lucide-react";
import {
  createRegistrationLink,
  getRegistrationLinks,
  removeRegistrationLink
} from "@/services/registrationLinkService";
import {
  CreateRegistrationLinkDialog,
} from "@/components/dialogs/CreateRegistrationLink";
import { getbrandList } from "@/services/bransService";
import { getSpecializations } from "@/services/specializationService";
import { useToast } from "@/hooks/use-toast";
import { DeleteRegistrationLinkDialog } from "@/components/dialogs/DeleteRegistration";

export default function Registration() {
  const [links, setLinks] = useState([]);
  const [selectedLink, setSelectedLink] = useState(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [brands, setBrands] = useState([]);
  const [specializations, setSpecializations] = useState([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchLinks = async () => {
      const data = await getRegistrationLinks();
      if (data) {
        const linkData = data.map((link) => ({
          id: link._id,
          type: link.specializationId.name,
          url: link.link,
          specialization: link.specializationId.name,
          specializationId: link.specializationId._id,
          brand: link.brandId.name,
          brandId: link.brandId._id
        }));
        console.log(linkData);
        setLinks(linkData);
      }
    };
    fetchLinks();
  }, []);

  useEffect(() => {
    const fetchBrands = async () => {
      const res = await getbrandList();
      const brands = res.data.data;
      if (brands) {
        const brandData = brands.map((brand) => ({
          id: brand._id,
          name: brand.name,
        }));
        setBrands(brandData);
      }
    };
    fetchBrands();
  }, []);

  useEffect(() => {
    const fetchSpecializations = async () => {
      const data = await getSpecializations();
      if (data) {
        const specializationData = data.data.map((spec) => ({
          id: spec._id,
          name: spec.name,
        }));
        setSpecializations(specializationData);
      }
    };
    fetchSpecializations();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Registration Links
          </h2>
          <p className="text-muted-foreground">
            Manage registration invitation links.
          </p>
        </div>
        <Button
          onClick={() => {
            setIsCreateDialogOpen(true);
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Generate Link
        </Button>
      </div>

      <div className="rounded-md border">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead>
              <tr className="border-b">
                <th className="h-12 px-4 text-left align-middle font-medium">
                  Specialization
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium">
                  Brand
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium">
                  Link
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {links.map((link) => (
                <tr key={link.id} className="border-b">
                  <td className="p-4 align-middle">
                    <div className="flex items-center gap-2">
                      {link.specialization}
                    </div>
                  </td>
                  <td className="p-4 align-middle">
                    <div className="flex items-center gap-2">{link.brand}</div>
                  </td>

                  <td className="p-4 align-middle">
                    <div className="flex items-center gap-2">
                      <LinkIcon className="h-4 w-4" />
                      <span className="truncate max-w-[300px]">{link.url}</span>
                      <Button variant="ghost" size="sm">
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>

                  <td className="p-4 align-middle">
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500"
                        onClick={() => {
                          setSelectedLink(link)
                          setIsDeleteDialogOpen(true)
                        }}
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
      <CreateRegistrationLinkDialog
        open={isCreateDialogOpen}
        onClose={() => {
          setIsCreateDialogOpen(false);
        }}
        onSubmit={async (data) => {
          try {
            data.link = data.url;
            await createRegistrationLink(data);
            const updatedLinks = await getRegistrationLinks();
            if (updatedLinks) {
              const linkData = updatedLinks.map((link) => ({
                id: link._id,
                type: link.specializationId.name,
                url: link.link,
                specialization: link.specializationId.name,
                specializationId: link.specializationId._id,
                brand: link.brandId.name,
                brandId: link.brandId._id
              }));
              setLinks(linkData);
            }
            toast({
              title: "Link created successfully",
              description:
                "The registration link has been created successfully.",
            });
            setIsCreateDialogOpen(false);
          } catch (error) {
            toast({
              title: "Failed to create link",
              description: error.response.data.message,
            });
          }
        }}
        brands={brands}
        specializations={specializations}
      />

      <DeleteRegistrationLinkDialog
        open={isDeleteDialogOpen}
        onClose={() => {
          setIsDeleteDialogOpen(false);
        }}
        onConfirm={async () => {
          try {
            if(!selectedLink) return;
            
            await removeRegistrationLink(
              selectedLink.specializationId,
              selectedLink.brandId
            );
            const updatedLinks = await getRegistrationLinks();
            if (updatedLinks) {
              const linkData = updatedLinks.map((link) => ({
                id: link._id,
                type: link.specializationId.name,
                url: link.link,
                specialization: link.specializationId.name,
                brand: link.brandId.name,
              }));
              setLinks(linkData);
            }
            toast({
              title: "Link deleted successfully",
              description:
                "The registration link has been deleted successfully.",
            });
            setIsDeleteDialogOpen(false);
          } catch (error) {
            toast({
              title: "Failed to delete link",
              description: error.response.data.message,
            });
          }
        }}
      />
    </div>
  );
}
