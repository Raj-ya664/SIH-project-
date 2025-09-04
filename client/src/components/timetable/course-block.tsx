import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Clock, MapPin, User, Info } from "lucide-react";

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
}

const courseTypeColors = {
  'Major': 'course-major',
  'Minor': 'course-minor',
  'Skill': 'course-skill',
  'AEC': 'course-aec',
  'VAC': 'course-vac',
  'Lab': 'course-lab',
};

export default function CourseBlock({ entry, onDragStart, onDragEnd, isDragging }: CourseBlockProps) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

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
      
      <PopoverContent className="w-80" align="start">
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-lg">{entry.course.code}</h4>
            <p className="text-sm text-muted-foreground">{entry.course.title}</p>
          </div>
          
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
          </div>
          
          <div className="pt-2 border-t border-border">
            <p className="text-xs text-muted-foreground">
              Drag this course block to reschedule. The system will automatically check for conflicts.
            </p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
