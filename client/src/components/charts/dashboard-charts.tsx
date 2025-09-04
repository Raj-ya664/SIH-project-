import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface DashboardChartsProps {
  studentSatisfaction: number;
  facultyBalance: number;
  roomUtilization: number;
}

export function DashboardCharts({ studentSatisfaction, facultyBalance, roomUtilization }: DashboardChartsProps) {
  const satisfactionData = [
    { name: "Satisfied", value: studentSatisfaction, fill: "var(--chart-1)" },
    { name: "Unsatisfied", value: 100 - studentSatisfaction, fill: "var(--muted)" },
  ];

  const utilizationData = [
    { name: "Student Satisfaction", value: studentSatisfaction, fill: "var(--chart-1)" },
    { name: "Faculty Balance", value: facultyBalance, fill: "var(--chart-2)" },
    { name: "Room Utilization", value: roomUtilization, fill: "var(--chart-3)" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>System Metrics</CardTitle>
        <CardDescription>
          Performance indicators for the current timetable
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Student Satisfaction Pie Chart */}
          <div>
            <h4 className="text-sm font-medium mb-2">Student Satisfaction</h4>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={satisfactionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    dataKey="value"
                  >
                    {satisfactionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Overall Metrics Bar Chart */}
          <div>
            <h4 className="text-sm font-medium mb-2">Overall Performance</h4>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={utilizationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" fontSize={12} />
                  <YAxis />
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
