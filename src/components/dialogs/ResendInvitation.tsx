import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { resendInvitation } from "@/services/invitationService";

interface ResendInvitationDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => Promise<void>;
  invitation: {
    id: string;
    email?: string;
    phone?: string;
    brand?: string;
    specialization?: string;
  } | null;
}

const validateAndResend = async (data: any) => {
  console.log(data);
  const { id } = data;
  if (!id) {
    throw new Error("Invalid invitation id");
  }
  console.log("Resending invitation with id:", id);
  return resendInvitation(id);
};

export function ResendInvitationDialog({
  open,
  onClose,
  onSuccess,
  invitation,
}: ResendInvitationDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleConfirm = async () => {
    try {
      setIsLoading(true);
      await validateAndResend(invitation);
      onClose();
      toast({
        title: "Invitation resent",
        description: "The invitation has been resent successfully.",
      });
      onSuccess();
    } catch (error) {
      console.error("Failed to resend invitation:", error);
      toast({
        title: "Failed to resend invitation",
        description:
          error.response?.data?.message ||
          "An error occurred while resending the invitation.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Resend Invitation</DialogTitle>
          <DialogDescription className="space-y-2">
            <p>Are you sure you want to resend the invitation to:</p>
            {invitation?.email && (
              <p className="font-medium">Email: {invitation.email}</p>
            )}
            {invitation?.phone && (
              <p className="font-medium">Phone: {invitation.phone}</p>
            )}
            {invitation?.brand && (
              <p className="font-medium">Brand: {invitation.brand}</p>
            )}
            {invitation?.specialization && (
              <p className="font-medium">
                Specialization: {invitation.specialization}
              </p>
            )}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="ghost" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} disabled={isLoading}>
            {isLoading ? "Sending..." : "Resend"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
