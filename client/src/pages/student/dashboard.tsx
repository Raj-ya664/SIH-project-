import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, BookOpen, CreditCard, Download, Bell, AlertTriangle, CheckCircle, GraduationCap } from "lucide-react";
import { mockTimetableData, courseTypeColors, timeSlots, weekDays } from "@/lib/mock-data";
import { authService } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";

export default function StudentDashboard() {
  const user = authService.getUser();
  const { toast } = useToast();
  
  // Mock student data
  const studentData = {
    name: "Alice Johnson",
    rollNo: "2024001",
    program: "B.Ed.",
    semester: 3,
    section: "A",
    totalCredits: 18,
    maxCredits: 22,
    minCredits: 12,
  };

  const [selectedPreferences, setSelectedPreferences] = useState({
    majors: ["Educational Technology", "Curriculum Development"],
    minors: ["Psychology"],
    skills: ["Research Methods", "Communication Skills"],
    aec: ["Environmental Studies"],
    vac: ["Sports & Wellness"]
  });

  // Available courses by type
  const availableCourses = {
    majors: [
      { code: "EDU101", title: "Foundations of Education", credits: 4, selected: true },
      { code: "EDU102", title: "Educational Technology", credits: 4, selected: true },
      { code: "EDU103", title: "Curriculum Development", credits: 3, selected: false },
      { code: "EDU104", title: "Assessment & Evaluation", credits: 3, selected: false },
    ],
    minors: [
      { code: "PSY201", title: "Educational Psychology", credits: 3, selected: true },
      { code: "SOC201", title: "Educational Sociology", credits: 3, selected: false },
      { code: "PHIL201", title: "Philosophy of Education", credits: 3, selected: false },
    ],
    skills: [
      { code: "SKILL101", title: "Communication Skills", credits: 2, selected: true },
      { code: "SKILL102", title: "Research Methods", credits: 2, selected: true },
      { code: "SKILL103", title: "Digital Literacy", credits: 2, selected: false },
    ],
    aec: [
      { code: "AEC101", title: "Environmental Studies", credits: 2, selected: true },
      { code: "AEC102", title: "Constitutional Studies", credits: 2, selected: false },
      { code: "AEC103", title: "Indian Knowledge Systems", credits: 2, selected: false },
    ],
    vac: [
      { code: "VAC101", title: "Sports & Wellness", credits: 1, selected: true },
      { code: "VAC102", title: "Arts & Culture", credits: 1, selected: false },
      { code: "VAC103", title: "Community Service", credits: 1, selected: false },
    ]
  };

  const handleCourseToggle = (type: keyof typeof availableCourses, courseCode: string) => {
    const courses = availableCourses[type];
    const course = courses.find(c => c.code === courseCode);
    if (course) {
      course.selected = !course.selected;
      toast({
        title: course.selected ? "Course Added" : "Course Removed",
        description: `${course.title} ${course.selected ? 'added to' : 'removed from'} your preferences`,
      });
    }
  };

  const calculateTotalCredits = () => {
    let total = 0;
    Object.values(availableCourses).forEach(courses => {
      courses.forEach(course => {
        if (course.selected) total += course.credits;
      });
    });
    return total;
  };

  const totalCredits = calculateTotalCredits();
  const creditStatus = totalCredits < studentData.minCredits ? 'insufficient' : 
                      totalCredits > studentData.maxCredits ? 'excessive' : 'valid';

  // Filter timetable for student's courses
  const myTimetable = mockTimetableData.filter(entry => 
    Object.values(availableCourses).some(courses => 
      courses.some(course => course.selected && course.code === entry.course.code)
    )
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold" data-testid="text-student-dashboard-title">
                Student Portal
              </h1>
              <p className="text-muted-foreground">Welcome back, {studentData.name}</p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm" data-testid="button-notifications">
                <Bell className="mr-2" size={16} />
                Notifications
              </Button>
              <Button variant="outline" size="sm" onClick={() => authService.logout()}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-6 space-y-6">
        {/* Student Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Roll Number</p>
                  <p className="text-2xl font-bold text-chart-1" data-testid="text-roll-number">
                    {studentData.rollNo}
                  </p>
                </div>
                <GraduationCap className="text-chart-1" size={24} />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Program</p>
                  <p className="text-2xl font-bold text-chart-2" data-testid="text-program">
                    {studentData.program}
                  </p>
                </div>
                <BookOpen className="text-chart-2" size={24} />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Semester</p>
                  <p className="text-2xl font-bold text-chart-3" data-testid="text-semester">
                    {studentData.semester}
                  </p>
                </div>
                <Calendar className="text-chart-3" size={24} />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Credits</p>
                  <p className={`text-2xl font-bold ${
                    creditStatus === 'valid' ? 'text-chart-2' : 
                    creditStatus === 'insufficient' ? 'text-chart-3' : 'text-destructive'
                  }`} data-testid="text-credits">
                    {totalCredits}
                  </p>
                </div>
                <CreditCard className={
                  creditStatus === 'valid' ? 'text-chart-2' : 
                  creditStatus === 'insufficient' ? 'text-chart-3' : 'text-destructive'
                } size={24} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Credit Validation Alert */}
        {creditStatus !== 'valid' && (
          <Card className={`border-l-4 ${
            creditStatus === 'insufficient' ? 'border-l-chart-3' : 'border-l-destructive'
          }`}>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <AlertTriangle className={
                  creditStatus === 'insufficient' ? 'text-chart-3' : 'text-destructive'
                } size={20} />
                <div>
                  <p className="font-medium">
                    {creditStatus === 'insufficient' ? 'Insufficient Credits' : 'Excessive Credits'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {creditStatus === 'insufficient' 
                      ? `You need at least ${studentData.minCredits} credits. Current: ${totalCredits}`
                      : `Maximum allowed is ${studentData.maxCredits} credits. Current: ${totalCredits}`
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="preferences" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="preferences" data-testid="tab-preferences">
              Course Preferences
            </TabsTrigger>
            <TabsTrigger value="timetable" data-testid="tab-timetable">
              My Timetable
            </TabsTrigger>
          </TabsList>

          {/* Course Preferences */}
          <TabsContent value="preferences" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>NEP 2020 Course Selection</CardTitle>
                <CardDescription>
                  Select your preferred courses across different categories
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Credit Progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Credit Progress</span>
                      <span>{totalCredits}/{studentData.maxCredits} credits</span>
                    </div>
                    <Progress 
                      value={(totalCredits / studentData.maxCredits) * 100} 
                      className={`w-full ${
                        creditStatus === 'valid' ? '' : 
                        creditStatus === 'insufficient' ? 'bg-chart-3/20' : 'bg-destructive/20'
                      }`}
                    />
                  </div>

                  {/* Course Categories */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {Object.entries(availableCourses).map(([type, courses]) => (
                      <Card key={type}>
                        <CardHeader>
                          <CardTitle className="flex items-center space-x-2">
                            <div className={`w-4 h-4 rounded ${
                              type === 'majors' ? 'course-major' :
                              type === 'minors' ? 'course-minor' :
                              type === 'skills' ? 'course-skill' :
                              type === 'aec' ? 'course-aec' : 'course-vac'
                            }`} />
                            <span>{type.toUpperCase()}</span>
                          </CardTitle>
                          <CardDescription>
                            {type === 'majors' && 'Core subjects for your specialization'}
                            {type === 'minors' && 'Secondary subjects to broaden knowledge'}
                            {type === 'skills' && 'Skill Enhancement Courses'}
                            {type === 'aec' && 'Ability Enhancement Courses'}
                            {type === 'vac' && 'Value Added Courses'}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {courses.map((course) => (
                              <div key={course.code} className="flex items-center space-x-3">
                                <Checkbox
                                  checked={course.selected}
                                  onCheckedChange={() => handleCourseToggle(type as keyof typeof availableCourses, course.code)}
                                  data-testid={`checkbox-${course.code}`}
                                />
                                <div className="flex-1">
                                  <p className="font-medium text-sm">{course.title}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {course.code} • {course.credits} credits
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* Save Button */}
                  <div className="flex justify-center">
                    <Button 
                      className="bg-chart-2 hover:bg-chart-2/90" 
                      disabled={creditStatus !== 'valid'}
                      data-testid="button-save-preferences"
                    >
                      <CheckCircle className="mr-2" size={16} />
                      Save Course Preferences
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Personal Timetable */}
          <TabsContent value="timetable" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>My Personalized Timetable</CardTitle>
                    <CardDescription>
                      Your weekly schedule based on selected courses
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" data-testid="button-export-pdf">
                      <Download className="mr-2" size={14} />
                      Export PDF
                    </Button>
                    <Button variant="outline" size="sm" data-testid="button-sync-calendar">
                      <Calendar className="mr-2" size={14} />
                      Add to Calendar
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {myTimetable.length === 0 ? (
                  <div className="text-center py-12">
                    <Calendar className="mx-auto mb-4 text-muted-foreground" size={48} />
                    <h3 className="text-lg font-medium mb-2">No Timetable Available</h3>
                    <p className="text-muted-foreground">
                      Please select your course preferences to generate your personalized timetable.
                    </p>
                  </div>
                ) : (
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
                                  <div className="opacity-75">{entry.course.title}</div>
                                  <div className="opacity-75">Room: {entry.room}</div>
                                  <div className="opacity-75">{entry.faculty}</div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Course Legend */}
            <Card>
              <CardHeader>
                <CardTitle>Course Type Legend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 course-major rounded"></div>
                    <span className="text-sm">Major Courses</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 course-minor rounded"></div>
                    <span className="text-sm">Minor Courses</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 course-skill rounded"></div>
                    <span className="text-sm">Skill Enhancement</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 course-aec rounded"></div>
                    <span className="text-sm">AEC Courses</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 course-vac rounded"></div>
                    <span className="text-sm">VAC Courses</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 course-lab rounded"></div>
                    <span className="text-sm">Laboratory</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Academic Progress</CardTitle>
              <CardDescription>
                Track your semester progress
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Completed Credits</span>
                  <span>45/120</span>
                </div>
                <Progress value={37.5} className="w-full" />
                <p className="text-xs text-muted-foreground">37.5% of degree completed</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Attendance</CardTitle>
              <CardDescription>
                Your attendance summary
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <p className="text-3xl font-bold text-chart-2">92%</p>
                <p className="text-sm text-muted-foreground">Overall attendance</p>
                <Button variant="outline" size="sm" className="mt-2" data-testid="button-view-attendance">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>
                Important updates and announcements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-chart-1 rounded-full"></div>
                  <span className="text-sm">New assignment posted</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-chart-3 rounded-full"></div>
                  <span className="text-sm">Exam schedule updated</span>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-2" data-testid="button-view-notifications">
                  View All
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
