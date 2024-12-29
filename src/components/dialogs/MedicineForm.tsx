import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from 'react-hook-form';
import { Loader2 } from "lucide-react";
import { Medicine } from '@/services/medicineService';

interface MedicineFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => Promise<void>;
  initialData?: Medicine;
  mode: 'create' | 'edit';
  doctors: Array<{ id: string; name: string }>;
}

const MedicineForm: React.FC<MedicineFormProps> = ({ 
  isOpen, 
  onClose, 
  onSubmit,
  initialData,
  mode,
  doctors
}) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [previewUrl, setPreviewUrl] = React.useState<string>('');
  const { register, handleSubmit, formState: { errors }, reset } = useForm<Medicine>({
    defaultValues: initialData
  });

  React.useEffect(() => {
    if (initialData) {
      reset(initialData);
      setPreviewUrl(initialData.icon || '');
    }
  }, [initialData, reset]);

  const onSubmitForm = async (data: Medicine) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('price', data.price.toString());
      formData.append('doctorId', data.doctorId);
      
      if (data.icon) {
        formData.append('icon', data.icon);
      }

      await onSubmit(formData);
      reset();
      setPreviewUrl('');
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) {
        reset();
        setPreviewUrl('');
        onClose();
      }
    }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{mode === 'create' ? 'Create New Medicine' : 'Edit Medicine'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
          <div>
            <Input
              {...register('name', { 
                required: 'Medicine name is required',
                minLength: { value: 2, message: 'Medicine name must be at least 2 characters' }
              })}
              placeholder="Medicine Name"
              disabled={isLoading}
            />
            {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
          </div>

          <div>
            <Input
              {...register('price', { 
                required: 'Price is required',
                min: { value: 0, message: 'Price must be greater than or equal to 0' }
              })}
              type="number"
              placeholder="Price"
              disabled={isLoading}
            />
            {errors.price && <span className="text-red-500 text-sm">{errors.price.message}</span>}
          </div>

          <div>
            <select
              {...register('doctorId', { required: 'Doctor is required' })}
              className="w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              disabled={isLoading}
            >
              <option value="">Select Doctor</option>
              {doctors.map((doctor) => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.name}
                </option>
              ))}
            </select>
            {errors.doctorId && <span className="text-red-500 text-sm">{errors.doctorId.message}</span>}
          </div>

          <div>
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              disabled={isLoading}
            />
            {previewUrl && (
              <img
                src={previewUrl}
                alt="Medicine preview"
                className="mt-2 w-16 h-16 object-cover rounded"
              />
            )}
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {mode === 'create' ? 'Create' : 'Update'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default MedicineForm;