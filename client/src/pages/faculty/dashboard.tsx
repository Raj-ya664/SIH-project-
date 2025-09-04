import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Users, BookOpen, Download, RefreshCw, Bell } from "lucide-react";
import { mockTimetableData, courseTypeColors, timeSlots, weekDays } from "@/lib/mock-data";
import { authService } from "@/lib/auth";

export default function FacultyDashboard() {
  const user = authService.getUser();

  // Mock faculty data
  const facultyData = {
    name: "Dr. Sarah Wilson",
    employeeId: "FAC001",
    department: "Education",
    currentLoad: 16,
    maxLoad: 20,
    courses: ["EDU101", "SKILL101", "AEC101"],
    upcomingClasses: [
      { time: "10:00", course: "EDU101", room: "A301", students: 35 },
      { time: "14:00", course: "SKILL101", room: "C102", students: 28 },
    ]
  };

  const myTimetable = mockTimetableData.filter(entry => 
    facultyData.courses.includes(entry.course.code)
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold" data-testid="text-faculty-dashboard-title">
                Faculty Portal
              </h1>
              <p className="text-muted-foreground">Welcome back, {facultyData.name}</p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm" data-testid="button-notifications">
                <Bell className="mr-2" size={16} />
                Notifications
              </Button>
              <Button variant="outline" size="sm" onClick={() => {
                authService.logout();
                window.location.href = "/";
              }}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-6 space-y-6">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Current Workload</p>
                  <p className="text-2xl font-bold text-chart-2" data-testid="text-current-workload">
                    {facultyData.currentLoad}/{facultyData.maxLoad}h
                  </p>
                </div>
                <Clock className="text-chart-2" size={24} />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Courses Teaching</p>
                  <p className="text-2xl font-bold text-chart-1" data-testid="text-courses-count">
                    {facultyData.courses.length}
                  </p>
                </div>
                <BookOpen className="text-chart-1" size={24} />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Students</p>
                  <p className="text-2xl font-bold text-chart-3" data-testid="text-total-students">
                    {facultyData.upcomingClasses.reduce((sum, cls) => sum + cls.students, 0)}
                  </p>
                </div>
                <Users className="text-chart-3" size={24} />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Today's Classes</p>
                  <p className="text-2xl font-bold text-chart-5" data-testid="text-todays-classes">
                    {facultyData.upcomingClasses.length}
                  </p>
                </div>
                <Calendar className="text-chart-5" size={24} />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Today's Schedule */}
          <Card>
            <CardHeader>
              <CardTitle>Today's Schedule</CardTitle>
              <CardDescription>
                Your upcoming classes for today
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {facultyData.upcomingClasses.map((cls, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-chart-1 rounded-lg flex items-center justify-center">
                        <Clock className="text-white" size={20} />
                      </div>
                      <div>
                        <p className="font-medium">{cls.course}</p>
                        <p className="text-sm text-muted-foreground">
                          {cls.time} • Room {cls.room} • {cls.students} students
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" data-testid={`button-class-${index}`}>
                      View Details
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Weekly Load Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Weekly Workload Distribution</CardTitle>
              <CardDescription>
                Your teaching hours throughout the week
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {weekDays.map((day) => {
                  const dayClasses = myTimetable.filter(entry => entry.day === day);
                  const hours = dayClasses.length;
                  const percentage = (hours / 6) * 100; // Assuming max 6 hours per day
                  
                  return (
                    <div key={day} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{day}</span>
                        <span>{hours} hours</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-chart-2 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Personal Timetable */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>My Timetable</CardTitle>
                <CardDescription>
                  Your weekly teaching schedule
                </CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" data-testid="button-refresh-timetable">
                  <RefreshCw className="mr-2" size={14} />
                  Refresh
                </Button>
                <Button variant="outline" size="sm" data-testid="button-download-timetable">
                  <Download className="mr-2" size={14} />
                  Download
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="calendar-grid text-sm">
              <div className="time-slot">Time</div>
              {weekDays.map(day => (
                <div key={day} className="time-slot">{day}</div>
              ))}
              
              {timeSlots.slice(0, 6).map(time => (
                <>
                  <div key={time} className="time-slot">{time}</div>
                  {weekDays.map(day => {
                    const entry = myTimetable.find(e => e.day === day && e.time === time);
                    return (
                      <div key={`${day}-${time}`} className="calendar-cell">
                        {entry && (
                          <div className={`text-xs p-2 rounded text-white ${courseTypeColors[entry.course.type as keyof typeof courseTypeColors]}`}>
                            <div className="font-medium">{entry.course.code}</div>
                            <div className="opacity-75">Room: {entry.room}</div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Availability Management</CardTitle>
              <CardDescription>
                Update your teaching availability
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" data-testid="button-update-availability">
                Update Availability
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Swap Requests</CardTitle>
              <CardDescription>
                Request class swaps with colleagues
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline" data-testid="button-request-swap">
                Request Swap
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Calendar Sync</CardTitle>
              <CardDescription>
                Export to Google Calendar or Outlook
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline" data-testid="button-sync-calendar">
                <Calendar className="mr-2" size={16} />
                Sync Calendar
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
