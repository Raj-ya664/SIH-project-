import React, { useState, useCallback } from "react";
import { mockTimetableData, timeSlots, weekDays } from "@/lib/mock-data";
import CourseBlock from "./course-block";
import { useToast } from "@/hooks/use-toast";

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
        {timeSlots.slice(0, 8).map(time => (
          <React.Fragment key={time}>
            <div className="time-slot font-medium">
              {time}
            </div>
            {weekDays.map(day => {
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
                    />
                  ) : (
                    <div className="h-full min-h-[60px] flex items-center justify-center">
                      {isDropActive && (
                        <div className="text-xs text-primary font-medium">
                          Drop here
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>

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
