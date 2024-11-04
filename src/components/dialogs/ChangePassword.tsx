import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

interface ChangePasswordProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { oldPassword: string, newPassword: string }) => void;
}

export function ChangePassword({ open, onClose, onSubmit }: ChangePasswordProps) {
  const { register, handleSubmit } = useForm();

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Password</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <Input {...register("oldPassword")} placeholder="Old Password" />
          </div>
          <div className="grid gap-4 py-4">
            <Input {...register("newPassword")} placeholder="New password" />
          </div>
          <DialogFooter>
            <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
            <Button type="submit">Update</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}