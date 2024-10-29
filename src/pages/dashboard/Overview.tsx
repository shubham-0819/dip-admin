import { Activity, Users, DollarSign, Calendar } from 'lucide-react'

const stats = [
  {
    name: 'Total Doctors',
    value: '2,345',
    icon: Users,
    change: '+12%',
    changeType: 'positive'
  },
  {
    name: 'Active Appointments',
    value: '456',
    icon: Calendar,
    change: '+5%',
    changeType: 'positive'
  },
  {
    name: 'Total Revenue',
    value: '$34,567',
    icon: DollarSign,
    change: '+23%',
    changeType: 'positive'
  },
  {
    name: 'Active Users',
    value: '12,789',
    icon: Activity,
    change: '+8%',
    changeType: 'positive'
  },
]

export default function Overview() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard Overview</h2>
        <p className="text-muted-foreground">
          Welcome to your dashboard overview.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.name}
              className="rounded-xl border bg-card text-card-foreground shadow"
            >
              <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                <h3 className="tracking-tight text-sm font-medium">
                  {stat.name}
                </h3>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="p-6 pt-0">
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className={`text-xs ${
                  stat.changeType === 'positive' 
                    ? 'text-green-500' 
                    : 'text-red-500'
                }`}>
                  {stat.change} from last month
                </p>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border bg-card text-card-foreground shadow">
          <div className="p-6">
            <h3 className="font-semibold text-lg mb-4">Recent Activities</h3>
            <div className="space-y-4">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mr-2" />
                  <p className="text-sm text-muted-foreground">
                    New doctor registration approved
                  </p>
                  <span className="ml-auto text-sm text-muted-foreground">
                    {i + 1}h ago
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-xl border bg-card text-card-foreground shadow">
          <div className="p-6">
            <h3 className="font-semibold text-lg mb-4">Quick Actions</h3>
            <div className="grid gap-4">
              <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2">
                Add New Doctor
              </button>
              <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2">
                Generate Report
              </button>
              <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2">
                View Appointments
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}