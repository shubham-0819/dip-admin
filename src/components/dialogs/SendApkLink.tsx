import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input';
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
import { sendApkLink } from '@/services/apkService';


interface SendApkLinkProps {
  open: boolean;
  onClose: () => void;
  onSuccess: (data: z.infer<typeof apkLinkSchema>) => Promise<void>;
  cityList: Array<{ id: string; name: string }>;
  brandList: Array<{ id: string; name: string }>;
  specializationList: Array<{ id: string; name: string }>;
}

const apkLinkSchema = z
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

  const validateAndSend = async (data) => {
    const sendApkObj = {}
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;
  
    if (!data.email && !data.phone) {
      throw new Error("Either email or phone is required");
    }
  
    if (data.email && !emailRegex.test(data.email)) {
      throw new Error("Invalid email format");
    }else {
      sendApkObj.email = data.email
    }
  
    if (data.phone && !phoneRegex.test(data.phone)) {
      throw new Error("Invalid phone format");
    }else {
      sendApkObj.phone = data.phone;
    }
  
    if (!data.city) {
      throw new Error("City is required");
    }
    if (data.city.length < 3) {
      throw new Error("City must be at least 3 characters long");
    }else{
      sendApkObj.city = data.city;
    }
    if (!data.brandId) {
      throw new Error("Brand is required");
    }
    sendApkObj.brandId = data.brandId;
    if (!data.specializationId) {
      throw new Error("Specialization is required");
    }
    sendApkObj.specializationId = data.specializationId;
    if (!data.name) {
      throw new Error("Name is required");
    }
    if (data.name.length < 3) {
      throw new Error("Name must be at least 3 characters long");
    }
    sendApkObj.name = data.name;
    try {  
      await sendApkLink(sendApkObj);
    } catch (error) {
      throw new Error(error.response?.data?.message || "An error occurred");
    }
  };


export default function SendApkLinkDialog({
  open,
  onClose,
  onSuccess,
  cityList,
  brandList,
  specializationList
}: SendApkLinkProps) {
  const form = useForm<z.infer<typeof apkLinkSchema>>({
    resolver: zodResolver(apkLinkSchema),
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
          <DialogTitle>Send Apk</DialogTitle>
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
                  await validateAndSend(form.getValues());
                  onSuccess(form.getValues());
                } catch (error) {
                  toast({
                    title: "Failed to send Apk Link",
                    description: error.message || "An error occurred",
                    variant: "destructive",
                  });
                  setIsSubmitting(false);
                }
              }}
            >
              {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : ""}
              {isSubmitting ? "Sending..." : "Send Apk"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}