import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { sendInvitation } from "@/services/invitationService";

const invitationSchema = z
  .object({
    email: z.string().email().optional(),
    phone: z.string().min(10).optional(),
    name: z.string().min(1),
    brandId: z.string().min(1),
    specializationId: z.string().min(1),
    city: z.string().min(3),
  })
  .refine((data) => data.email || data.phone, {
    message: "Either email or phone is required",
  });

/**
 * SendInvitationDialog component renders a dialog for sending invitations.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.open - Determines if the dialog is open.
 * @param {() => void} props.onClose - Callback function to handle dialog close.
 * @param {(data: any) => Promise<void>} props.onSuccess - Callback function to handle form success.
 * @param {Array<{ id: string, name: string }>} props.cityList - List of cities to select from.
 * @param {Array<{ id: string, name: string }>} props.brandList - List of brands to select from.
 * @param {Array<{ id: string, name: string }>} props.specializationList - List of specializations to select from.
 *
 * @returns {JSX.Element} The rendered SendInvitationDialog component.
 */

const validateInvitation = async (data) => {
  const invitationObj = {}
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\d{10}$/;

  if (!data.email && !data.phone) {
    throw new Error("Either email or phone is required");
  }

  if (data.email && !emailRegex.test(data.email)) {
    throw new Error("Invalid email format");
  }else {
    invitationObj.email = data.email
  }

  if (data.phone && !phoneRegex.test(data.phone)) {
    throw new Error("Invalid phone format");
  }else {
    invitationObj.phone = data.phone;
  }

  if (!data.city) {
    throw new Error("City is required");
  }
  if (data.city.length < 3) {
    throw new Error("City must be at least 3 characters long");
  }else{
    invitationObj.city = data.city;
  }
  if (!data.brandId) {
    throw new Error("Brand is required");
  }
  invitationObj.brandId = data.brandId;
  if (!data.specializationId) {
    throw new Error("Specialization is required");
  }
  invitationObj.specializationId = data.specializationId;
  if (!data.name) {
    throw new Error("Name is required");
  }
  if (data.name.length < 3) {
    throw new Error("Name must be at least 3 characters long");
  }
  invitationObj.name = data.name;
  try {  
    await sendInvitation(invitationObj);
  } catch (error) {
    throw new Error(error.response?.data?.message || "An error occurred");
  }
};

interface SendInvitationDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: (data: z.infer<typeof invitationSchema>) => Promise<void>;
  cityList: Array<{ id: string; name: string }>;
  brandList: Array<{ id: string; name: string }>;
  specializationList: Array<{ id: string; name: string }>;
}

export function SendInvitationDialog({
  open,
  onClose,
  onSuccess,
  brandList,
  specializationList,
}: SendInvitationDialogProps) {
  const form = useForm<z.infer<typeof invitationSchema>>({
    resolver: zodResolver(invitationSchema),
  });
  const { toast } = useToast();
  const { handleSubmit, reset } = form;
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!open) {
      reset();
      setIsSubmitting(false);
    }
  }, [open, reset]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Send Invitation</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(() => {})} className="space-y-4">
          <Input {...form.register("email")} placeholder="Email" type="email" />
          <Input {...form.register("phone")} placeholder="Phone" type="tel" />
          <Input {...form.register("name")} placeholder="Name" type="text" />
          <Input {...form.register("city")} placeholder="City" type="text" />

          <Select
            onValueChange={(value) => form.setValue("specializationId", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Specialization" />
            </SelectTrigger>
            <SelectContent>
              {specializationList.map((spec) => (
                <SelectItem key={spec.id} value={spec.id}>
                  {spec.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select onValueChange={(value) => form.setValue("brandId", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select Brand" />
            </SelectTrigger>
            <SelectContent>
              {brandList.map((brand) => (
                <SelectItem key={brand.id} value={brand.id}>
                  {brand.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              disabled={isSubmitting}
              onClick={async () => {
                try {
                  setIsSubmitting(true);
                  await validateInvitation(form.getValues());
                  onSuccess(form.getValues());
                } catch (error) {
                  toast({
                    title: "Failed to send invitation",
                    description: error.message || "An error occurred",
                    variant: "destructive",
                  });
                  setIsSubmitting(false);
                }
              }}
            >
              {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : ""}
              {isSubmitting ? "Sending..." : "Send Invitation"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
