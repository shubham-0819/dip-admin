import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { register } from "module";

const invitationSchema = z.object({
  email: z.string().email().optional(),
  phone: z.string().min(10).optional(),
  name: z.string().min(1),
  brandId: z.string().min(1),
  specializationId: z.string().min(1),
  city: z.string().min(3),
}).refine((data) => data.email || data.phone, {
  message: "Either email or phone is required",
});

/**
 * SendInvitationDialog component renders a dialog for sending invitations.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.open - Determines if the dialog is open.
 * @param {() => void} props.onClose - Callback function to handle dialog close.
 * @param {(data: any) => Promise<void>} props.onSubmit - Callback function to handle form submission.
 * @param {Array<{ id: string, name: string }>} props.cityList - List of cities to select from.
 * @param {Array<{ id: string, name: string }>} props.brandList - List of brands to select from.
 * @param {Array<{ id: string, name: string }>} props.specializationList - List of specializations to select from.
 *
 * @returns {JSX.Element} The rendered SendInvitationDialog component.
 */
interface SendInvitationDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: z.infer<typeof invitationSchema>) => Promise<void>;
  cityList: Array<{ id: string, name: string }>;
  brandList: Array<{ id: string, name: string }>;
  specializationList: Array<{ id: string, name: string }>;
}

export function SendInvitationDialog({ open, onClose, onSubmit, cityList, brandList, specializationList }: SendInvitationDialogProps) {
  const form = useForm<z.infer<typeof invitationSchema>>({
    resolver: zodResolver(invitationSchema),
  });
  const { register, formState } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: z.infer<typeof invitationSchema>) => {
    setIsSubmitting(true);
    await onSubmit(data);
    setIsSubmitting(false);
  };

  console.log(specializationList);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Send Invitation</DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <Input
            {...form.register("email")}
            placeholder="Email"
          />
          <Input
            {...form.register("phone")}
            placeholder="Phone"
          />
          <Input
            {...form.register("name")}
            placeholder="Name"
          />
          <Input
            {...form.register("city")}
            placeholder="city"
          />

          <Select {...register("specializationId")}>
            <SelectTrigger>
              <SelectValue placeholder="Select Specialization" />
            </SelectTrigger>
            <SelectContent>
              {specializationList.map(spec => (
                <SelectItem key={spec.id} value={spec.id}>{spec.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select {...register("brandId")}>
            <SelectTrigger>
              <SelectValue placeholder="Select Brand" />
            </SelectTrigger>
            <SelectContent>
              {brandList.map(brand => (
                <SelectItem key={brand.id} value={brand.id}>{brand.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="ghost" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" disabled={!form.formState.isValid || isSubmitting}>
              {isSubmitting ? "Sending..." : "Send Invitation"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}