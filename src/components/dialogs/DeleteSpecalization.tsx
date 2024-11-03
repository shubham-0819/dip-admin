import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DeleteSpecializationDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  specializationName?: string;
}

export function DeleteSpecializationDialog({
  open,
  onClose,
  onConfirm,
  specializationName,
}: DeleteSpecializationDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Specialization</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete {specializationName || "this specialization"}? This action cannot be undone.
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
  );
}