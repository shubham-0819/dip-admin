import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

export default function Doctors() {
  const [doctors] = useState([
    {
      id: 1,
      name: 'Dr. Sarah Wilson',
      specialization: 'Cardiology',
      experience: '10 years',
      status: 'Active',
    },
    {
      id: 2,
      name: 'Dr. John Smith',
      specialization: 'Neurology',
      experience: '15 years',
      status: 'Active',
    },
    // Add more mock data as needed
  ])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Doctors</h2>
          <p className="text-muted-foreground">Manage your registered doctors here.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Doctor
        </Button>
      </div>

      <div className="rounded-md border">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <th className="h-12 px-4 text-left align-middle font-medium">Name</th>
                <th className="h-12 px-4 text-left align-middle font-medium">Specialization</th>
                <th className="h-12 px-4 text-left align-middle font-medium">Experience</th>
                <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                <th className="h-12 px-4 text-left align-middle font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {doctors.map((doctor) => (
                <tr
                  key={doctor.id}
                  className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                >
                  <td className="p-4 align-middle">{doctor.name}</td>
                  <td className="p-4 align-middle">{doctor.specialization}</td>
                  <td className="p-4 align-middle">{doctor.experience}</td>
                  <td className="p-4 align-middle">
                    <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
                      {doctor.status}
                    </span>
                  </td>
                  <td className="p-4 align-middle">
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">Edit</Button>
                      <Button variant="ghost" size="sm" className="text-red-500">Delete</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}