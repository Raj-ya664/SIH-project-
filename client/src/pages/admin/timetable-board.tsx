import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter, Download, Calendar, Eye, Grid } from "lucide-react";
import AdminLayout from "@/components/layout/admin-layout";
import CalendarGrid from "@/components/timetable/calendar-grid";

export default function AdminTimetableBoard() {
  const [viewMode, setViewMode] = useState("program");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedView, setSelectedView] = useState("week");

  const viewOptions = [
    { value: "program", label: "By Program" },
    { value: "faculty", label: "By Faculty" },
    { value: "room", label: "By Room/Lab" },
    { value: "student", label: "By Student Cohort" },
  ];

  const filterOptions = {
    program: ["All Programs", "B.Ed.", "M.Ed.", "FYUP", "ITEP"],
    faculty: ["All Faculty", "Dr. Sarah Wilson", "Prof. Michael Brown"],
    room: ["All Rooms", "A301", "B205", "IT-LAB-01"],
    student: ["All Cohorts", "Section A", "Section B", "Section C"],
  };

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold" data-testid="text-timetable-board-title">Timetable Board</h1>
            <p className="text-muted-foreground">
              Interactive calendar with drag-and-drop scheduling and conflict detection
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" data-testid="button-export-timetable">
              <Download className="mr-2" size={16} />
              Export
            </Button>
            <Button variant="outline" data-testid="button-calendar-sync">
              <Calendar className="mr-2" size={16} />
              Sync to Calendar
            </Button>
          </div>
        </div>

        {/* Controls */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-wrap items-center gap-4">
              {/* View Mode */}
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium">View:</label>
                <Select value={viewMode} onValueChange={setViewMode}>
                  <SelectTrigger className="w-48" data-testid="select-view-mode">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {viewOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Filter */}
              <div className="flex items-center space-x-2">
                <Filter size={16} className="text-muted-foreground" />
                <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                  <SelectTrigger className="w-48" data-testid="select-filter">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {filterOptions[viewMode as keyof typeof filterOptions]?.map((option) => (
                      <SelectItem key={option} value={option.toLowerCase().replace(/\s+/g, '-')}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* View Type */}
              <div className="flex items-center space-x-2">
                <Button
                  variant={selectedView === "week" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedView("week")}
                  data-testid="button-week-view"
                >
                  <Grid className="mr-2" size={14} />
                  Week
                </Button>
                <Button
                  variant={selectedView === "day" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedView("day")}
                  data-testid="button-day-view"
                >
                  <Eye className="mr-2" size={14} />
                  Day
                </Button>
              </div>

              {/* Course Type Legend */}
              <div className="flex items-center space-x-4 ml-auto">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 course-major rounded"></div>
                  <span className="text-sm">Major</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 course-minor rounded"></div>
                  <span className="text-sm">Minor</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 course-skill rounded"></div>
                  <span className="text-sm">Skill</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 course-aec rounded"></div>
                  <span className="text-sm">AEC</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 course-vac rounded"></div>
                  <span className="text-sm">VAC</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 course-lab rounded"></div>
                  <span className="text-sm">Lab</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Interactive Calendar */}
        <Card>
          <CardHeader>
            <CardTitle>Interactive Timetable</CardTitle>
            <CardDescription>
              Drag and drop courses to reschedule. Real-time conflict detection enabled.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CalendarGrid viewMode={viewMode} selectedFilter={selectedFilter} />
          </CardContent>
        </Card>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-chart-2" data-testid="stat-conflicts">0</p>
                <p className="text-sm text-muted-foreground">Conflicts</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-chart-1" data-testid="stat-satisfaction">94%</p>
                <p className="text-sm text-muted-foreground">Student Satisfaction</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-chart-3" data-testid="stat-utilization">87%</p>
                <p className="text-sm text-muted-foreground">Room Utilization</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-chart-2" data-testid="stat-balance">Good</p>
                <p className="text-sm text-muted-foreground">Faculty Balance</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
