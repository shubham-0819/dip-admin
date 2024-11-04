// src/pages/Invitations.tsx
import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
// import { SendInvitationDialog } from "@/components/dialogs/SendInvitation";
import { DeleteInvitationDialog } from "@/components/dialogs/DeleteInvitation";
import { useToast } from "@/hooks/use-toast";
import {
  deleteInvitation,
} from "@/services/invitationService";
import { getApkLinks, resendApkLink, deleteApkLink } from "@/services/apkService";
import { getbrandList } from "@/services/bransService";
import { getSpecializations } from "@/services/specializationService";
// import { getCityList } from "@/services/cityService";
import { ResendInvitationDialog } from "@/components/dialogs/ResendInvitation";
import SendApkLinkDialog from "@/components/dialogs/SendApkLink";
import DeleteApkLinkDialog from "@/components/dialogs/DeleteApkLink";

export default function ApkLinks() {
  const [invitations, setInvitations] = useState([]);
  const [selectedInvitation, setSelectedInvitation] = useState(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isResendDialogOpen, setIsResendDialogOpen] = useState(false);
  const [brands, setBrands] = useState([]);
  const [specializations, setSpecializations] = useState([]);
  const [cities, setCities] = useState<{ id: string; name: string }[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchInvitations = async () => {
      const data = await getApkLinks();
      if (data?.data?.data) {
        const invitationData = data?.data?.data.map((invitation) => ({
          id: invitation.id,
          email: invitation.email,
          phone: invitation.phone,
          brand: invitation.brand,
          brandId: invitation.brandId,
          specialization: invitation.specialization,
          specializationId: invitation.specializationId,
          city: invitation.city,
          sendCount: invitation.sendCount,
        }));
        setInvitations(invitationData);
      }
    };
    fetchInvitations();
  }, []);

  useEffect(() => {
    const fetchMetadata = async () => {
      const brandsData = (await getbrandList()).data.data;
      const specializationsData = (await getSpecializations()).data;
      const citiesData = [
        { _id: "1", name: "City 1" },
        { _id: "2", name: "City 2" },
        { _id: "3", name: "City 3" },
      ];

      console.log(brandsData);
      console.log(specializationsData);
      console.log(citiesData);

      if (brandsData) {
        setBrands(
          brandsData.map((b) => ({ id: b._id, name: b.name }))
        );
      }
      if (specializationsData) {
        setSpecializations(
          specializationsData.map((s) => ({
            id: s._id,
            name: s.name,
          }))
        );
      }
      if (citiesData) {
        setCities(citiesData.map((c) => ({ id: c._id, name: c.name })));
      }
    };
    fetchMetadata();
  }, []);


  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Apk Links</h2>
          <p className="text-muted-foreground">Manage Apk links</p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Send New Apk Link
        </Button>
      </div>

      <div className="rounded-md border">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead>
              <tr className="border-b">
                <th className="h-12 px-4 text-left align-middle font-medium">
                  Email
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium">
                  Phone
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium">
                  Brand
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium">
                  Specialization
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium">
                  City
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium">
                  Sent Count
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {invitations.map((invitation) => (
                <tr key={invitation.id} className="border-b">
                  <td className="p-4">{invitation.email}</td>
                  <td className="p-4">{invitation.phone}</td>
                  <td className="p-4">{invitation.brand}</td>
                  <td className="p-4">{invitation.specialization}</td>
                  <td className="p-4">{invitation.city}</td>
                  <td className="p-4">{invitation.sendCount}</td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedInvitation(invitation);
                          setIsResendDialogOpen(true);
                        }}
                      >
                        Resend
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => {
                          setSelectedInvitation(invitation);
                          setIsDeleteDialogOpen(true);
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

      <SendApkLinkDialog
        open={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        brandList={brands}
        specializationList={specializations}
        cityList={cities}
        onSuccess={async () => {
          const data = await getApkLinks();
          if (data?.data?.data) {
            const invitationData = data?.data?.data.map((invitation) => ({
              id: invitation.id,
              email: invitation.email,
              phone: invitation.phone,
              brand: invitation.brand,
              brandId: invitation.brandId,
              specialization: invitation.specialization,
              specializationId: invitation.specializationId,
              city: invitation.city,
              sendCount: invitation.sendCount,
            }));
            setInvitations(invitationData);
          }
          setIsCreateDialogOpen(false);
        }}
      />

      <ResendInvitationDialog
        open={isResendDialogOpen}
        onClose={() => setIsResendDialogOpen(false)}
        invitation={selectedInvitation}
        onSuccess={async () => {
          const data = await getApkLinks();
          if (data?.data?.data) {
            const invitationData = data?.data?.data.map((invitation) => ({
              id: invitation.id,
              email: invitation.email,
              phone: invitation.phone,
              brand: invitation.brand,
              brandId: invitation.brandId,
              specialization: invitation.specialization,
              specializationId: invitation.specializationId,
              city: invitation.city,
              sendCount: invitation.sendCount,
            }));
            setInvitations(invitationData);
          }
          setIsResendDialogOpen(false);
        }}
      />

      <DeleteApkLinkDialog
        open={isDeleteDialogOpen}
        onClose={() => {
          setIsDeleteDialogOpen(false);
          setSelectedInvitation(null);
        }}
        onConfirm={async () => {
          try {
            if (!selectedInvitation) return;
            await deleteApkLink(selectedInvitation.id);
            const data = await getApkLinks();
            if (data?.data?.data) {
              const invitationData = data?.data?.data.map((invitation) => ({
                id: invitation.id,
                email: invitation.email,
                phone: invitation.phone,
                brand: invitation.brand,
                brandId: invitation.brandId,
                specialization: invitation.specialization,
                specializationId: invitation.specializationId,
                city: invitation.city,
                sendCount: invitation.sendCount,
              }));
              setInvitations(invitationData);
            }
            toast({
              title: "Apk link deleted successfully",
            });
            setIsDeleteDialogOpen(false);
          } catch (error) {
            console.log(error);
            toast({
              title: "Failed to delete Apk link",
              description: error.response?.data?.message,
              variant: "destructive",
            });
          }
        }}
      // invitation={selectedInvitation}
      />
    </div>
  );
}
