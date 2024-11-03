// CreateDoctorSheet.tsx
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { useState } from "react";

interface CreateDoctorSheetProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  specializations: Array<{ id: string; name: string }>;
  brands: Array<{ id: string; name: string }>;
  cities: Array<{ id: string; name: string }>;
}

export function CreateDoctorSheet({ 
  open, 
  onClose, 
  onSubmit,
  specializations,
  brands,
  cities
}: CreateDoctorSheetProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, setValue, formState } = useForm();
  
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setValue('latitude', position.coords.latitude);
        setValue('longitude', position.coords.longitude);
      });
    }
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-[40%] sm:max-w-[40%] overflow-auto">
        <SheetHeader className="">
          <SheetTitle>Create Doctor Profile</SheetTitle>
        </SheetHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
          <div className="flex justify-center items-center">
            <label htmlFor="profilePic" className="cursor-pointer">
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-300">
                <img
                  src="https://placehold.co/400x400"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <input
                id="profilePic"
                type="file"
                {...register("profilePic")}
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      const imgElement = document.querySelector('label[for="profilePic"] img') as HTMLImageElement;
                      if (imgElement) {
                        imgElement.src = reader.result as string;
                      }
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
            </label>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input {...register("firstName")} placeholder="First Name" />
            <Input {...register("lastName")} placeholder="Last Name" />
          </div>
          <Input {...register("phone")} placeholder="Phone" />
          <Input {...register("email")} type="email" placeholder="Email" />
          <Input {...register("whatsAppPhone")} placeholder="WhatsApp Phone" />
          <Input {...register("alternativePhone")} placeholder="Alternative Phone" />
          
          <Select {...register("specializationId")}>
            <SelectTrigger>
              <SelectValue placeholder="Select Specialization" />
            </SelectTrigger>
            <SelectContent>
              {specializations.map(spec => (
                <SelectItem key={spec.id} value={spec.id}>{spec.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select {...register("brandId")}>
            <SelectTrigger>
              <SelectValue placeholder="Select Brand" />
            </SelectTrigger>
            <SelectContent>
              {brands.map(brand => (
                <SelectItem key={brand.id} value={brand.id}>{brand.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input {...register("degree")} placeholder="Degree" />
          <Textarea {...register("bio")} placeholder="Bio" />
          <Textarea {...register("experienceBrief")} placeholder="Experience Brief" />
          <Textarea {...register("education")} placeholder="Education" />
          <Textarea {...register("specializationBrief")} placeholder="Specialization Brief" />
          <Textarea {...register("membershipBrief")} placeholder="Membership Brief" />
          <Textarea {...register("achievementBrief")} placeholder="Achievement Brief" />
          
          <Input {...register("addressLine1")} placeholder="Address Line 1" />
          <Input {...register("addressLine2")} placeholder="Address Line 2" />
          <Input {...register("addressLine3")} placeholder="Address Line 3" />
          
          <Select {...register("cityId")}>
            <SelectTrigger>
              <SelectValue placeholder="Select City" />
            </SelectTrigger>
            <SelectContent>
              {cities.map(city => (
                <SelectItem key={city.id} value={city.id}>{city.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input {...register("zipCode")} type="number" placeholder="Zip Code" />
          <Input {...register("state")} placeholder="State" />
          <Input {...register("country")} placeholder="Country" />
          
          <div className="grid grid-cols-2 gap-4">
            <Input {...register("latitude")} placeholder="Latitude" readOnly />
            <Input {...register("longitude")} placeholder="Longitude" readOnly />
            <Button type="button" onClick={getLocation}>Detect Location</Button>
          </div>

          <Input type="file" {...register("photo")} accept="image/*" />
          <Input type="file" {...register("identityProof")} />
          <Input type="file" {...register("uploadDocument")} multiple />

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
            <Button 
              disabled={isLoading || !formState.isValid}
              type="submit"
            >Create</Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}