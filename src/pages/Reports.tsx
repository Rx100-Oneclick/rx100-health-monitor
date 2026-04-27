import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";

const headcountData = [
  { department: "Engineering", count: 45 },
  { department: "Robotics", count: 32 },
  { department: "HR", count: 12 },
  { department: "Marketing", count: 18 },
  { department: "Finance", count: 8 },
  { department: "Operations", count: 25 }
];

const leaveData = [
  { name: "Annual Leave", value: 35, color: "#10b981" },
  { name: "Sick Leave", value: 20, color: "#f59e0b" },
  { name: "Personal Leave", value: 15, color: "#8b5cf6" },
  { name: "Maternity/Paternity", value: 10, color: "#06b6d4" },
  { name: "Unused", value: 20, color: "#64748b" }
];

const attendanceData = [
  { month: "Jan", attendance: 94 },
  { month: "Feb", attendance: 96 },
  { month: "Mar", attendance: 92 },
  { month: "Apr", attendance: 95 },
  { month: "May", attendance: 93 },
  { month: "Jun", attendance: 97 },
  { month: "Jul", attendance: 94 },
  { month: "Aug", attendance: 96 },
  { month: "Sep", attendance: 95 }
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
        <p className="text-foreground font-medium">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-primary">
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function Reports() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Reports & Analytics</h1>
        <p className="text-muted-foreground mt-1">Workforce insights and data visualization</p>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Headcount by Department - Bar Chart */}
        <Card className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <CardHeader>
            <CardTitle className="text-primary flex items-center gap-2">
              Headcount by Department
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={headcountData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="department" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="count" 
                  fill="hsl(var(--primary))"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Leave Utilization - Donut Chart */}
        <Card className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <CardHeader>
            <CardTitle className="text-primary flex items-center gap-2">
              Leave Utilization
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={leaveData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {leaveData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {leaveData.map((item, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-muted-foreground">{item.name}</span>
                  <span className="ml-auto text-foreground font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Attendance Trends - Line Chart */}
        <Card className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <CardHeader>
            <CardTitle className="text-primary flex items-center gap-2">
              Attendance Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="month" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))" 
                  fontSize={12}
                  domain={[85, 100]}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="attendance" 
                  stroke="hsl(var(--primary))"
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: "hsl(var(--primary))", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-4 text-center">
              <p className="text-sm text-muted-foreground">
                Average Attendance: <span className="text-primary font-semibold">94.7%</span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">140</div>
            <div className="text-sm text-muted-foreground">Total Employees</div>
          </CardContent>
        </Card>
        
        <Card className="animate-fade-in" style={{ animationDelay: "0.5s" }}>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-emerald-400">94.7%</div>
            <div className="text-sm text-muted-foreground">Avg Attendance</div>
          </CardContent>
        </Card>
        
        <Card className="animate-fade-in" style={{ animationDelay: "0.6s" }}>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-amber-400">15</div>
            <div className="text-sm text-muted-foreground">Pending Leaves</div>
          </CardContent>
        </Card>
        
        <Card className="animate-fade-in" style={{ animationDelay: "0.7s" }}>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-400">6</div>
            <div className="text-sm text-muted-foreground">Departments</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}