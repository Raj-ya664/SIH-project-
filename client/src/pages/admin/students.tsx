import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Download, Upload, Edit, Trash2 } from "lucide-react";
import AdminLayout from "@/components/layout/admin-layout";
import { useQuery } from "@tanstack/react-query";

const addStudentSchema = z.object({
  rollNo: z.string().min(1, "Roll number is required"),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address").optional(),
  program: z.string().min(1, "Program is required"),
  semester: z.coerce.number().min(1).max(8),
  totalCredits: z.coerce.number().min(0).max(30).default(0),
  section: z.string().min(1, "Section is required"),
  preferences: z.object({
    majors: z.array(z.string()).default([]),
    minors: z.array(z.string()).default([]),
    skills: z.array(z.string()).default([]),
    aec: z.array(z.string()).default([]),
    vac: z.array(z.string()).default([])
  }).default({})
});

export default function AdminStudents() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof addStudentSchema>>({
    resolver: zodResolver(addStudentSchema),
    defaultValues: {
      rollNo: "",
      name: "",
      email: "",
      program: "",
      semester: 1,
      totalCredits: 0,
      section: "",
      preferences: {
        majors: [],
        minors: [],
        skills: [],
        aec: [],
        vac: []
      }
    }
  });

  const addStudentMutation = useMutation({
    mutationFn: (data: z.infer<typeof addStudentSchema>) => 
      apiRequest("POST", "/api/students", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/students"] });
      setIsAddDialogOpen(false);
      form.reset();
      toast({
        title: "Success",
        description: "Student added successfully!"
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add student. Please try again.",
        variant: "destructive"
      });
    }
  });

  const onSubmit = (data: z.infer<typeof addStudentSchema>) => {
    addStudentMutation.mutate(data);
  };
  
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
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button data-testid="button-add-student">
                  <Plus className="mr-2" size={16} />
                  Add Student
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add New Student</DialogTitle>
                  <DialogDescription>
                    Enter student details to add them to the system
                  </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="rollNo"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Roll Number</FormLabel>
                            <FormControl>
                              <Input placeholder="2024001" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Student Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email (Optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="john@student.edu" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="program"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Program</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select program" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="B.Ed.">B.Ed.</SelectItem>
                                <SelectItem value="M.Ed.">M.Ed.</SelectItem>
                                <SelectItem value="FYUP">FYUP</SelectItem>
                                <SelectItem value="ITEP">ITEP</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name="semester"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Semester</FormLabel>
                            <FormControl>
                              <Input type="number" min="1" max="8" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="totalCredits"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Total Credits</FormLabel>
                            <FormControl>
                              <Input type="number" min="0" max="30" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="section"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Section</FormLabel>
                            <FormControl>
                              <Input placeholder="A" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsAddDialogOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button type="submit" disabled={addStudentMutation.isPending}>
                        {addStudentMutation.isPending ? "Adding..." : "Add Student"}
                      </Button>
                    </div>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
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
