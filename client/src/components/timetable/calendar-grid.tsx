import React, { useState, useCallback } from "react";
import { mockTimetableData, timeSlots, weekDays } from "@/lib/mock-data";
import CourseBlock from "./course-block";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus, Save, X } from "lucide-react";

interface CalendarGridProps {
  viewMode: string;
  selectedFilter: string;
}

interface TimetableEntry {
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
}

export default function CalendarGrid({ viewMode, selectedFilter }: CalendarGridProps) {
  const [timetableData, setTimetableData] = useState<TimetableEntry[]>(mockTimetableData);
  const [draggedItem, setDraggedItem] = useState<TimetableEntry | null>(null);
  const [dropZone, setDropZone] = useState<{ day: string; time: string } | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<{ day: string; time: string } | null>(null);
  const { toast } = useToast();

  const handleDragStart = useCallback((entry: TimetableEntry) => {
    setDraggedItem(entry);
  }, []);

  const handleDragEnd = useCallback(() => {
    setDraggedItem(null);
    setDropZone(null);
  }, []);

  const handleDrop = useCallback((targetDay: string, targetTime: string) => {
    if (!draggedItem) return;

    // Check if target slot is occupied
    const isOccupied = timetableData.some(
      entry => entry.day === targetDay && entry.time === targetTime && entry.id !== draggedItem.id
    );

    if (isOccupied) {
      toast({
        title: "Conflict Detected",
        description: "This time slot is already occupied. Please choose another slot.",
        variant: "destructive",
      });
      return;
    }

    // Update the timetable data
    setTimetableData(prev => 
      prev.map(entry => 
        entry.id === draggedItem.id
          ? { ...entry, day: targetDay, time: targetTime }
          : entry
      )
    );

    toast({
      title: "Course Moved",
      description: `${draggedItem.course.code} moved to ${targetDay} at ${targetTime}`,
    });

    setDraggedItem(null);
    setDropZone(null);
  }, [draggedItem, timetableData, toast]);

  const handleDragOver = useCallback((e: React.DragEvent, day: string, time: string) => {
    e.preventDefault();
    setDropZone({ day, time });
  }, []);

  const handleDragLeave = useCallback(() => {
    setDropZone(null);
  }, []);

  const isSlotOccupied = (day: string, time: string) => {
    return timetableData.some(entry => entry.day === day && entry.time === time);
  };

  const getEntryForSlot = (day: string, time: string) => {
    return timetableData.find(entry => entry.day === day && entry.time === time);
  };

  const isDropZoneActive = (day: string, time: string) => {
    return dropZone?.day === day && dropZone?.time === time;
  };

  const isLunchBreak = (time: string) => {
    return time === "12:00";
  };

  const handleAddSubject = (day: string, time: string) => {
    setSelectedSlot({ day, time });
    setShowAddDialog(true);
  };

  const handleSaveNewSubject = (subjectData: {
    code: string;
    title: string;
    type: string;
    faculty: string;
    room: string;
  }) => {
    if (!selectedSlot) return;

    const newEntry: TimetableEntry = {
      id: Date.now().toString(),
      day: selectedSlot.day,
      time: selectedSlot.time,
      course: {
        code: subjectData.code,
        title: subjectData.title,
        type: subjectData.type,
      },
      faculty: subjectData.faculty,
      room: subjectData.room,
      section: 'A'
    };

    setTimetableData(prev => [...prev, newEntry]);
    
    toast({
      title: "Subject Added",
      description: `${subjectData.code} has been added to ${selectedSlot.day} at ${selectedSlot.time}`,
    });

    setShowAddDialog(false);
    setSelectedSlot(null);
  };

  const updateTimetableEntry = (updatedEntry: TimetableEntry) => {
    setTimetableData(prev => 
      prev.map(entry => 
        entry.id === updatedEntry.id ? updatedEntry : entry
      )
    );
  };

  return (
    <div className="overflow-x-auto">
      <div className="calendar-grid min-w-[800px]">
        {/* Header Row */}
        <div className="time-slot">Time</div>
        {weekDays.map(day => (
          <div key={day} className="time-slot font-medium">
            {day}
          </div>
        ))}

        {/* Time Slots */}
        {timeSlots.slice(0, 8).map(time => [
          <div key={`time-${time}`} className="time-slot font-medium">
            {time}
          </div>,
          ...weekDays.map(day => {
            const entry = getEntryForSlot(day, time);
            const isDropActive = isDropZoneActive(day, time);
            const isLunch = isLunchBreak(time);

            return (
              <div
                key={`${day}-${time}`}
                className={`calendar-cell transition-colors ${
                  isDropActive ? 'bg-primary/10 border-primary border-2 border-dashed' : ''
                } ${isLunch ? 'bg-muted/50' : ''}`}
                onDragOver={(e) => !isLunch && handleDragOver(e, day, time)}
                onDragLeave={handleDragLeave}
                onDrop={() => !isLunch && handleDrop(day, time)}
                data-testid={`calendar-cell-${day}-${time}`}
              >
                {isLunch ? (
                  <div className="text-center text-xs text-muted-foreground font-medium py-4">
                    LUNCH BREAK
                  </div>
                ) : entry ? (
                  <CourseBlock
                    entry={entry}
                    onDragStart={() => handleDragStart(entry)}
                    onDragEnd={handleDragEnd}
                    isDragging={draggedItem?.id === entry.id}
                    onUpdate={updateTimetableEntry}
                  />
                ) : (
                  <div 
                    className="h-full min-h-[60px] flex items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors border-2 border-dashed border-transparent hover:border-muted-foreground/20"
                    onClick={() => handleAddSubject(day, time)}
                  >
                    {isDropActive ? (
                      <div className="text-xs text-primary font-medium">
                        Drop here
                      </div>
                    ) : (
                      <div className="text-xs text-muted-foreground text-center">
                        <div className="mb-1">+</div>
                        <div>Add Subject</div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        ]).flat()}
      </div>

      {/* Add Subject Dialog */}
      <AddSubjectDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        selectedSlot={selectedSlot}
        onSave={handleSaveNewSubject}
      />

      {/* Drag Instructions */}
      <div className="mt-4 p-4 bg-muted/30 rounded-lg">
        <p className="text-sm text-muted-foreground">
          <strong>Instructions:</strong> Drag and drop course blocks to reschedule. 
          The system will automatically detect conflicts and prevent overlapping schedules.
        </p>
      </div>

      {/* Conflict Detection Status */}
      <div className="mt-4 flex items-center space-x-4 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-chart-2 rounded-full"></div>
          <span>No Conflicts</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-destructive rounded-full"></div>
          <span>Conflict Detected</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-primary rounded-full"></div>
          <span>Drop Zone</span>
        </div>
      </div>
    </div>
  );
}

// Add Subject Dialog Component
interface AddSubjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedSlot: { day: string; time: string } | null;
  onSave: (subjectData: {
    code: string;
    title: string;
    type: string;
    faculty: string;
    room: string;
  }) => void;
}

function AddSubjectDialog({ open, onOpenChange, selectedSlot, onSave }: AddSubjectDialogProps) {
  const [formData, setFormData] = useState({
    code: '',
    title: '',
    type: 'Major',
    faculty: '',
    room: ''
  });

  const handleSave = () => {
    if (!formData.code || !formData.title || !formData.faculty || !formData.room) {
      return;
    }
    onSave(formData);
    setFormData({ code: '', title: '', type: 'Major', faculty: '', room: '' });
  };

  const handleCancel = () => {
    setFormData({ code: '', title: '', type: 'Major', faculty: '', room: '' });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Plus size={20} className="text-primary" />
            <span>Add New Subject</span>
          </DialogTitle>
          <DialogDescription>
            Add a new subject to {selectedSlot?.day} at {selectedSlot?.time}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="add-code">Course Code</Label>
              <Input
                id="add-code"
                placeholder="e.g., EDU101"
                value={formData.code}
                onChange={(e) => setFormData({...formData, code: e.target.value})}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="add-type">Course Type</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => setFormData({...formData, type: value})}
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
            <Label htmlFor="add-title">Course Title</Label>
            <Input
              id="add-title"
              placeholder="e.g., Foundations of Education"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="mt-1"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="add-faculty">Faculty</Label>
              <Select
                value={formData.faculty}
                onValueChange={(value) => setFormData({...formData, faculty: value})}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select Faculty" />
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
              <Label htmlFor="add-room">Room</Label>
              <Select
                value={formData.room}
                onValueChange={(value) => setFormData({...formData, room: value})}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select Room" />
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
        </div>
        
        <DialogFooter>
          <Button
            variant="outline"
            onClick={handleCancel}
          >
            <X size={14} className="mr-1" />
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={!formData.code || !formData.title || !formData.faculty || !formData.room}
          >
            <Save size={14} className="mr-1" />
            Add Subject
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}