import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText, BarChart3, Calendar, Users, Building } from "lucide-react";
import AdminLayout from "@/components/layout/admin-layout";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

export default function AdminReports() {
  // Mock data for charts
  const courseDemandData = [
    { name: "Major", value: 45, fill: "var(--chart-1)" },
    { name: "Minor", value: 25, fill: "var(--chart-2)" },
    { name: "Skill", value: 15, fill: "var(--chart-3)" },
    { name: "AEC", value: 10, fill: "var(--chart-5)" },
    { name: "VAC", value: 5, fill: "var(--chart-4)" },
  ];

  const facultyWorkloadData = [
    { name: "Dr. Sarah Wilson", hours: 18, fill: "var(--chart-1)" },
    { name: "Prof. Michael Brown", hours: 16, fill: "var(--chart-2)" },
    { name: "Dr. Jennifer Davis", hours: 20, fill: "var(--chart-3)" },
    { name: "Prof. Robert Smith", hours: 14, fill: "var(--chart-4)" },
    { name: "Dr. Emily Johnson", hours: 19, fill: "var(--chart-5)" },
  ];

  const utilizationTrendData = [
    { month: "Jan", utilization: 75 },
    { month: "Feb", utilization: 82 },
    { month: "Mar", utilization: 78 },
    { month: "Apr", utilization: 85 },
    { month: "May", utilization: 89 },
    { month: "Jun", utilization: 87 },
  ];

  const reportTypes = [
    {
      title: "Master Timetable",
      description: "Complete timetable grid with all courses and schedules",
      icon: Calendar,
      formats: ["PDF", "Excel"],
    },
    {
      title: "Faculty Workload",
      description: "Teaching hours distribution and load analysis",
      icon: Users,
      formats: ["Excel", "PDF"],
    },
    {
      title: "Room Utilization",
      description: "Room and lab usage statistics with optimization suggestions",
      icon: Building,
      formats: ["Excel", "PDF"],
    },
    {
      title: "Student Allocations",
      description: "Course enrollments and preference satisfaction rates",
      icon: FileText,
      formats: ["Excel", "CSV"],
    },
  ];

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold" data-testid="text-reports-title">Reports & Analytics</h1>
            <p className="text-muted-foreground">
              Generate comprehensive reports and view system analytics
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" data-testid="button-schedule-reports">
              <Calendar className="mr-2" size={16} />
              Schedule Reports
            </Button>
            <Button data-testid="button-export-all">
              <Download className="mr-2" size={16} />
              Export All
            </Button>
          </div>
        </div>

        {/* Quick Reports */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reportTypes.map((report, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <report.icon className="text-primary" size={20} />
                  <CardTitle className="text-lg">{report.title}</CardTitle>
                </div>
                <CardDescription>{report.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {report.formats.map((format) => (
                      <Button
                        key={format}
                        variant="outline"
                        size="sm"
                        data-testid={`button-export-${report.title.toLowerCase().replace(/\s+/g, '-')}-${format.toLowerCase()}`}
                      >
                        <Download className="mr-1" size={12} />
                        {format}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Analytics Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Course Demand Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Course Type Demand</CardTitle>
              <CardDescription>
                Distribution of student preferences across course types
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={courseDemandData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {courseDemandData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Faculty Workload Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Faculty Workload Distribution</CardTitle>
              <CardDescription>
                Teaching hours per faculty member this semester
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={facultyWorkloadData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 25]} />
                    <YAxis type="category" dataKey="name" width={120} fontSize={12} />
                    <Tooltip />
                    <Bar dataKey="hours" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Room Utilization Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Room Utilization Trends</CardTitle>
            <CardDescription>
              Monthly room and lab utilization percentage over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={utilizationTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip formatter={(value) => [`${value}%`, 'Utilization']} />
                  <Line 
                    type="monotone" 
                    dataKey="utilization" 
                    stroke="var(--chart-1)" 
                    strokeWidth={3}
                    dot={{ fill: "var(--chart-1)", strokeWidth: 2, r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Report Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <FileText className="mx-auto mb-2 text-chart-1" size={24} />
                <p className="text-2xl font-bold text-chart-1">24</p>
                <p className="text-sm text-muted-foreground">Reports Generated</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <Download className="mx-auto mb-2 text-chart-2" size={24} />
                <p className="text-2xl font-bold text-chart-2">156</p>
                <p className="text-sm text-muted-foreground">Downloads This Month</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <BarChart3 className="mx-auto mb-2 text-chart-3" size={24} />
                <p className="text-2xl font-bold text-chart-3">94%</p>
                <p className="text-sm text-muted-foreground">Data Accuracy</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <Calendar className="mx-auto mb-2 text-chart-4" size={24} />
                <p className="text-2xl font-bold text-chart-4">7</p>
                <p className="text-sm text-muted-foreground">Scheduled Reports</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Export Options */}
        <Card>
          <CardHeader>
            <CardTitle>Bulk Export Options</CardTitle>
            <CardDescription>
              Export multiple reports and data sets in various formats
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-20 flex-col space-y-2" data-testid="button-export-academic-year">
                <FileText size={20} />
                <span>Complete Academic Year</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col space-y-2" data-testid="button-export-semester">
                <Calendar size={20} />
                <span>Current Semester</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col space-y-2" data-testid="button-export-analytics">
                <BarChart3 size={20} />
                <span>Analytics Dashboard</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
