import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
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
import { Plus, Search, Download, Upload, Edit, Trash2, Clock, UserCheck } from "lucide-react";
import AdminLayout from "@/components/layout/admin-layout";
import { useQuery } from "@tanstack/react-query";

const addFacultySchema = z.object({
  employeeId: z.string().min(1, "Employee ID is required"),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address").optional(),
  department: z.string().min(1, "Department is required"),
  expertise: z.array(z.string()).default([]),
  maxHoursPerWeek: z.coerce.number().min(1).max(40).default(20),
  currentHours: z.coerce.number().min(0).default(0)
});

export default function AdminFaculty() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [expertiseInput, setExpertiseInput] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof addFacultySchema>>({
    resolver: zodResolver(addFacultySchema),
    defaultValues: {
      employeeId: "",
      name: "",
      email: "",
      department: "",
      expertise: [],
      maxHoursPerWeek: 20,
      currentHours: 0
    }
  });

  const addFacultyMutation = useMutation({
    mutationFn: (data: z.infer<typeof addFacultySchema>) => 
      apiRequest("POST", "/api/faculty", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/faculty"] });
      setIsAddDialogOpen(false);
      form.reset();
      setExpertiseInput("");
      toast({
        title: "Success",
        description: "Faculty member added successfully!"
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add faculty member. Please try again.",
        variant: "destructive"
      });
    }
  });

  const deleteFacultyMutation = useMutation({
    mutationFn: (id: string) => apiRequest("DELETE", `/api/faculty/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/faculty"] });
      toast({
        title: "Success",
        description: "Faculty member deleted successfully!"
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete faculty member. Please try again.",
        variant: "destructive"
      });
    }
  });

  const onSubmit = (data: z.infer<typeof addFacultySchema>) => {
    const expertise = expertiseInput.split(',').map(s => s.trim()).filter(s => s.length > 0);
    addFacultyMutation.mutate({ ...data, expertise });
  };
  
  const { data: faculty, isLoading } = useQuery({
    queryKey: ["/api/faculty"],
  });

  const filteredFaculty = faculty?.filter((member: any) =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.department.toLowerCase().includes(searchTerm.toLowerCase())
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

  const getWorkloadStatus = (currentHours: number, maxHours: number) => {
    const percentage = (currentHours / maxHours) * 100;
    if (percentage < 70) return { color: "text-chart-3", bg: "bg-chart-3/10", status: "Under-loaded" };
    if (percentage > 100) return { color: "text-destructive", bg: "bg-destructive/10", status: "Over-loaded" };
    return { color: "text-chart-2", bg: "bg-chart-2/10", status: "Balanced" };
  };

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold" data-testid="text-faculty-title">Faculty Management</h1>
            <p className="text-muted-foreground">
              Manage faculty records, availability, and workload distribution
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" data-testid="button-import-faculty">
              <Upload className="mr-2" size={16} />
              Import CSV
            </Button>
            <Button variant="outline" data-testid="button-export-faculty">
              <Download className="mr-2" size={16} />
              Export
            </Button>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button data-testid="button-add-faculty">
                  <Plus className="mr-2" size={16} />
                  Add Faculty
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add New Faculty Member</DialogTitle>
                  <DialogDescription>
                    Enter faculty details to add them to the system
                  </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="employeeId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Employee ID</FormLabel>
                            <FormControl>
                              <Input placeholder="FAC001" {...field} />
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
                            <FormLabel>Faculty Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Dr. John Smith" {...field} />
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
                              <Input placeholder="john@university.edu" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="department"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Department</FormLabel>
                            <FormControl>
                              <Input placeholder="Education" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="maxHoursPerWeek"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Max Hours Per Week</FormLabel>
                            <FormControl>
                              <Input type="number" min="1" max="40" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="currentHours"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Current Hours</FormLabel>
                            <FormControl>
                              <Input type="number" min="0" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Expertise (comma-separated)</label>
                      <Textarea
                        placeholder="Curriculum Development, Educational Technology, Assessment"
                        value={expertiseInput}
                        onChange={(e) => setExpertiseInput(e.target.value)}
                        className="mt-1"
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
                      <Button type="submit" disabled={addFacultyMutation.isPending}>
                        {addFacultyMutation.isPending ? "Adding..." : "Add Faculty"}
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
                  placeholder="Search faculty by name, employee ID, or department..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                  data-testid="input-search-faculty"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Faculty Table */}
        <Card>
          <CardHeader>
            <CardTitle>Faculty Members ({filteredFaculty.length})</CardTitle>
            <CardDescription>
              Complete list of faculty with workload and availability information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Expertise</TableHead>
                  <TableHead>Workload</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Availability</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFaculty.map((member: any) => {
                  const workloadStatus = getWorkloadStatus(member.currentHours, member.maxHoursPerWeek);
                  return (
                    <TableRow key={member.id}>
                      <TableCell className="font-medium" data-testid={`text-employee-${member.employeeId}`}>
                        {member.employeeId}
                      </TableCell>
                      <TableCell data-testid={`text-name-${member.id}`}>{member.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{member.department}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {member.expertise?.slice(0, 2).map((skill: string, index: number) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {(member.expertise?.length || 0) > 2 && (
                            <Badge variant="secondary" className="text-xs">
                              +{(member.expertise?.length || 0) - 2}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Clock size={14} className="text-muted-foreground" />
                          <span>{member.currentHours}/{member.maxHoursPerWeek}h</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className={`px-2 py-1 rounded-full text-xs ${workloadStatus.bg} ${workloadStatus.color}`}>
                          {workloadStatus.status}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <UserCheck size={14} className="text-chart-2" />
                          <span className="text-sm">Available</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm" data-testid={`button-edit-${member.id}`}>
                            <Edit size={14} />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => {
                              if (window.confirm(`Are you sure you want to delete ${member.name}?`)) {
                                deleteFacultyMutation.mutate(member.id);
                              }
                            }}
                            data-testid={`button-delete-${member.id}`}
                          >
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-chart-1">{faculty?.length || 0}</p>
                <p className="text-sm text-muted-foreground">Total Faculty</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-chart-2">
                  {faculty?.filter((f: any) => {
                    const percentage = (f.currentHours / f.maxHoursPerWeek) * 100;
                    return percentage >= 70 && percentage <= 100;
                  }).length || 0}
                </p>
                <p className="text-sm text-muted-foreground">Balanced Load</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-chart-3">
                  {faculty?.filter((f: any) => (f.currentHours / f.maxHoursPerWeek) * 100 < 70).length || 0}
                </p>
                <p className="text-sm text-muted-foreground">Under-loaded</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-destructive">
                  {faculty?.filter((f: any) => (f.currentHours / f.maxHoursPerWeek) * 100 > 100).length || 0}
                </p>
                <p className="text-sm text-muted-foreground">Over-loaded</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
