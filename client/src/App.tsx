import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "./lib/theme-provider";
import NotFound from "@/pages/not-found";
import Landing from "@/pages/landing";
import Login from "@/pages/login";
import AdminDashboard from "@/pages/admin/dashboard";
import AdminStudents from "@/pages/admin/students";
import AdminFaculty from "@/pages/admin/faculty";
import AdminCourses from "@/pages/admin/courses";
import AdminRooms from "@/pages/admin/rooms";
import AdminTimetableGenerator from "@/pages/admin/timetable-generator";
import AdminTimetableBoard from "@/pages/admin/timetable-board";
import AdminScenarios from "@/pages/admin/scenarios";
import AdminReports from "@/pages/admin/reports";
import AdminSettings from "@/pages/admin/settings";
import FacultyDashboard from "@/pages/faculty/dashboard";
import StudentDashboard from "@/pages/student/dashboard";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/login" component={Login} />
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/admin/students" component={AdminStudents} />
      <Route path="/admin/faculty" component={AdminFaculty} />
      <Route path="/admin/courses" component={AdminCourses} />
      <Route path="/admin/rooms" component={AdminRooms} />
      <Route path="/admin/timetable-generator" component={AdminTimetableGenerator} />
      <Route path="/admin/timetable-board" component={AdminTimetableBoard} />
      <Route path="/admin/scenarios" component={AdminScenarios} />
      <Route path="/admin/reports" component={AdminReports} />
      <Route path="/admin/settings" component={AdminSettings} />
      <Route path="/faculty" component={FacultyDashboard} />
      <Route path="/student" component={StudentDashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="edutime-theme">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
