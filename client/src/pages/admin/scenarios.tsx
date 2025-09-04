import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Copy, Eye, Archive, CheckCircle, Clock, BarChart3, Users } from "lucide-react";
import AdminLayout from "@/components/layout/admin-layout";
import { useQuery } from "@tanstack/react-query";

export default function AdminScenarios() {
  const [selectedScenarios, setSelectedScenarios] = useState<string[]>([]);
  
  const { data: scenarios, isLoading } = useQuery({
    queryKey: ["/api/scenarios"],
  });

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

  const handleSelectScenario = (scenarioId: string) => {
    setSelectedScenarios(prev => 
      prev.includes(scenarioId) 
        ? prev.filter(id => id !== scenarioId)
        : [...prev, scenarioId]
    );
  };

  const mockScenarios = [
    {
      id: "1",
      name: "Current Semester",
      description: "Active timetable for current academic semester",
      isActive: true,
      metrics: { conflicts: 0, studentSatisfaction: 94, facultyBalance: 87, roomUtilization: 89 },
      createdAt: new Date("2024-01-15")
    },
    {
      id: "2", 
      name: "Alternative Layout",
      description: "Experimental layout with morning focus",
      isActive: false,
      metrics: { conflicts: 2, studentSatisfaction: 91, facultyBalance: 92, roomUtilization: 85 },
      createdAt: new Date("2024-01-10")
    },
    {
      id: "3",
      name: "Compact Schedule",
      description: "Compressed timetable for hybrid learning",
      isActive: false,
      metrics: { conflicts: 1, studentSatisfaction: 89, facultyBalance: 88, roomUtilization: 95 },
      createdAt: new Date("2024-01-08")
    }
  ];

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold" data-testid="text-scenarios-title">Scenario Management</h1>
            <p className="text-muted-foreground">
              Create, compare, and manage different timetable scenarios
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" data-testid="button-compare-scenarios">
              <BarChart3 className="mr-2" size={16} />
              Compare
            </Button>
            <Button data-testid="button-create-scenario">
              <Plus className="mr-2" size={16} />
              Create Scenario
            </Button>
          </div>
        </div>

        {/* Scenario Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockScenarios.map((scenario) => (
            <Card 
              key={scenario.id} 
              className={`cursor-pointer transition-all ${
                selectedScenarios.includes(scenario.id) ? 'ring-2 ring-primary' : ''
              } ${scenario.isActive ? 'border-chart-2' : ''}`}
              onClick={() => handleSelectScenario(scenario.id)}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg" data-testid={`scenario-title-${scenario.id}`}>
                    {scenario.name}
                  </CardTitle>
                  {scenario.isActive && (
                    <Badge className="bg-chart-2 text-white">
                      <CheckCircle size={12} className="mr-1" />
                      Active
                    </Badge>
                  )}
                </div>
                <CardDescription>{scenario.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Metrics */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-3 bg-muted/30 rounded-lg">
                    <p className={`text-lg font-bold ${scenario.metrics.conflicts === 0 ? 'text-chart-2' : 'text-destructive'}`}>
                      {scenario.metrics.conflicts}
                    </p>
                    <p className="text-xs text-muted-foreground">Conflicts</p>
                  </div>
                  <div className="text-center p-3 bg-muted/30 rounded-lg">
                    <p className="text-lg font-bold text-chart-1">
                      {scenario.metrics.studentSatisfaction}%
                    </p>
                    <p className="text-xs text-muted-foreground">Satisfaction</p>
                  </div>
                  <div className="text-center p-3 bg-muted/30 rounded-lg">
                    <p className="text-lg font-bold text-chart-3">
                      {scenario.metrics.roomUtilization}%
                    </p>
                    <p className="text-xs text-muted-foreground">Utilization</p>
                  </div>
                  <div className="text-center p-3 bg-muted/30 rounded-lg">
                    <p className="text-lg font-bold text-chart-2">
                      {scenario.metrics.facultyBalance}%
                    </p>
                    <p className="text-xs text-muted-foreground">Balance</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                    <Clock size={12} />
                    <span>{scenario.createdAt.toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" data-testid={`button-view-${scenario.id}`}>
                      <Eye size={14} />
                    </Button>
                    <Button variant="ghost" size="sm" data-testid={`button-clone-${scenario.id}`}>
                      <Copy size={14} />
                    </Button>
                    {!scenario.isActive && (
                      <Button variant="ghost" size="sm" data-testid={`button-archive-${scenario.id}`}>
                        <Archive size={14} />
                      </Button>
                    )}
                  </div>
                </div>

                {/* Publish Button for Non-Active Scenarios */}
                {!scenario.isActive && (
                  <Button 
                    className="w-full bg-chart-2 hover:bg-chart-2/90" 
                    size="sm"
                    data-testid={`button-publish-${scenario.id}`}
                  >
                    Publish as Active
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Comparison View */}
        {selectedScenarios.length >= 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Scenario Comparison</CardTitle>
              <CardDescription>
                Side-by-side comparison of selected scenarios
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {selectedScenarios.slice(0, 2).map(scenarioId => {
                  const scenario = mockScenarios.find(s => s.id === scenarioId);
                  if (!scenario) return null;
                  
                  return (
                    <div key={scenarioId} className="space-y-4">
                      <h4 className="font-semibold">{scenario.name}</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm">Conflicts</span>
                          <span className={`font-medium ${scenario.metrics.conflicts === 0 ? 'text-chart-2' : 'text-destructive'}`}>
                            {scenario.metrics.conflicts}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Student Satisfaction</span>
                          <span className="font-medium">{scenario.metrics.studentSatisfaction}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Faculty Balance</span>
                          <span className="font-medium">{scenario.metrics.facultyBalance}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Room Utilization</span>
                          <span className="font-medium">{scenario.metrics.roomUtilization}%</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-center pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedScenarios([])}
                  data-testid="button-clear-comparison"
                >
                  Clear Selection
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <BarChart3 className="mx-auto mb-2 text-chart-1" size={24} />
                <p className="text-2xl font-bold text-chart-1">{mockScenarios.length}</p>
                <p className="text-sm text-muted-foreground">Total Scenarios</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <CheckCircle className="mx-auto mb-2 text-chart-2" size={24} />
                <p className="text-2xl font-bold text-chart-2">1</p>
                <p className="text-sm text-muted-foreground">Active Scenario</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <Users className="mx-auto mb-2 text-chart-3" size={24} />
                <p className="text-2xl font-bold text-chart-3">
                  {Math.round(mockScenarios.reduce((sum, s) => sum + s.metrics.studentSatisfaction, 0) / mockScenarios.length)}%
                </p>
                <p className="text-sm text-muted-foreground">Avg. Satisfaction</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
