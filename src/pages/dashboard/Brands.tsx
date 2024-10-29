import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

export default function Brands() {
  const [brands] = useState([
    {
      id: 1,
      name: 'MediCorp',
      products: 45,
      status: 'Active',
    },
    {
      id: 2,
      name: 'HealthTech',
      products: 32,
      status: 'Active',
    },
  ])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Brands</h2>
          <p className="text-muted-foreground">Manage your medical brands here.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Brand
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {brands.map((brand) => (
          <div
            key={brand.id}
            className="rounded-xl border bg-card text-card-foreground shadow-sm"
          >
            <div className="p-6 flex flex-col space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{brand.name}</h3>
                <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
                  {brand.status}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Total Products: {brand.products}
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">Edit</Button>
                <Button variant="outline" size="sm" className="flex-1 text-red-500">Delete</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}