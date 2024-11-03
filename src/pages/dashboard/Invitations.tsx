// src/pages/Invitations.tsx
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { SendInvitationDialog } from "@/components/dialogs/SendInvitation";
import { DeleteInvitationDialog } from "@/components/dialogs/DeleteInvitation";
import { useToast } from "@/hooks/use-toast";
import {
  getInvitations,
  sendInvitation,
  resendInvitation,
  deleteInvitation,
} from "@/services/invitationService";
import { getbrandList } from "@/services/bransService";
import { getSpecializations } from "@/services/specializationService";
import { Plus } from "lucide-react";
// import { getCityList } from "@/services/cityService";

export default function Invitations() {
  const [invitations, setInvitations] = useState([]);
  const [selectedInvitation, setSelectedInvitation] = useState(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [brands, setBrands] = useState([]);
  const [specializations, setSpecializations] = useState([]);
  const [cities, setCities] = useState<{ id: string; name: string }[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchInvitations = async () => {
      const data = await getInvitations();
      if (data) {
        const invitationData = data.map((invitation) => ({
          id: invitation._id,
          email: invitation.email,
          phone: invitation.phone,
          brand: invitation.brandName,
          specialization: invitation.specializationName,
          city: invitation.city,
          sendCount: invitation.sendCount
        }));
        setInvitations(invitationData);
      }
    };
    fetchInvitations();
  }, []);

  useEffect(() => {
    const fetchMetadata = async () => {
      const brandsData = await getbrandList();
      const specializationsData = await getSpecializations();
      const citiesData = [
        { _id: "1", name: "City 1" },
        { _id: "2", name: "City 2" },
        { _id: "3", name: "City 3" },
      ];

      if (brandsData) {
        setBrands(brandsData.data.data.map((b) => ({ id: b._id, name: b.name })));
      }
      if (specializationsData) {
        setSpecializations(
          specializationsData.data.data.map((s) => ({ id: s._id, name: s.name }))
        );
      }
      if (citiesData) {
        setCities(citiesData.map((c) => ({ id: c._id, name: c.name })));
      }
    };
    fetchMetadata();
  }, []);

  const handleSendInvitation = async (data) => {
    try {
      await sendInvitation(data);
      const updatedInvitations = await getInvitations();
      if (updatedInvitations) {
        const invitationData = updatedInvitations.map((invitation) => ({
          id: invitation._id,
          email: invitation.email,
          phone: invitation.phone,
          brand: invitation.brandId.name,
          specialization: invitation.specializationId.name,
          city: invitation.cityId.name,
          status: invitation.status,
          brandId: invitation.brandId._id,
          specializationId: invitation.specializationId._id,
          cityId: invitation.cityId._id,
        }));
        setInvitations(invitationData);
      }
      setIsCreateDialogOpen(false);
      toast({
        title: "Invitation sent successfully",
      });
    } catch (error) {
      toast({
        title: "Failed to send invitation",
        description: error.response?.data?.message,
        variant: "destructive",
      });
    }
  };

  const handleResend = async (invitation) => {
    try {
      await resendInvitation(invitation.id);
      toast({
        title: "Invitation resent successfully",
      });
    } catch (error) {
      toast({
        title: "Failed to resend invitation",
        description: error.response?.data?.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        {/* <h1 className="text-2xl font-bold">Invitations</h1>
         */}
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Invitations</h2>
          <p className="text-muted-foreground">Manage invitation links.</p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Send New Invitation
        </Button>
      </div>

      <div className="rounded-md border">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead>
              <tr className="border-b">
                <th className="h-12 px-4 text-left align-middle font-medium">Email</th>
                <th className="h-12 px-4 text-left align-middle font-medium">Phone</th>
                <th className="h-12 px-4 text-left align-middle font-medium">Brand</th>
                <th className="h-12 px-4 text-left align-middle font-medium">Specialization</th>
                <th className="h-12 px-4 text-left align-middle font-medium">City</th>
                <th className="h-12 px-4 text-left align-middle font-medium">Sent Count</th>
                <th className="h-12 px-4 text-left align-middle font-medium">Actions</th>
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
                        onClick={() => handleResend(invitation)}
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

      <SendInvitationDialog
        open={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onSubmit={handleSendInvitation}
        brandList={brands}
        specializationList={specializations}
        cityList={cities}
      />

      <DeleteInvitationDialog
        open={isDeleteDialogOpen}
        onClose={() => {
          setIsDeleteDialogOpen(false);
          setSelectedInvitation(null);
        }}
        onConfirm={async () => {
          try {
            if (!selectedInvitation) return;
            await deleteInvitation(selectedInvitation.id);
            const updatedInvitations = await getInvitations();
            if (updatedInvitations) {
              const invitationData = updatedInvitations.map((invitation) => ({
                id: invitation._id,
                email: invitation.email,
                phone: invitation.phone,
                brand: invitation.brandId.name,
                specialization: invitation.specializationId.name,
                city: invitation.cityId.name,
                status: invitation.status,
                brandId: invitation.brandId._id,
                specializationId: invitation.specializationId._id,
                cityId: invitation.cityId._id,
              }));
              setInvitations(invitationData);
            }
            toast({
              title: "Invitation deleted successfully",
            });
          } catch (error) {
            toast({
              title: "Failed to delete invitation",
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
