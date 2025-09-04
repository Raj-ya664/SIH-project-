import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Download, Upload, Edit, Trash2, Building, Users, Monitor } from "lucide-react";
import AdminLayout from "@/components/layout/admin-layout";
import { useQuery } from "@tanstack/react-query";

export default function AdminRooms() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  
  const { data: rooms, isLoading } = useQuery({
    queryKey: ["/api/rooms"],
  });

  const filteredRooms = rooms?.filter((room: any) => {
    const matchesSearch = room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         room.building.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || room.type.toLowerCase() === filterType.toLowerCase();
    return matchesSearch && matchesType;
  }) || [];

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

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'classroom': return 'bg-chart-1 text-white';
      case 'lab': return 'bg-chart-2 text-white';
      case 'auditorium': return 'bg-chart-3 text-white';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const roomTypes = ['all', 'classroom', 'lab', 'auditorium'];

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold" data-testid="text-rooms-title">Rooms & Labs Management</h1>
            <p className="text-muted-foreground">
              Manage classroom, laboratory, and facility resources
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" data-testid="button-import-rooms">
              <Upload className="mr-2" size={16} />
              Import CSV
            </Button>
            <Button variant="outline" data-testid="button-export-rooms">
              <Download className="mr-2" size={16} />
              Export
            </Button>
            <Button data-testid="button-add-room">
              <Plus className="mr-2" size={16} />
              Add Room
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                <Input
                  placeholder="Search rooms by name or building..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                  data-testid="input-search-rooms"
                />
              </div>
              <div className="flex items-center space-x-2">
                {roomTypes.map((type) => (
                  <Button
                    key={type}
                    variant={filterType === type ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilterType(type)}
                    data-testid={`filter-${type}`}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Rooms Table */}
        <Card>
          <CardHeader>
            <CardTitle>Rooms & Labs ({filteredRooms.length})</CardTitle>
            <CardDescription>
              Complete facility inventory with capacity and feature information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Room Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Building</TableHead>
                  <TableHead>Floor</TableHead>
                  <TableHead>Capacity</TableHead>
                  <TableHead>Features</TableHead>
                  <TableHead>Utilization</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRooms.map((room: any) => (
                  <TableRow key={room.id}>
                    <TableCell className="font-medium" data-testid={`text-name-${room.name}`}>
                      {room.name}
                    </TableCell>
                    <TableCell>
                      <Badge className={getTypeColor(room.type)}>
                        {room.type}
                      </Badge>
                    </TableCell>
                    <TableCell data-testid={`text-building-${room.id}`}>{room.building}</TableCell>
                    <TableCell>{room.floor}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Users size={14} className="text-muted-foreground" />
                        <span>{room.capacity}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {room.features?.slice(0, 2).map((feature: string, index: number) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            <Monitor size={10} className="mr-1" />
                            {feature}
                          </Badge>
                        ))}
                        {(room.features?.length || 0) > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{(room.features?.length || 0) - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <span className="text-chart-2">75%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-chart-2">
                        Available
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" data-testid={`button-edit-${room.id}`}>
                          <Edit size={14} />
                        </Button>
                        <Button variant="ghost" size="sm" data-testid={`button-delete-${room.id}`}>
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <Building className="mx-auto mb-2 text-chart-1" size={24} />
                <p className="text-2xl font-bold text-chart-1">{rooms?.length || 0}</p>
                <p className="text-sm text-muted-foreground">Total Rooms</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <Building className="mx-auto mb-2 text-chart-2" size={24} />
                <p className="text-2xl font-bold text-chart-2">
                  {rooms?.filter((r: any) => r.type === 'classroom').length || 0}
                </p>
                <p className="text-sm text-muted-foreground">Classrooms</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <Monitor className="mx-auto mb-2 text-chart-3" size={24} />
                <p className="text-2xl font-bold text-chart-3">
                  {rooms?.filter((r: any) => r.type === 'lab').length || 0}
                </p>
                <p className="text-sm text-muted-foreground">Labs</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <Users className="mx-auto mb-2 text-chart-4" size={24} />
                <p className="text-2xl font-bold text-chart-4">
                  {rooms?.reduce((sum: number, room: any) => sum + room.capacity, 0) || 0}
                </p>
                <p className="text-sm text-muted-foreground">Total Capacity</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
