import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useForm } from "react-hook-form";

interface CreateRegistrationLinkDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  brands: Array<{ id: string; name: string }>;
  specializations: Array<{ id: string; name: string }>;
}

export function CreateRegistrationLinkDialog({ 
  open, 
  onClose, 
  onSubmit,
  brands,
  specializations 
}: CreateRegistrationLinkDialogProps) {
  const { register, handleSubmit, setValue } = useForm();

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Registration Link</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <Select onValueChange={(value) => setValue("brandId", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Brand" />
              </SelectTrigger>
              <SelectContent>
                {brands.map(brand => (
                  <SelectItem key={brand.id} value={brand.id}>{brand.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select onValueChange={(value) => setValue("specializationId", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Specialization" />
              </SelectTrigger>
              <SelectContent>
                {specializations.map(spec => (
                  <SelectItem key={spec.id} value={spec.id}>{spec.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input {...register("url")} placeholder="Registration URL" />
          </div>
          <DialogFooter>
            <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
            <Button type="submit">Create</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}