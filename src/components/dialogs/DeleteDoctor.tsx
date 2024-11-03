import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DeleteDoctorDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  doctorName?: string;
}

export function DeleteDoctorDialog({
  open,
  onClose,
  onConfirm,
  doctorName,
}: DeleteDoctorDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Doctor</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete {doctorName || "this doctor"}? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
};