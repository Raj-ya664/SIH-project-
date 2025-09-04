import { Button } from "@/components/ui/button";
import { GraduationCap, LayoutDashboard, Users, UserCheck, BookOpen, Building, Calendar, Target, BarChart3, Settings, LogOut } from "lucide-react";
import { Link, useLocation } from "wouter";
import { authService } from "@/lib/auth";

export default function Sidebar() {
  const [location] = useLocation();
  const user = authService.getUser();

  const handleLogout = () => {
    authService.logout();
    window.location.href = "/";
  };

  const navItems = [
    { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/admin/students", icon: Users, label: "Students" },
    { href: "/admin/faculty", icon: UserCheck, label: "Faculty" },
    { href: "/admin/courses", icon: BookOpen, label: "Courses" },
    { href: "/admin/rooms", icon: Building, label: "Rooms/Labs" },
    { href: "/admin/timetable-generator", icon: Calendar, label: "Timetable Generator" },
    { href: "/admin/timetable-board", icon: Target, label: "Timetable Board" },
    { href: "/admin/scenarios", icon: Target, label: "Scenarios" },
    { href: "/admin/reports", icon: BarChart3, label: "Reports & Exports" },
    { href: "/admin/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <div className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center">
            <GraduationCap className="text-sidebar-primary-foreground" size={20} />
          </div>
          <div>
            <h1 className="text-lg font-bold text-sidebar-foreground">EduTime AI</h1>
            <p className="text-xs text-sidebar-foreground/60">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const isActive = location === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant={isActive ? "default" : "ghost"}
                className={`w-full justify-start ${
                  isActive 
                    ? "bg-sidebar-primary text-sidebar-primary-foreground" 
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                }`}
                data-testid={`nav-${item.label.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
              >
                <item.icon className="mr-3" size={18} />
                {item.label}
              </Button>
            </Link>
          );
        })}
      </nav>

      {/* User Info & Logout */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="mb-3 p-3 bg-sidebar-accent rounded-lg">
          <p className="text-sm font-medium text-sidebar-accent-foreground">{user?.username}</p>
          <p className="text-xs text-sidebar-accent-foreground/60">{user?.email}</p>
        </div>
        <Button 
          variant="ghost" 
          className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent"
          onClick={handleLogout}
          data-testid="button-logout"
        >
          <LogOut className="mr-3" size={18} />
          Logout
        </Button>
      </div>
    </div>
  );
}
