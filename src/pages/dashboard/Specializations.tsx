import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

export default function Specializations() {
  const [specializations] = useState([
    {
      id: 1,
      name: 'Cardiology',
      doctors: 15,
      description: 'Heart and cardiovascular system specialists',
    },
    {
      id: 2,
      name: 'Neurology',
      doctors: 12,
      description: 'Brain and nervous system specialists',
    },
  ])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Specializations</h2>
          <p className="text-muted-foreground">Manage medical specializations here.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Specialization
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {specializations.map((spec) => (
          <div
            key={spec.id}
            className="rounded-xl border bg-card text-card-foreground shadow-sm"
          >
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-2">{spec.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{spec.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">
                  {spec.doctors} Doctors
                </span>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Edit</Button>
                  <Button variant="outline" size="sm" className="text-red-500">Delete</Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}