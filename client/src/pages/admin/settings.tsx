import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Save, RefreshCw, Upload, Download, Settings, Calendar, Users, Globe } from "lucide-react";
import AdminLayout from "@/components/layout/admin-layout";
import { useToast } from "@/hooks/use-toast";

export default function AdminSettings() {
  const [isLoading, setIsLoading] = useState(false);
  const [studentSatisfactionWeight, setStudentSatisfactionWeight] = useState([40]);
  const [facultyBalanceWeight, setFacultyBalanceWeight] = useState([35]);
  const [roomUtilizationWeight, setRoomUtilizationWeight] = useState([25]);
  const { toast } = useToast();

  const handleSave = async () => {
    setIsLoading(true);
    // Simulate save operation
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    toast({
      title: "Success",
      description: "Settings saved successfully!",
    });
  };

  const timeSlots = [
    { start: "09:00", end: "10:00", enabled: true },
    { start: "10:00", end: "11:00", enabled: true },
    { start: "11:00", end: "12:00", enabled: true },
    { start: "12:00", end: "13:00", enabled: false }, // Lunch break
    { start: "13:00", end: "14:00", enabled: true },
    { start: "14:00", end: "15:00", enabled: true },
    { start: "15:00", end: "16:00", enabled: true },
    { start: "16:00", end: "17:00", enabled: true },
  ];

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold" data-testid="text-settings-title">Settings</h1>
            <p className="text-muted-foreground">
              Configure system parameters, solver weights, and integrations
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" onClick={() => window.location.reload()} data-testid="button-reset-settings">
              <RefreshCw className="mr-2" size={16} />
              Reset
            </Button>
            <Button onClick={handleSave} disabled={isLoading} data-testid="button-save-settings">
              {isLoading ? (
                <div className="loading-spinner mr-2" />
              ) : (
                <Save className="mr-2" size={16} />
              )}
              Save Changes
            </Button>
          </div>
        </div>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general" data-testid="tab-general">
              <Settings className="mr-2" size={16} />
              General
            </TabsTrigger>
            <TabsTrigger value="timetable" data-testid="tab-timetable">
              <Calendar className="mr-2" size={16} />
              Timetable
            </TabsTrigger>
            <TabsTrigger value="solver" data-testid="tab-solver">
              <Users className="mr-2" size={16} />
              AI Solver
            </TabsTrigger>
            <TabsTrigger value="integrations" data-testid="tab-integrations">
              <Globe className="mr-2" size={16} />
              Integrations
            </TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Institution Information</CardTitle>
                <CardDescription>
                  Basic details about your educational institution
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="institution-name">Institution Name</Label>
                    <Input 
                      id="institution-name" 
                      defaultValue="University of Education" 
                      data-testid="input-institution-name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="institution-code">Institution Code</Label>
                    <Input 
                      id="institution-code" 
                      defaultValue="UOE2024" 
                      data-testid="input-institution-code"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="academic-year">Academic Year</Label>
                    <Input 
                      id="academic-year" 
                      defaultValue="2024-25" 
                      data-testid="input-academic-year"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="current-semester">Current Semester</Label>
                    <Input 
                      id="current-semester" 
                      defaultValue="Odd Semester" 
                      data-testid="input-current-semester"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Preferences</CardTitle>
                <CardDescription>
                  General system behavior and user experience settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Dark Mode</Label>
                    <p className="text-sm text-muted-foreground">Use dark theme for the interface</p>
                  </div>
                  <Switch defaultChecked data-testid="switch-dark-mode" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive email updates for important events</p>
                  </div>
                  <Switch defaultChecked data-testid="switch-email-notifications" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Auto-save Changes</Label>
                    <p className="text-sm text-muted-foreground">Automatically save changes while editing</p>
                  </div>
                  <Switch defaultChecked data-testid="switch-auto-save" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Timetable Settings */}
          <TabsContent value="timetable" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Time Slot Configuration</CardTitle>
                <CardDescription>
                  Define the daily time slots for scheduling classes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {timeSlots.map((slot, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Switch defaultChecked={slot.enabled} data-testid={`switch-slot-${index}`} />
                        <span className="font-medium">{slot.start} - {slot.end}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {!slot.enabled && "(Lunch Break)"}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Academic Calendar</CardTitle>
                <CardDescription>
                  Set holidays, exam periods, and special events
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="semester-start">Semester Start Date</Label>
                    <Input 
                      id="semester-start" 
                      type="date" 
                      defaultValue="2024-07-15" 
                      data-testid="input-semester-start"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="semester-end">Semester End Date</Label>
                    <Input 
                      id="semester-end" 
                      type="date" 
                      defaultValue="2024-12-15" 
                      data-testid="input-semester-end"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Holiday Periods</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 p-2 border rounded">
                      <Input placeholder="Holiday name" defaultValue="Diwali Festival" />
                      <Input type="date" defaultValue="2024-11-01" />
                      <Input type="date" defaultValue="2024-11-05" />
                      <Button variant="outline" size="sm">Remove</Button>
                    </div>
                    <Button variant="outline" size="sm" data-testid="button-add-holiday">
                      Add Holiday Period
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI Solver Settings */}
          <TabsContent value="solver" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Optimization Weights</CardTitle>
                <CardDescription>
                  Adjust the relative importance of different optimization criteria
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Student Satisfaction</Label>
                      <span className="text-sm font-medium">{studentSatisfactionWeight[0]}%</span>
                    </div>
                    <Slider
                      value={studentSatisfactionWeight}
                      onValueChange={setStudentSatisfactionWeight}
                      max={100}
                      step={5}
                      data-testid="slider-student-satisfaction"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Faculty Balance</Label>
                      <span className="text-sm font-medium">{facultyBalanceWeight[0]}%</span>
                    </div>
                    <Slider
                      value={facultyBalanceWeight}
                      onValueChange={setFacultyBalanceWeight}
                      max={100}
                      step={5}
                      data-testid="slider-faculty-balance"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Room Utilization</Label>
                      <span className="text-sm font-medium">{roomUtilizationWeight[0]}%</span>
                    </div>
                    <Slider
                      value={roomUtilizationWeight}
                      onValueChange={setRoomUtilizationWeight}
                      max={100}
                      step={5}
                      data-testid="slider-room-utilization"
                    />
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  Note: Weights should ideally sum to 100% for optimal results
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Constraint Settings</CardTitle>
                <CardDescription>
                  Configure hard and soft constraints for the AI solver
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Strict Faculty Availability</Label>
                    <p className="text-sm text-muted-foreground">Never schedule outside faculty availability</p>
                  </div>
                  <Switch defaultChecked data-testid="switch-strict-faculty" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Room Capacity Enforcement</Label>
                    <p className="text-sm text-muted-foreground">Strictly enforce room capacity limits</p>
                  </div>
                  <Switch defaultChecked data-testid="switch-room-capacity" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Lunch Break Protection</Label>
                    <p className="text-sm text-muted-foreground">Ensure lunch break is preserved</p>
                  </div>
                  <Switch defaultChecked data-testid="switch-lunch-break" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>NEP 2020 Compliance</Label>
                    <p className="text-sm text-muted-foreground">Enforce NEP 2020 credit requirements</p>
                  </div>
                  <Switch defaultChecked data-testid="switch-nep-compliance" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Integrations */}
          <TabsContent value="integrations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>ERP/LMS Integration</CardTitle>
                <CardDescription>
                  Connect with existing educational management systems
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="erp-endpoint">ERP API Endpoint</Label>
                  <Input 
                    id="erp-endpoint" 
                    placeholder="https://your-erp.edu/api" 
                    data-testid="input-erp-endpoint"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="erp-key">API Key</Label>
                  <Input 
                    id="erp-key" 
                    type="password" 
                    placeholder="Enter API key" 
                    data-testid="input-erp-key"
                  />
                </div>
                <Button variant="outline" data-testid="button-test-connection">
                  Test Connection
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Import/Export</CardTitle>
                <CardDescription>
                  Configure automatic data synchronization and backup settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Auto Import Student Data</Label>
                    <p className="text-sm text-muted-foreground">Automatically sync student records daily</p>
                  </div>
                  <Switch data-testid="switch-auto-import" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Export to Google Calendar</Label>
                    <p className="text-sm text-muted-foreground">Enable calendar sync for faculty and students</p>
                  </div>
                  <Switch data-testid="switch-google-calendar" />
                </div>
                <div className="space-y-2">
                  <Label>Export Format Preferences</Label>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" data-testid="button-prefer-pdf">PDF</Button>
                    <Button variant="outline" size="sm" data-testid="button-prefer-excel">Excel</Button>
                    <Button variant="outline" size="sm" data-testid="button-prefer-csv">CSV</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Backup & Recovery</CardTitle>
                <CardDescription>
                  Manage system backups and data recovery options
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Automatic Backups</Label>
                    <p className="text-sm text-muted-foreground">Create daily system backups</p>
                  </div>
                  <Switch defaultChecked data-testid="switch-auto-backup" />
                </div>
                <div className="space-y-2">
                  <Label>Backup Retention (Days)</Label>
                  <Input type="number" defaultValue="30" min="7" max="365" data-testid="input-backup-retention" />
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" data-testid="button-create-backup">
                    <Download className="mr-2" size={16} />
                    Create Backup
                  </Button>
                  <Button variant="outline" data-testid="button-restore-backup">
                    <Upload className="mr-2" size={16} />
                    Restore Backup
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
