import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Plus, Smartphone, Download } from 'lucide-react'

export default function ApkLinks() {
  const [apks] = useState([
    {
      id: 1,
      name: 'Doctor App',
      version: '1.2.0',
      size: '25MB',
      downloads: 1234,
      url: 'https://example.com/apps/doctor-v1.2.0.apk',
    },
    {
      id: 2,
      name: 'Patient App',
      version: '1.1.5',
      size: '20MB',
      downloads: 5678,
      url: 'https://example.com/apps/patient-v1.1.5.apk',
    },
  ])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">APK Links</h2>
          <p className="text-muted-foreground">Manage mobile application downloads.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add APK
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {apks.map((apk) => (
          <div
            key={apk.id}
            className="rounded-xl border bg-card text-card-foreground shadow-sm"
          >
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Smartphone className="h-5 w-5" />
                <h3 className="text-lg font-semibold">{apk.name}</h3>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Version</span>
                  <span>{apk.version}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Size</span>
                  <span>{apk.size}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Downloads</span>
                  <span>{apk.downloads.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
                <Button variant="outline" className="flex-1">Update</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}