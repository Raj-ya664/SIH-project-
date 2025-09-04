import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Upload, Brain, Share, Shield, Scale, Users, Building, BarChart3, Smartphone } from "lucide-react";
import { Link } from "wouter";
import { mockTimetableData, courseTypeColors } from "@/lib/mock-data";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <GraduationCap className="text-primary-foreground" size={20} />
              </div>
              <span className="text-xl font-bold text-foreground">EduTime AI</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
              <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">How It Works</a>
              <a href="#roles" className="text-muted-foreground hover:text-foreground transition-colors">Portals</a>
              <a href="#demo" className="text-muted-foreground hover:text-foreground transition-colors">Demo</a>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button variant="ghost" data-testid="button-login">Login</Button>
              </Link>
              <Link href="/login">
                <Button data-testid="button-try-demo">Try Demo</Button>
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="mb-6">
            <span className="inline-block px-3 py-1 text-sm bg-primary/10 text-primary rounded-full border border-primary/20">
              NEP 2020 Compliant
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            AI-Powered Timetable Generator for{" "}
            <span className="gradient-text">Modern Education</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Transform your academic scheduling with intelligent automation. Create conflict-free timetables that optimize student satisfaction, faculty workload, and resource utilization—all while maintaining NEP 2020 compliance.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link href="/login">
              <Button size="lg" className="w-full sm:w-auto" data-testid="button-get-started">
                Get Started Now
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="w-full sm:w-auto" data-testid="button-watch-demo">
              <BarChart3 className="mr-2" size={16} />
              Watch Demo
            </Button>
          </div>

          {/* Hero Dashboard Preview */}
          <div className="relative mx-auto max-w-6xl">
            <Card className="overflow-hidden shadow-xl">
              <div className="flex items-center justify-between p-4 border-b border-border bg-muted/30">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-destructive rounded-full"></div>
                  <div className="w-3 h-3 bg-chart-3 rounded-full"></div>
                  <div className="w-3 h-3 bg-chart-2 rounded-full"></div>
                </div>
                <div className="text-sm text-muted-foreground">Admin Dashboard - EduTime AI</div>
                <div className="w-16"></div>
              </div>
              <CardContent className="p-6">
                {/* Mock Dashboard Widgets */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                  <Card className="bg-muted/30">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Total Students</p>
                          <p className="text-2xl font-bold text-chart-1" data-testid="text-total-students">2,847</p>
                        </div>
                        <Users className="text-chart-1" size={24} />
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-muted/30">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Faculty</p>
                          <p className="text-2xl font-bold text-chart-2" data-testid="text-total-faculty">142</p>
                        </div>
                        <GraduationCap className="text-chart-2" size={24} />
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-muted/30">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Rooms/Labs</p>
                          <p className="text-2xl font-bold text-chart-3" data-testid="text-total-rooms">89</p>
                        </div>
                        <Building className="text-chart-3" size={24} />
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-muted/30">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Conflicts</p>
                          <p className="text-2xl font-bold text-chart-2" data-testid="text-conflicts">0</p>
                        </div>
                        <Shield className="text-chart-2" size={24} />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Mock Calendar Preview */}
                <Card className="bg-muted/20">
                  <CardContent className="p-4">
                    <h3 className="text-lg font-semibold mb-4">Weekly Timetable Overview</h3>
                    <div className="calendar-grid text-sm">
                      <div className="time-slot">Time</div>
                      <div className="time-slot">Mon</div>
                      <div className="time-slot">Tue</div>
                      <div className="time-slot">Wed</div>
                      <div className="time-slot">Thu</div>
                      <div className="time-slot">Fri</div>
                      
                      <div className="time-slot">9:00</div>
                      <div className="calendar-cell">
                        <div className="course-major text-xs p-1 rounded text-white">EDU101</div>
                      </div>
                      <div className="calendar-cell">
                        <div className="course-skill text-xs p-1 rounded text-white">SKILL101</div>
                      </div>
                      <div className="calendar-cell">
                        <div className="course-aec text-xs p-1 rounded text-white">AEC101</div>
                      </div>
                      <div className="calendar-cell">
                        <div className="course-vac text-xs p-1 rounded text-white">VAC101</div>
                      </div>
                      <div className="calendar-cell">
                        <div className="course-lab text-xs p-1 rounded text-white">LAB101</div>
                      </div>
                      
                      <div className="time-slot">10:00</div>
                      <div className="calendar-cell">
                        <div className="course-minor text-xs p-1 rounded text-white">PSY201</div>
                      </div>
                      <div className="calendar-cell">
                        <div className="course-lab text-xs p-1 rounded text-white">LAB101</div>
                      </div>
                      <div className="calendar-cell">
                        <div className="course-major text-xs p-1 rounded text-white">EDU102</div>
                      </div>
                      <div className="calendar-cell">
                        <div className="course-skill text-xs p-1 rounded text-white">Research</div>
                      </div>
                      <div className="calendar-cell">
                        <div className="course-aec text-xs p-1 rounded text-white">AEC-2</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-6 bg-muted/20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground">Three simple steps to generate your perfect timetable</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-chart-1 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="text-white" size={24} />
              </div>
              <h3 className="text-2xl font-semibold mb-4">1. Import Data</h3>
              <p className="text-muted-foreground leading-relaxed">
                Upload student preferences, faculty availability, course requirements, and room constraints. Our system supports CSV, Excel, and direct API integration with existing ERP systems.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-chart-2 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="text-white" size={24} />
              </div>
              <h3 className="text-2xl font-semibold mb-4">2. AI Generation</h3>
              <p className="text-muted-foreground leading-relaxed">
                Our advanced AI solver analyzes all constraints and preferences to generate optimal timetables. The algorithm considers student satisfaction, faculty workload balance, and resource utilization.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-chart-3 rounded-full flex items-center justify-center mx-auto mb-4">
                <Share className="text-white" size={24} />
              </div>
              <h3 className="text-2xl font-semibold mb-4">3. Publish & Export</h3>
              <p className="text-muted-foreground leading-relaxed">
                Review the generated timetable, make manual adjustments if needed, and publish to all stakeholders. Export in multiple formats including PDF, Excel, and calendar sync.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-xl text-muted-foreground">Everything you need for modern academic scheduling</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-chart-1 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="text-white" size={20} />
                </div>
                <h3 className="text-xl font-semibold mb-3">Conflict-Free Scheduling</h3>
                <p className="text-muted-foreground">Advanced algorithms ensure zero scheduling conflicts while maximizing student and faculty satisfaction.</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-chart-2 rounded-lg flex items-center justify-center mb-4">
                  <Scale className="text-white" size={20} />
                </div>
                <h3 className="text-xl font-semibold mb-3">Faculty Optimization</h3>
                <p className="text-muted-foreground">Intelligent workload distribution ensures fair teaching hours and considers faculty preferences and expertise.</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-chart-3 rounded-lg flex items-center justify-center mb-4">
                  <Users className="text-white" size={20} />
                </div>
                <h3 className="text-xl font-semibold mb-3">Student Flexibility</h3>
                <p className="text-muted-foreground">Support for NEP 2020 flexible curriculum with Major, Minor, Skill, AEC, and VAC course selections.</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-chart-4 rounded-lg flex items-center justify-center mb-4">
                  <Building className="text-white" size={20} />
                </div>
                <h3 className="text-xl font-semibold mb-3">Resource Management</h3>
                <p className="text-muted-foreground">Optimize room and lab utilization with capacity constraints and equipment requirements.</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-chart-5 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="text-white" size={20} />
                </div>
                <h3 className="text-xl font-semibold mb-3">Analytics & Reports</h3>
                <p className="text-muted-foreground">Comprehensive dashboards and reports provide insights into utilization, satisfaction, and optimization metrics.</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                  <Smartphone className="text-white" size={20} />
                </div>
                <h3 className="text-xl font-semibold mb-3">Mobile Friendly</h3>
                <p className="text-muted-foreground">Responsive design ensures students and faculty can access their timetables from any device, anywhere.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Role-Based Portals */}
      <section id="roles" className="py-20 px-6 bg-muted/20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Role-Based Portals</h2>
            <p className="text-xl text-muted-foreground">Tailored interfaces for every user type</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Admin Portal */}
            <Card className="overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gradient-to-br from-chart-1 to-chart-1/80 p-6 flex items-center justify-center">
                <Shield className="text-white" size={64} />
              </div>
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-4">Admin Panel</h3>
                <ul className="space-y-3 text-muted-foreground mb-6">
                  <li className="flex items-center">
                    <Shield className="text-chart-2 mr-2" size={16} />
                    Complete timetable management
                  </li>
                  <li className="flex items-center">
                    <Shield className="text-chart-2 mr-2" size={16} />
                    Student & faculty oversight
                  </li>
                  <li className="flex items-center">
                    <Shield className="text-chart-2 mr-2" size={16} />
                    Course & room management
                  </li>
                  <li className="flex items-center">
                    <Shield className="text-chart-2 mr-2" size={16} />
                    Analytics & reports
                  </li>
                </ul>
                <Link href="/login">
                  <Button className="w-full bg-chart-1 hover:bg-chart-1/90" data-testid="button-admin-demo">
                    View Admin Demo
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Faculty Portal */}
            <Card className="overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gradient-to-br from-chart-2 to-chart-2/80 p-6 flex items-center justify-center">
                <GraduationCap className="text-white" size={64} />
              </div>
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-4">Faculty Portal</h3>
                <ul className="space-y-3 text-muted-foreground mb-6">
                  <li className="flex items-center">
                    <Shield className="text-chart-2 mr-2" size={16} />
                    Personal timetable view
                  </li>
                  <li className="flex items-center">
                    <Shield className="text-chart-2 mr-2" size={16} />
                    Workload tracking
                  </li>
                  <li className="flex items-center">
                    <Shield className="text-chart-2 mr-2" size={16} />
                    Availability management
                  </li>
                  <li className="flex items-center">
                    <Shield className="text-chart-2 mr-2" size={16} />
                    Swap requests
                  </li>
                </ul>
                <Link href="/login">
                  <Button className="w-full bg-chart-2 hover:bg-chart-2/90" data-testid="button-faculty-demo">
                    View Faculty Demo
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Student Portal */}
            <Card className="overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gradient-to-br from-chart-3 to-chart-3/80 p-6 flex items-center justify-center">
                <Users className="text-white" size={64} />
              </div>
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-4">Student Portal</h3>
                <ul className="space-y-3 text-muted-foreground mb-6">
                  <li className="flex items-center">
                    <Shield className="text-chart-2 mr-2" size={16} />
                    Course preferences
                  </li>
                  <li className="flex items-center">
                    <Shield className="text-chart-2 mr-2" size={16} />
                    Personalized timetable
                  </li>
                  <li className="flex items-center">
                    <Shield className="text-chart-2 mr-2" size={16} />
                    Credit validation
                  </li>
                  <li className="flex items-center">
                    <Shield className="text-chart-2 mr-2" size={16} />
                    NEP 2020 compliance
                  </li>
                </ul>
                <Link href="/login">
                  <Button className="w-full bg-chart-3 hover:bg-chart-3/90" data-testid="button-student-demo">
                    View Student Demo
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6 bg-gradient-to-r from-primary/10 to-chart-3/10">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Academic Scheduling?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join hundreds of educational institutions already using EduTime AI to create better timetables with less effort.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/login">
              <Button size="lg" className="w-full sm:w-auto" data-testid="button-start-trial">
                Start Your Free Trial
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="w-full sm:w-auto" data-testid="button-request-demo">
              Request Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <GraduationCap className="text-primary-foreground" size={20} />
                </div>
                <span className="text-xl font-bold">EduTime AI</span>
              </div>
              <p className="text-muted-foreground mb-4 max-w-md">
                The most advanced AI-powered timetable generator designed specifically for NEP 2020 compliance and modern educational needs.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">API</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Integrations</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Status</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 mt-8 text-center text-muted-foreground">
            <p>&copy; 2024 EduTime AI. All rights reserved. | Privacy Policy | Terms of Service</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
