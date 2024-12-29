import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from 'react-hook-form';
import { Loader2 } from "lucide-react";
import { Test } from '@/services/testService';

interface TestFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => Promise<void>;
  initialData?: Test;
  mode: 'create' | 'edit';
}

const TestForm: React.FC<TestFormProps> = ({ 
  isOpen, 
  onClose, 
  onSubmit,
  initialData,
  mode 
}) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [previewUrls, setPreviewUrls] = React.useState<string[]>([]);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<Test>({
    defaultValues: initialData
  });

  React.useEffect(() => {
    if (initialData) {
      reset(initialData);
      setPreviewUrls(initialData.icons || []);
    }
  }, [initialData, reset]);

  const onSubmitForm = async (data: Test) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('testName', data.testName);
      formData.append('displayName', data.displayName);
      formData.append('description', data.description);
      formData.append('price', data.price.toString());
      
      if (data.icons) {
        Array.from(data.icons).forEach((icon) => {
          formData.append('icons', icon);
        });
      }

      await onSubmit(formData);
      reset();
      setPreviewUrls([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const urls = Array.from(files).map(file => URL.createObjectURL(file));
      setPreviewUrls(urls);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) {
        reset();
        setPreviewUrls([]);
        onClose();
      }
    }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{mode === 'create' ? 'Create New Test' : 'Edit Test'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
          <div>
            <Input
              {...register('testName', { 
                required: 'Test name is required',
                minLength: { value: 2, message: 'Test name must be at least 2 characters' }
              })}
              placeholder="Test Name"
              disabled={isLoading}
            />
            {errors.testName && <span className="text-red-500 text-sm">{errors.testName.message}</span>}
          </div>

          <div>
            <Input
              {...register('displayName', { 
                required: 'Display name is required',
                minLength: { value: 2, message: 'Display name must be at least 2 characters' }
              })}
              placeholder="Display Name"
              disabled={isLoading}
            />
            {errors.displayName && <span className="text-red-500 text-sm">{errors.displayName.message}</span>}
          </div>

          <div>
            <Textarea
              {...register('description', { 
                required: 'Description is required',
                minLength: { value: 10, message: 'Description must be at least 10 characters' }
              })}
              placeholder="Description"
              disabled={isLoading}
            />
            {errors.description && <span className="text-red-500 text-sm">{errors.description.message}</span>}
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
            <Input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              disabled={isLoading}
            />
            <div className="mt-2 flex gap-2">
              {previewUrls.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`Preview ${index + 1}`}
                  className="w-16 h-16 object-cover rounded"
                />
              ))}
            </div>
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

export default TestForm;