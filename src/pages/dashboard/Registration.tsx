import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Plus, Link as LinkIcon, Copy } from 'lucide-react'

export default function Registration() {
  const [links] = useState([
    {
      id: 1,
      type: 'Doctor',
      url: 'https://example.com/register/doctor/abc123',
      uses: 5,
      maxUses: 10,
      expiry: '2024-03-20',
    },
    {
      id: 2,
      type: 'Patient',
      url: 'https://example.com/register/patient/xyz789',
      uses: 8,
      maxUses: 15,
      expiry: '2024-03-25',
    },
  ])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Registration Links</h2>
          <p className="text-muted-foreground">Manage registration invitation links.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Generate Link
        </Button>
      </div>

      <div className="rounded-md border">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead>
              <tr className="border-b">
                <th className="h-12 px-4 text-left align-middle font-medium">Type</th>
                <th className="h-12 px-4 text-left align-middle font-medium">Link</th>
                <th className="h-12 px-4 text-left align-middle font-medium">Usage</th>
                <th className="h-12 px-4 text-left align-middle font-medium">Expiry</th>
                <th className="h-12 px-4 text-left align-middle font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {links.map((link) => (
                <tr key={link.id} className="border-b">
                  <td className="p-4 align-middle">
                    <div className="flex items-center gap-2">
                      <LinkIcon className="h-4 w-4" />
                      {link.type}
                    </div>
                  </td>
                  <td className="p-4 align-middle">
                    <div className="flex items-center gap-2">
                      <span className="truncate max-w-[300px]">{link.url}</span>
                      <Button variant="ghost" size="sm">
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                  <td className="p-4 align-middle">
                    {link.uses}/{link.maxUses}
                  </td>
                  <td className="p-4 align-middle">{link.expiry}</td>
                  <td className="p-4 align-middle">
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">Regenerate</Button>
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