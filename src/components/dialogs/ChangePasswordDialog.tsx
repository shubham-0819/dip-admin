import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from 'react-hook-form';
import { Loader2 } from "lucide-react";

interface ChangePasswordFormData {
  password: string;
  confirmPassword: string;
}

interface ChangePasswordDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (password: string) => Promise<void>;
  adminName?: string;
}

const ChangePasswordDialog: React.FC<ChangePasswordDialogProps> = ({ 
  isOpen, 
  onClose, 
  onSubmit,
  adminName 
}) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm<ChangePasswordFormData>();

  const handleFormSubmit = async (data: ChangePasswordFormData) => {
    setIsLoading(true);
    try {
      await onSubmit(data.password);
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
          <DialogTitle>
            Change Password
            {adminName && <span className="text-sm text-muted-foreground block">for {adminName}</span>}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div>
            <Input
              {...register('password', { 
                required: 'Password is required',
                minLength: { value: 6, message: 'Password must be at least 6 characters' }
              })}
              placeholder="New Password"
              type="password"
              disabled={isLoading}
            />
            {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
          </div>
          <div>
            <Input
              {...register('confirmPassword', { 
                required: 'Please confirm password',
                validate: value => value === watch('password') || "Passwords do not match"
              })}
              placeholder="Confirm Password"
              type="password"
              disabled={isLoading}
            />
            {errors.confirmPassword && <span className="text-red-500 text-sm">{errors.confirmPassword.message}</span>}
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Change Password
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePasswordDialog; 