import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, Calendar, CheckCircle, Clock, Users, BarChart3, Download, Settings } from "lucide-react";
import AdminLayout from "@/components/layout/admin-layout";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function AdminTimetableGenerator() {
  const [generationStatus, setGenerationStatus] = useState<'idle' | 'generating' | 'completed' | 'error'>('idle');
  const [progress, setProgress] = useState(0);
  const [metrics, setMetrics] = useState<any>(null);
  const { toast } = useToast();

  const generateMutation = useMutation({
    mutationFn: () => apiRequest("POST", "/api/timetable/generate"),
    onSuccess: async (response) => {
      const data = await response.json();
      setMetrics(data.metrics);
      setGenerationStatus('completed');
      setProgress(100);
      toast({
        title: "Success",
        description: "Timetable generated successfully!",
      });
    },
    onError: () => {
      setGenerationStatus('error');
      toast({
        title: "Error",
        description: "Failed to generate timetable. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleGenerate = () => {
    setGenerationStatus('generating');
    setProgress(0);
    setMetrics(null);
    
    // Simulate progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return prev;
        }
        return prev + Math.random() * 20;
      });
    }, 500);

    generateMutation.mutate();
  };

  const getStatusIcon = () => {
    switch (generationStatus) {
      case 'generating':
        return <div className="loading-spinner" />;
      case 'completed':
        return <CheckCircle className="text-chart-2" size={24} />;
      case 'error':
        return <AlertTriangle className="text-destructive" size={24} />;
      default:
        return <Calendar className="text-muted-foreground" size={24} />;
    }
  };

  const getStatusText = () => {
    switch (generationStatus) {
      case 'generating':
        return 'Generating timetable...';
      case 'completed':
        return 'Timetable generated successfully!';
      case 'error':
        return 'Generation failed. Please try again.';
      default:
        return 'Ready to generate timetable';
    }
  };

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold" data-testid="text-generator-title">Timetable Generator</h1>
            <p className="text-muted-foreground">
              AI-powered timetable generation with conflict resolution
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" data-testid="button-generator-settings">
              <Settings className="mr-2" size={16} />
              Settings
            </Button>
          </div>
        </div>

        {/* Generation Control */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              {getStatusIcon()}
              <span>AI Timetable Generation</span>
            </CardTitle>
            <CardDescription>
              Generate optimal timetables using advanced AI algorithms
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Status and Progress */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{getStatusText()}</span>
                <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="w-full" />
            </div>

            {/* Generate Button */}
            <div className="flex justify-center">
              <Button
                size="lg"
                onClick={handleGenerate}
                disabled={generationStatus === 'generating'}
                data-testid="button-generate-timetable"
              >
                {generationStatus === 'generating' ? (
                  <>
                    <div className="loading-spinner mr-2" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Calendar className="mr-2" size={16} />
                    Generate Timetable
                  </>
                )}
              </Button>
            </div>

            {/* Generation Steps */}
            {generationStatus === 'generating' && (
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="text-chart-2" size={16} />
                  <span className="text-sm">Loading student preferences...</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="text-chart-2" size={16} />
                  <span className="text-sm">Analyzing faculty availability...</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="text-muted-foreground" size={16} />
                  <span className="text-sm">Optimizing room allocation...</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="text-muted-foreground" size={16} />
                  <span className="text-sm">Resolving conflicts...</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results Metrics */}
        {metrics && generationStatus === 'completed' && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Conflicts</p>
                    <p className={`text-2xl font-bold ${metrics.conflicts === 0 ? 'text-chart-2' : 'text-destructive'}`}>
                      {metrics.conflicts}
                    </p>
                  </div>
                  <AlertTriangle className={metrics.conflicts === 0 ? 'text-chart-2' : 'text-destructive'} size={24} />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Student Satisfaction</p>
                    <p className="text-2xl font-bold text-chart-1">{metrics.studentSatisfaction}%</p>
                  </div>
                  <Users className="text-chart-1" size={24} />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Faculty Balance</p>
                    <p className="text-2xl font-bold text-chart-2">{metrics.facultyBalance}%</p>
                  </div>
                  <BarChart3 className="text-chart-2" size={24} />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Room Utilization</p>
                    <p className="text-2xl font-bold text-chart-3">{metrics.roomUtilization}%</p>
                  </div>
                  <Calendar className="text-chart-3" size={24} />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Action Buttons */}
        {generationStatus === 'completed' && (
          <Card>
            <CardHeader>
              <CardTitle>Next Steps</CardTitle>
              <CardDescription>
                Review and publish your generated timetable
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <Button data-testid="button-save-scenario">
                  Save as Scenario
                </Button>
                <Button variant="outline" data-testid="button-view-timetable">
                  View Timetable
                </Button>
                <Button variant="outline" data-testid="button-export-pdf">
                  <Download className="mr-2" size={16} />
                  Export PDF
                </Button>
                <Button variant="outline" data-testid="button-export-excel">
                  <Download className="mr-2" size={16} />
                  Export Excel
                </Button>
                <Button className="bg-chart-2 hover:bg-chart-2/90" data-testid="button-publish">
                  Publish Timetable
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Generation Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Generation Settings</CardTitle>
            <CardDescription>
              Configure AI solver parameters and constraints
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Priority Weights</label>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Student Satisfaction</span>
                    <span className="text-sm font-medium">40%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Faculty Balance</span>
                    <span className="text-sm font-medium">35%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Room Utilization</span>
                    <span className="text-sm font-medium">25%</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Constraints</label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="text-chart-2" size={16} />
                    <span className="text-sm">No lunch break conflicts</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="text-chart-2" size={16} />
                    <span className="text-sm">Faculty availability respected</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="text-chart-2" size={16} />
                    <span className="text-sm">Room capacity limits</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Advanced Options</label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="text-chart-2" size={16} />
                    <span className="text-sm">NEP 2020 compliance</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="text-chart-2" size={16} />
                    <span className="text-sm">Credit hour validation</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="text-chart-2" size={16} />
                    <span className="text-sm">Proximity optimization</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
