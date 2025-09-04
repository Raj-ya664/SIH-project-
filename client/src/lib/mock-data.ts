// Mock data for demonstration purposes
export const mockTimetableData = [
  {
    id: '1',
    day: 'Monday',
    time: '09:00',
    course: { code: 'EDU101', title: 'Foundations of Education', type: 'Major' },
    faculty: 'Dr. Sarah Wilson',
    room: 'A301',
    section: 'A'
  },
  {
    id: '2',
    day: 'Monday',
    time: '10:00',
    course: { code: 'PSY201', title: 'Educational Psychology', type: 'Minor' },
    faculty: 'Prof. Michael Brown',
    room: 'B205',
    section: 'A'
  },
  {
    id: '3',
    day: 'Tuesday',
    time: '09:00',
    course: { code: 'SKILL101', title: 'Communication Skills', type: 'Skill' },
    faculty: 'Dr. Sarah Wilson',
    room: 'C102',
    section: 'A'
  },
  {
    id: '4',
    day: 'Tuesday',
    time: '10:00',
    course: { code: 'LAB101', title: 'Computer Lab', type: 'Lab' },
    faculty: 'Prof. Tech Support',
    room: 'IT-LAB-01',
    section: 'A'
  },
  {
    id: '5',
    day: 'Wednesday',
    time: '09:00',
    course: { code: 'AEC101', title: 'Environmental Studies', type: 'AEC' },
    faculty: 'Dr. Green Earth',
    room: 'D103',
    section: 'A'
  },
  {
    id: '6',
    day: 'Thursday',
    time: '09:00',
    course: { code: 'VAC101', title: 'Sports & Wellness', type: 'VAC' },
    faculty: 'Coach Fitness',
    room: 'Sports Complex',
    section: 'A'
  }
];

export const courseTypeColors = {
  'Major': 'bg-chart-1 text-white',
  'Minor': 'bg-chart-2 text-white',
  'Skill': 'bg-chart-3 text-white',
  'AEC': 'bg-chart-5 text-white',
  'VAC': 'bg-chart-4 text-white',
  'Lab': 'bg-destructive text-white',
};

export const timeSlots = [
  '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'
];

export const weekDays = [
  'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'
];
