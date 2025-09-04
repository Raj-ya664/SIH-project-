import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GraduationCap, Shield, Users } from "lucide-react";
import { useLocation } from "wouter";
import { authService } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export default function Login() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.username || !formData.password || !formData.role) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await apiRequest("POST", "/api/auth/login", formData);
      const { user } = await response.json();
      
      authService.setUser(user);
      
      toast({
        title: "Success",
        description: "Login successful!",
      });

      // Redirect based on role
      switch (user.role) {
        case "admin":
          setLocation("/admin");
          break;
        case "faculty":
          setLocation("/faculty");
          break;
        case "student":
          setLocation("/student");
          break;
        default:
          setLocation("/");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid credentials. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin": return <Shield className="text-chart-1" size={24} />;
      case "faculty": return <GraduationCap className="text-chart-2" size={24} />;
      case "student": return <Users className="text-chart-3" size={24} />;
      default: return null;
    }
  };

  const handleQuickLogin = (role: string) => {
    setFormData({
      username: role,
      password: `${role}123`,
      role: role
    });
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <GraduationCap className="text-primary-foreground" size={24} />
            </div>
            <span className="text-2xl font-bold">EduTime AI</span>
          </div>
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="text-muted-foreground">Sign in to access your portal</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Select your role and enter your credentials
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                  <SelectTrigger data-testid="select-role">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">
                      <div className="flex items-center space-x-2">
                        <Shield className="text-chart-1" size={16} />
                        <span>Admin</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="faculty">
                      <div className="flex items-center space-x-2">
                        <GraduationCap className="text-chart-2" size={16} />
                        <span>Faculty</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="student">
                      <div className="flex items-center space-x-2">
                        <Users className="text-chart-3" size={16} />
                        <span>Student</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  placeholder="Enter your username"
                  data-testid="input-username"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Enter your password"
                  data-testid="input-password"
                />
              </div>

              <Button type="submit" className="w-full" disabled={isLoading} data-testid="button-login">
                {isLoading ? (
                  <div className="loading-spinner"></div>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Quick Login Options */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Demo Accounts</CardTitle>
            <CardDescription>
              Quick login for demonstration purposes
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              variant="outline" 
              className="w-full justify-start" 
              onClick={() => handleQuickLogin("admin")}
              data-testid="button-demo-admin"
            >
              <Shield className="text-chart-1 mr-2" size={16} />
              Demo Admin (admin/admin123)
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start" 
              onClick={() => handleQuickLogin("faculty")}
              data-testid="button-demo-faculty"
            >
              <GraduationCap className="text-chart-2 mr-2" size={16} />
              Demo Faculty (faculty/faculty123)
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start" 
              onClick={() => handleQuickLogin("student")}
              data-testid="button-demo-student"
            >
              <Users className="text-chart-3 mr-2" size={16} />
              Demo Student (student/student123)
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
