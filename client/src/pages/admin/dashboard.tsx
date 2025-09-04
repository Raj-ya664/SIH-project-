import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, UserCheck, Building, AlertTriangle, Calendar, Upload } from "lucide-react";
import AdminLayout from "@/components/layout/admin-layout";
import { useQuery } from "@tanstack/react-query";
import { DashboardCharts } from "@/components/charts/dashboard-charts";

export default function AdminDashboard() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["/api/dashboard/stats"],
  });

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="p-6">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-1/4 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-32 bg-muted rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  const statCards = [
    {
      title: "Total Students",
      value: stats?.totalStudents || 0,
      icon: Users,
      color: "text-chart-1",
      bgColor: "bg-chart-1/10",
    },
    {
      title: "Faculty",
      value: stats?.totalFaculty || 0,
      icon: UserCheck,
      color: "text-chart-2",
      bgColor: "bg-chart-2/10",
    },
    {
      title: "Rooms/Labs",
      value: stats?.totalRooms || 0,
      icon: Building,
      color: "text-chart-3",
      bgColor: "bg-chart-3/10",
    },
    {
      title: "Conflicts",
      value: stats?.conflicts || 0,
      icon: AlertTriangle,
      color: stats?.conflicts > 0 ? "text-destructive" : "text-chart-2",
      bgColor: stats?.conflicts > 0 ? "bg-destructive/10" : "bg-chart-2/10",
    },
  ];

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold" data-testid="text-dashboard-title">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Manage your institution's timetable and resources
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" data-testid="button-import-data">
              <Upload className="mr-2" size={16} />
              Import Data
            </Button>
            <Button data-testid="button-generate-timetable">
              <Calendar className="mr-2" size={16} />
              Generate Timetable
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {statCards.map((stat) => (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className={`text-2xl font-bold ${stat.color}`} data-testid={`stat-${stat.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}>
                      {stat.value}
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <stat.icon className={stat.color} size={24} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts and Additional Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DashboardCharts 
            studentSatisfaction={stats?.studentSatisfaction || 0}
            facultyBalance={stats?.facultyBalance || 0}
            roomUtilization={stats?.roomUtilization || 0}
          />
          
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Common administrative tasks
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full justify-start" variant="outline" data-testid="button-quick-add-student">
                <Users className="mr-2" size={16} />
                Add New Student
              </Button>
              <Button className="w-full justify-start" variant="outline" data-testid="button-quick-add-faculty">
                <UserCheck className="mr-2" size={16} />
                Add Faculty Member
              </Button>
              <Button className="w-full justify-start" variant="outline" data-testid="button-quick-add-course">
                <Calendar className="mr-2" size={16} />
                Create New Course
              </Button>
              <Button className="w-full justify-start" variant="outline" data-testid="button-quick-add-room">
                <Building className="mr-2" size={16} />
                Add Room/Lab
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity / Notifications */}
        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
            <CardDescription>
              Current system health and recent activities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-chart-2/10 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-chart-2 rounded-full"></div>
                  <span className="text-sm">Timetable generation completed successfully</span>
                </div>
                <span className="text-xs text-muted-foreground">2 hours ago</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-chart-1/10 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-chart-1 rounded-full"></div>
                  <span className="text-sm">25 new student registrations processed</span>
                </div>
                <span className="text-xs text-muted-foreground">1 day ago</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-chart-3/10 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-chart-3 rounded-full"></div>
                  <span className="text-sm">Faculty availability updated</span>
                </div>
                <span className="text-xs text-muted-foreground">2 days ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
