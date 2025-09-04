import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Download, Upload, Edit, Trash2 } from "lucide-react";
import AdminLayout from "@/components/layout/admin-layout";
import { useQuery } from "@tanstack/react-query";

export default function AdminStudents() {
  const [searchTerm, setSearchTerm] = useState("");
  
  const { data: students, isLoading } = useQuery({
    queryKey: ["/api/students"],
  });

  const filteredStudents = students?.filter((student: any) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.rollNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.program.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

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

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold" data-testid="text-students-title">Student Management</h1>
            <p className="text-muted-foreground">
              Manage student records, preferences, and course enrollments
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" data-testid="button-import-students">
              <Upload className="mr-2" size={16} />
              Import CSV
            </Button>
            <Button variant="outline" data-testid="button-export-students">
              <Download className="mr-2" size={16} />
              Export
            </Button>
            <Button data-testid="button-add-student">
              <Plus className="mr-2" size={16} />
              Add Student
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
                  placeholder="Search students by name, roll number, or program..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                  data-testid="input-search-students"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Students Table */}
        <Card>
          <CardHeader>
            <CardTitle>Students ({filteredStudents.length})</CardTitle>
            <CardDescription>
              Complete list of enrolled students with their preferences and credit information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Roll No</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Program</TableHead>
                  <TableHead>Semester</TableHead>
                  <TableHead>Credits</TableHead>
                  <TableHead>Section</TableHead>
                  <TableHead>Preferences</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student: any) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium" data-testid={`text-roll-${student.rollNo}`}>
                      {student.rollNo}
                    </TableCell>
                    <TableCell data-testid={`text-name-${student.id}`}>{student.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{student.program}</Badge>
                    </TableCell>
                    <TableCell>{student.semester}</TableCell>
                    <TableCell>
                      <span className={student.totalCredits > 20 ? "text-destructive" : student.totalCredits < 12 ? "text-chart-3" : "text-chart-2"}>
                        {student.totalCredits}
                      </span>
                    </TableCell>
                    <TableCell>{student.section}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {student.preferences?.majors?.slice(0, 2).map((major: string, index: number) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {major}
                          </Badge>
                        ))}
                        {(student.preferences?.majors?.length || 0) > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{(student.preferences?.majors?.length || 0) - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" data-testid={`button-edit-${student.id}`}>
                          <Edit size={14} />
                        </Button>
                        <Button variant="ghost" size="sm" data-testid={`button-delete-${student.id}`}>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-chart-1">{students?.length || 0}</p>
                <p className="text-sm text-muted-foreground">Total Students</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-chart-2">
                  {students?.filter((s: any) => s.totalCredits >= 12 && s.totalCredits <= 20).length || 0}
                </p>
                <p className="text-sm text-muted-foreground">Proper Credit Load</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-chart-3">
                  {students?.filter((s: any) => s.totalCredits > 20 || s.totalCredits < 12).length || 0}
                </p>
                <p className="text-sm text-muted-foreground">Credit Issues</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
