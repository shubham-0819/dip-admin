import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog";
  import { Button } from "@/components/ui/button";
  
  interface DeleteApkLinkDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
  }
  
  export default function DeleteApkLinkDialog({
    open,
    onClose,
    onConfirm,
  }: DeleteApkLinkDialogProps) {
    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete APK link</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this APK Link? This action cannot be undone.
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