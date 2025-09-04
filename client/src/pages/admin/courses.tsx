import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Download, Upload, Edit, Trash2, BookOpen, Clock } from "lucide-react";
import AdminLayout from "@/components/layout/admin-layout";
import { useQuery } from "@tanstack/react-query";

export default function AdminCourses() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  
  const { data: courses, isLoading } = useQuery({
    queryKey: ["/api/courses"],
  });

  const filteredCourses = courses?.filter((course: any) => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || course.type.toLowerCase() === filterType.toLowerCase();
    return matchesSearch && matchesType;
  }) || [];

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-1/4"></div>
            <div className="h-12 bg-muted rounded"></div>
            <div className="h-96 bg-muted rounded"></div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'major': return 'bg-chart-1 text-white';
      case 'minor': return 'bg-chart-2 text-white';
      case 'skill': return 'bg-chart-3 text-white';
      case 'aec': return 'bg-chart-5 text-white';
      case 'vac': return 'bg-chart-4 text-white';
      case 'lab': return 'bg-destructive text-white';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const courseTypes = ['all', 'major', 'minor', 'skill', 'aec', 'vac', 'lab'];

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold" data-testid="text-courses-title">Course Management</h1>
            <p className="text-muted-foreground">
              Manage courses, credits, and NEP 2020 compliance requirements
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" data-testid="button-import-courses">
              <Upload className="mr-2" size={16} />
              Import CSV
            </Button>
            <Button variant="outline" data-testid="button-export-courses">
              <Download className="mr-2" size={16} />
              Export
            </Button>
            <Button data-testid="button-add-course">
              <Plus className="mr-2" size={16} />
              Add Course
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                <Input
                  placeholder="Search courses by title, code, or department..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                  data-testid="input-search-courses"
                />
              </div>
              <div className="flex items-center space-x-2">
                {courseTypes.map((type) => (
                  <Button
                    key={type}
                    variant={filterType === type ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilterType(type)}
                    data-testid={`filter-${type}`}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Courses Table */}
        <Card>
          <CardHeader>
            <CardTitle>Courses ({filteredCourses.length})</CardTitle>
            <CardDescription>
              Complete course catalog with credits, types, and enrollment limits
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Course Code</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Credits</TableHead>
                  <TableHead>Hours</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Semester</TableHead>
                  <TableHead>Max Enrollment</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCourses.map((course: any) => (
                  <TableRow key={course.id}>
                    <TableCell className="font-medium" data-testid={`text-code-${course.code}`}>
                      {course.code}
                    </TableCell>
                    <TableCell data-testid={`text-title-${course.id}`}>{course.title}</TableCell>
                    <TableCell>
                      <Badge className={getTypeColor(course.type)}>
                        {course.type}
                      </Badge>
                    </TableCell>
                    <TableCell>{course.credits}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Clock size={14} className="text-muted-foreground" />
                        <span className="text-sm">
                          {course.theoryHours}T + {course.practicalHours}P
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{course.department}</Badge>
                    </TableCell>
                    <TableCell>{course.semester}</TableCell>
                    <TableCell>{course.maxEnrollment}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" data-testid={`button-edit-${course.id}`}>
                          <Edit size={14} />
                        </Button>
                        <Button variant="ghost" size="sm" data-testid={`button-delete-${course.id}`}>
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
          {courseTypes.slice(1).map((type) => {
            const count = courses?.filter((c: any) => c.type.toLowerCase() === type.toLowerCase()).length || 0;
            return (
              <Card key={type}>
                <CardContent className="p-6">
                  <div className="text-center">
                    <BookOpen className="mx-auto mb-2 text-muted-foreground" size={20} />
                    <p className="text-2xl font-bold">{count}</p>
                    <p className="text-sm text-muted-foreground">{type.toUpperCase()}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </AdminLayout>
  );
}
