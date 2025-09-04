import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Clock, MapPin, User, Info, Edit2, Save, X, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CourseBlockProps {
  entry: {
    id: string;
    day: string;
    time: string;
    course: {
      code: string;
      title: string;
      type: string;
    };
    faculty: string;
    room: string;
    section: string;
  };
  onDragStart: () => void;
  onDragEnd: () => void;
  isDragging: boolean;
  onUpdate: (updatedEntry: any) => void;
  onDelete: (entryId: string) => void;
}

const courseTypeColors = {
  'Major': 'course-major',
  'Minor': 'course-minor',
  'Skill': 'course-skill',
  'AEC': 'course-aec',
  'VAC': 'course-vac',
  'Lab': 'course-lab',
};

export default function CourseBlock({ entry, onDragStart, onDragEnd, isDragging, onUpdate, onDelete }: CourseBlockProps) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    code: entry.course.code,
    title: entry.course.title,
    type: entry.course.type,
    faculty: entry.faculty,
    room: entry.room,
    time: entry.time
  });
  const { toast } = useToast();

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    const updatedEntry = {
      ...entry,
      course: {
        code: editData.code,
        title: editData.title,
        type: editData.type,
      },
      faculty: editData.faculty,
      room: editData.room,
      time: editData.time
    };
    
    onUpdate(updatedEntry);
    setIsEditing(false);
    setIsPopoverOpen(false);
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${entry.course.code}?`)) {
      onDelete(entry.id);
      setIsPopoverOpen(false);
    }
  };

  const handleCancel = () => {
    setEditData({
      code: entry.course.code,
      title: entry.course.title,
      type: entry.course.type,
      faculty: entry.faculty,
      room: entry.room,
      time: entry.time
    });
    setIsEditing(false);
  };

  const handleDragStart = (e: React.DragEvent) => {
    onDragStart();
    // Set drag effect
    e.dataTransfer.effectAllowed = 'move';
  };

  const colorClass = courseTypeColors[entry.course.type as keyof typeof courseTypeColors] || 'bg-muted';

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger asChild>
        <div
          draggable
          onDragStart={handleDragStart}
          onDragEnd={onDragEnd}
          className={`
            ${colorClass} text-white text-xs p-2 rounded cursor-move 
            hover:opacity-80 transition-all duration-200 h-full
            ${isDragging ? 'opacity-50 scale-95' : 'opacity-100'}
            flex flex-col justify-between min-h-[60px]
          `}
          data-testid={`course-block-${entry.course.code}`}
        >
          <div>
            <div className="font-semibold text-sm mb-1">{entry.course.code}</div>
            <div className="text-xs opacity-90 leading-tight">
              {entry.course.title.length > 20 
                ? `${entry.course.title.substring(0, 20)}...` 
                : entry.course.title
              }
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center space-x-1">
              <MapPin size={10} />
              <span className="text-xs opacity-90">{entry.room}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="h-4 w-4 p-0 hover:bg-white/20"
              onClick={(e) => {
                e.stopPropagation();
                setIsPopoverOpen(true);
              }}
              data-testid={`button-info-${entry.course.code}`}
            >
              <Info size={10} className="text-white" />
            </Button>
          </div>
        </div>
      </PopoverTrigger>
      
      <PopoverContent className="w-96" align="start">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-lg">{isEditing ? 'Edit Course' : entry.course.code}</h4>
              <p className="text-sm text-muted-foreground">{isEditing ? 'Modify course details' : entry.course.title}</p>
            </div>
            {!isEditing && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleEdit}
                data-testid={`button-edit-course-${entry.course.code}`}
              >
                <Edit2 size={14} />
              </Button>
            )}
          </div>
          
          {isEditing ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="code" className="text-sm">Course Code</Label>
                  <Input
                    id="code"
                    value={editData.code}
                    onChange={(e) => setEditData({...editData, code: e.target.value})}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="type" className="text-sm">Course Type</Label>
                  <Select
                    value={editData.type}
                    onValueChange={(value) => setEditData({...editData, type: value})}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Major">Major</SelectItem>
                      <SelectItem value="Minor">Minor</SelectItem>
                      <SelectItem value="Skill">Skill</SelectItem>
                      <SelectItem value="AEC">AEC</SelectItem>
                      <SelectItem value="VAC">VAC</SelectItem>
                      <SelectItem value="Lab">Lab</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="title" className="text-sm">Course Title</Label>
                <Input
                  id="title"
                  value={editData.title}
                  onChange={(e) => setEditData({...editData, title: e.target.value})}
                  className="mt-1"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="faculty" className="text-sm">Faculty</Label>
                  <Select
                    value={editData.faculty}
                    onValueChange={(value) => setEditData({...editData, faculty: value})}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Dr. Sarah Wilson">Dr. Sarah Wilson</SelectItem>
                      <SelectItem value="Prof. Michael Brown">Prof. Michael Brown</SelectItem>
                      <SelectItem value="Dr. Green Earth">Dr. Green Earth</SelectItem>
                      <SelectItem value="Coach Fitness">Coach Fitness</SelectItem>
                      <SelectItem value="Prof. Tech Support">Prof. Tech Support</SelectItem>
                      <SelectItem value="Dr. Jane Smith">Dr. Jane Smith</SelectItem>
                      <SelectItem value="Prof. John Doe">Prof. John Doe</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="room" className="text-sm">Room</Label>
                  <Select
                    value={editData.room}
                    onValueChange={(value) => setEditData({...editData, room: value})}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A301">A301 - Lecture Hall</SelectItem>
                      <SelectItem value="B205">B205 - Classroom</SelectItem>
                      <SelectItem value="C102">C102 - Conference Room</SelectItem>
                      <SelectItem value="IT-LAB-01">IT-LAB-01 - Computer Lab</SelectItem>
                      <SelectItem value="Sports Complex">Sports Complex</SelectItem>
                      <SelectItem value="D103">D103 - Seminar Hall</SelectItem>
                      <SelectItem value="Library">Library - Reading Room</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="time" className="text-sm">Time</Label>
                <Select
                  value={editData.time}
                  onValueChange={(value) => setEditData({...editData, time: value})}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="09:00">09:00 - 10:00</SelectItem>
                    <SelectItem value="10:00">10:00 - 11:00</SelectItem>
                    <SelectItem value="11:00">11:00 - 12:00</SelectItem>
                    <SelectItem value="12:00">12:00 - 13:00 (Lunch)</SelectItem>
                    <SelectItem value="13:00">13:00 - 14:00</SelectItem>
                    <SelectItem value="14:00">14:00 - 15:00</SelectItem>
                    <SelectItem value="15:00">15:00 - 16:00</SelectItem>
                    <SelectItem value="16:00">16:00 - 17:00</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Separator />
              
              <div className="flex justify-between">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleDelete}
                  data-testid={`button-delete-course-${entry.course.code}`}
                >
                  <Trash2 size={14} className="mr-1" />
                  Delete
                </Button>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCancel}
                    data-testid={`button-cancel-edit-${entry.course.code}`}
                  >
                    <X size={14} className="mr-1" />
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleSave}
                    data-testid={`button-save-edit-${entry.course.code}`}
                  >
                    <Save size={14} className="mr-1" />
                    Save
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className={`${colorClass} text-white border-transparent`}>
                  {entry.course.type}
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Clock size={14} className="text-muted-foreground" />
                  <span>{entry.time}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin size={14} className="text-muted-foreground" />
                  <span>{entry.room}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <User size={14} className="text-muted-foreground" />
                  <span>{entry.faculty}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-chart-1 rounded-full"></div>
                  <span>Section {entry.section}</span>
                </div>
              </div>
              
              <Separator />
              
              <div className="pt-2">
                <p className="text-xs text-muted-foreground">
                  Drag this course block to reschedule, or click the edit button to modify course details.
                </p>
              </div>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
