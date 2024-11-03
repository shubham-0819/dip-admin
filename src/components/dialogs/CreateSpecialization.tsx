import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useState } from "react";

interface CreateSpecializationDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; icon: File }) => void;
}

export function CreateSpecializationDialog({
  open,
  onClose,
  onSubmit,
}: CreateSpecializationDialogProps) {
  const { register, handleSubmit, formState } = useForm();


  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Specialization</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="flex items-center justify-center">
              <div className="relative">
                <input
                  type="file"
                  {...register("icon")}
                  accept="image/jpeg, image/jpg"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        const imgElement = document.getElementById(
                          "avatar"
                        ) as HTMLImageElement;
                        if (imgElement) {
                          imgElement.src = reader.result as string;
                        }
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
                <img
                  id="avatar"
                  src="https://placehold.co/400x400"
                  alt="Specialization Icon"
                  className="w-24 h-24 rounded-full object-cover"
                />
                {!document.getElementById("avatar")?.src && (
                  <div
                    className="flex flex-col items-center justify-center h-full"
                    id="upload-placeholder"
                  >
                    <p className="text-gray-500">Upload Image</p>
                  </div>
                )}
              </div>
            </div>
            <Input {...register("name")} placeholder="Specialization Name" />
          </div>
          <DialogFooter>
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={!formState.isValid}>
              Create
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
