import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface UserProfileDialogProps {
  open: boolean
  onClose: () => void
}

export default function UserProfileDialog({ open, onClose }: UserProfileDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Profile Settings</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" defaultValue="John Doe" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" defaultValue="john@example.com" type="email" />
          </div>
        </div>
        <div className="flex justify-end">
          <Button onClick={onClose}>Save changes</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}