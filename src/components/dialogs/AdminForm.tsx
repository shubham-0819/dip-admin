import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from 'react-hook-form';
import { AdminData } from '@/services/adminService';
import { Loader2 } from "lucide-react";

interface AdminFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: AdminData) => Promise<void>;
  initialData?: AdminData;
  mode: 'create' | 'edit';
}

const AdminForm: React.FC<AdminFormProps> = ({ isOpen, onClose, onSubmit, initialData, mode }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<AdminData>({
    defaultValues: initialData
  });

  React.useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const onSubmitForm = async (data: AdminData) => {
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
          <DialogTitle>{mode === 'create' ? 'Create New Admin' : 'Edit Admin'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
          <div>
            <Input
              {...register('firstName', { 
                required: 'First name is required',
                minLength: { value: 2, message: 'First name must be at least 2 characters' }
              })}
              placeholder="First Name"
              disabled={isLoading}
            />
            {errors.firstName && <span className="text-red-500 text-sm">{errors.firstName.message}</span>}
          </div>
          <div>
            <Input
              {...register('lastName', { 
                required: 'Last name is required',
                minLength: { value: 2, message: 'Last name must be at least 2 characters' }
              })}
              placeholder="Last Name"
              disabled={isLoading}
            />
            {errors.lastName && <span className="text-red-500 text-sm">{errors.lastName.message}</span>}
          </div>
          <div>
            <Input
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
              })}
              placeholder="Email"
              type="email"
              disabled={isLoading}
            />
            {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
          </div>
          <div>
            <Input
              {...register('mobile', { 
                required: 'Mobile number is required',
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Invalid mobile number"
                }
              })}
              placeholder="Mobile Number"
              disabled={isLoading}
            />
            {errors.mobile && <span className="text-red-500 text-sm">{errors.mobile.message}</span>}
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

export default AdminForm; 