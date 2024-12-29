import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from 'react-hook-form';
import { Loader2 } from "lucide-react";

interface SubAdminFormData {
  name: string;
  password?: string;
}

interface SubAdminFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: SubAdminFormData) => Promise<void>;
  initialData?: SubAdminFormData;
  mode: 'create' | 'edit';
}

const SubAdminForm: React.FC<SubAdminFormProps> = ({ 
  isOpen, 
  onClose, 
  onSubmit,
  initialData,
  mode 
}) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<SubAdminFormData>({
    defaultValues: initialData
  });

  React.useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const onSubmitForm = async (data: SubAdminFormData) => {
    setIsLoading(true);
    try {
      await onSubmit(data);
      reset();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) {
        reset();
        onClose();
      }
    }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{mode === 'create' ? 'Create New Sub Admin' : 'Edit Sub Admin'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
          <div>
            <Input
              {...register('name', { 
                required: 'Name is required',
                minLength: { value: 2, message: 'Name must be at least 2 characters' }
              })}
              placeholder="Name"
              disabled={isLoading}
            />
            {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
          </div>
          
          {mode === 'create' && (
            <div>
              <Input
                {...register('password', { 
                  required: 'Password is required',
                  minLength: { value: 6, message: 'Password must be at least 6 characters' }
                })}
                placeholder="Password"
                type="password"
                disabled={isLoading}
              />
              {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
            </div>
          )}

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

export default SubAdminForm;