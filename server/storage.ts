import { 
  type User, type InsertUser,
  type Student, type InsertStudent,
  type Faculty, type InsertFaculty,
  type Course, type InsertCourse,
  type Room, type InsertRoom,
  type TimetableEntry, type InsertTimetableEntry,
  type Scenario, type InsertScenario
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User management
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Student management
  getAllStudents(): Promise<Student[]>;
  getStudent(id: string): Promise<Student | undefined>;
  createStudent(student: InsertStudent): Promise<Student>;
  updateStudent(id: string, student: Partial<Student>): Promise<Student | undefined>;
  deleteStudent(id: string): Promise<boolean>;
  
  // Faculty management
  getAllFaculty(): Promise<Faculty[]>;
  getFaculty(id: string): Promise<Faculty | undefined>;
  createFaculty(faculty: InsertFaculty): Promise<Faculty>;
  updateFaculty(id: string, faculty: Partial<Faculty>): Promise<Faculty | undefined>;
  deleteFaculty(id: string): Promise<boolean>;
  
  // Course management
  getAllCourses(): Promise<Course[]>;
  getCourse(id: string): Promise<Course | undefined>;
  createCourse(course: InsertCourse): Promise<Course>;
  updateCourse(id: string, course: Partial<Course>): Promise<Course | undefined>;
  deleteCourse(id: string): Promise<boolean>;
  
  // Room management
  getAllRooms(): Promise<Room[]>;
  getRoom(id: string): Promise<Room | undefined>;
  createRoom(room: InsertRoom): Promise<Room>;
  updateRoom(id: string, room: Partial<Room>): Promise<Room | undefined>;
  deleteRoom(id: string): Promise<boolean>;
  
  // Timetable management
  getAllTimetableEntries(scenarioId?: string): Promise<TimetableEntry[]>;
  getTimetableEntry(id: string): Promise<TimetableEntry | undefined>;
  createTimetableEntry(entry: InsertTimetableEntry): Promise<TimetableEntry>;
  updateTimetableEntry(id: string, entry: Partial<TimetableEntry>): Promise<TimetableEntry | undefined>;
  deleteTimetableEntry(id: string): Promise<boolean>;
  
  // Scenario management
  getAllScenarios(): Promise<Scenario[]>;
  getScenario(id: string): Promise<Scenario | undefined>;
  createScenario(scenario: InsertScenario): Promise<Scenario>;
  updateScenario(id: string, scenario: Partial<Scenario>): Promise<Scenario | undefined>;
  deleteScenario(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User> = new Map();
  private students: Map<string, Student> = new Map();
  private faculty: Map<string, Faculty> = new Map();
  private courses: Map<string, Course> = new Map();
  private rooms: Map<string, Room> = new Map();
  private timetableEntries: Map<string, TimetableEntry> = new Map();
  private scenarios: Map<string, Scenario> = new Map();

  constructor() {
    this.initializeMockData();
  }

  private initializeMockData() {
    // Create mock admin user
    const adminUser: User = {
      id: randomUUID(),
      username: "admin",
      password: "admin123",
      role: "admin",
      email: "admin@university.edu",
      createdAt: new Date(),
    };
    this.users.set(adminUser.id, adminUser);

    // Create mock faculty user
    const facultyUser: User = {
      id: randomUUID(),
      username: "faculty",
      password: "faculty123",
      role: "faculty",
      email: "faculty@university.edu",
      createdAt: new Date(),
    };
    this.users.set(facultyUser.id, facultyUser);

    // Create mock student user
    const studentUser: User = {
      id: randomUUID(),
      username: "student",
      password: "student123",
      role: "student",
      email: "student@university.edu",
      createdAt: new Date(),
    };
    this.users.set(studentUser.id, studentUser);

    // Initialize mock data for other entities
    this.initializeMockStudents();
    this.initializeMockFaculty();
    this.initializeMockCourses();
    this.initializeMockRooms();
    this.initializeMockScenarios();
  }

  private initializeMockStudents() {
    const mockStudents: Student[] = [
      {
        id: randomUUID(),
        rollNo: "2024001",
        name: "Alice Johnson",
        email: "alice@student.edu",
        program: "B.Ed.",
        semester: 3,
        totalCredits: 18,
        preferences: {
          majors: ["Education Technology", "Curriculum Development"],
          minors: ["Psychology"],
          skills: ["Research Methods", "Data Analysis"],
          aec: ["Environmental Studies"],
          vac: ["Sports & Wellness"]
        },
        section: "A",
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        rollNo: "2024002",
        name: "Bob Smith",
        email: "bob@student.edu",
        program: "M.Ed.",
        semester: 2,
        totalCredits: 20,
        preferences: {
          majors: ["Educational Leadership"],
          minors: ["Statistics"],
          skills: ["Communication"],
          aec: ["Constitutional Studies"],
          vac: ["Arts & Culture"]
        },
        section: "B",
        createdAt: new Date(),
      }
    ];

    mockStudents.forEach(student => this.students.set(student.id, student));
  }

  private initializeMockFaculty() {
    const mockFaculty: Faculty[] = [
      {
        id: randomUUID(),
        employeeId: "FAC001",
        name: "Dr. Sarah Wilson",
        email: "sarah.wilson@university.edu",
        department: "Education",
        expertise: ["Curriculum Development", "Educational Technology", "Assessment"],
        maxHoursPerWeek: 20,
        currentHours: 16,
        availability: {
          monday: [{ start: "09:00", end: "17:00", available: true }],
          tuesday: [{ start: "09:00", end: "17:00", available: true }],
          wednesday: [{ start: "09:00", end: "15:00", available: true }],
          thursday: [{ start: "09:00", end: "17:00", available: true }],
          friday: [{ start: "09:00", end: "15:00", available: true }]
        },
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        employeeId: "FAC002",
        name: "Prof. Michael Brown",
        email: "michael.brown@university.edu",
        department: "Mathematics",
        expertise: ["Statistics", "Research Methods", "Data Analysis"],
        maxHoursPerWeek: 18,
        currentHours: 14,
        availability: {
          monday: [{ start: "10:00", end: "16:00", available: true }],
          tuesday: [{ start: "10:00", end: "16:00", available: true }],
          wednesday: [{ start: "10:00", end: "16:00", available: true }],
          thursday: [{ start: "10:00", end: "16:00", available: true }],
          friday: [{ start: "10:00", end: "14:00", available: true }]
        },
        createdAt: new Date(),
      }
    ];

    mockFaculty.forEach(faculty => this.faculty.set(faculty.id, faculty));
  }

  private initializeMockCourses() {
    const mockCourses: Course[] = [
      {
        id: randomUUID(),
        code: "EDU101",
        title: "Foundations of Education",
        credits: 4,
        type: "Major",
        theoryHours: 3,
        practicalHours: 1,
        maxEnrollment: 40,
        prerequisites: [],
        department: "Education",
        semester: 1,
        isElective: false,
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        code: "PSY201",
        title: "Educational Psychology",
        credits: 3,
        type: "Minor",
        theoryHours: 3,
        practicalHours: 0,
        maxEnrollment: 30,
        prerequisites: ["EDU101"],
        department: "Psychology",
        semester: 2,
        isElective: true,
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        code: "SKILL101",
        title: "Communication Skills",
        credits: 2,
        type: "Skill",
        theoryHours: 1,
        practicalHours: 1,
        maxEnrollment: 25,
        prerequisites: [],
        department: "Languages",
        semester: 1,
        isElective: false,
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        code: "LAB101",
        title: "Computer Lab",
        credits: 2,
        type: "Lab",
        theoryHours: 0,
        practicalHours: 2,
        maxEnrollment: 20,
        prerequisites: [],
        department: "Computer Science",
        semester: 1,
        isElective: false,
        createdAt: new Date(),
      }
    ];

    mockCourses.forEach(course => this.courses.set(course.id, course));
  }

  private initializeMockRooms() {
    const mockRooms: Room[] = [
      {
        id: randomUUID(),
        name: "A301",
        type: "classroom",
        capacity: 40,
        building: "Academic Block A",
        floor: 3,
        features: ["projector", "smart_board", "air_conditioning"],
        availability: {
          monday: [{ start: "09:00", end: "17:00", available: true }],
          tuesday: [{ start: "09:00", end: "17:00", available: true }],
          wednesday: [{ start: "09:00", end: "17:00", available: true }],
          thursday: [{ start: "09:00", end: "17:00", available: true }],
          friday: [{ start: "09:00", end: "17:00", available: true }]
        },
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        name: "IT-LAB-01",
        type: "lab",
        capacity: 30,
        building: "IT Block",
        floor: 1,
        features: ["computers", "projector", "lab_benches", "internet"],
        availability: {
          monday: [{ start: "09:00", end: "17:00", available: true }],
          tuesday: [{ start: "09:00", end: "17:00", available: true }],
          wednesday: [{ start: "09:00", end: "17:00", available: true }],
          thursday: [{ start: "09:00", end: "17:00", available: true }],
          friday: [{ start: "09:00", end: "17:00", available: true }]
        },
        createdAt: new Date(),
      }
    ];

    mockRooms.forEach(room => this.rooms.set(room.id, room));
  }

  private initializeMockScenarios() {
    const mockScenario: Scenario = {
      id: randomUUID(),
      name: "Current Semester",
      description: "Active timetable for current academic semester",
      isActive: true,
      metrics: {
        conflicts: 0,
        studentSatisfaction: 94,
        facultyBalance: 87,
        roomUtilization: 89
      },
      createdAt: new Date(),
    };

    this.scenarios.set(mockScenario.id, mockScenario);
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id, createdAt: new Date() };
    this.users.set(id, user);
    return user;
  }

  // Student methods
  async getAllStudents(): Promise<Student[]> {
    return Array.from(this.students.values());
  }

  async getStudent(id: string): Promise<Student | undefined> {
    return this.students.get(id);
  }

  async createStudent(insertStudent: InsertStudent): Promise<Student> {
    const id = randomUUID();
    const student: Student = { ...insertStudent, id, createdAt: new Date() };
    this.students.set(id, student);
    return student;
  }

  async updateStudent(id: string, updates: Partial<Student>): Promise<Student | undefined> {
    const student = this.students.get(id);
    if (!student) return undefined;
    
    const updated = { ...student, ...updates };
    this.students.set(id, updated);
    return updated;
  }

  async deleteStudent(id: string): Promise<boolean> {
    return this.students.delete(id);
  }

  // Faculty methods
  async getAllFaculty(): Promise<Faculty[]> {
    return Array.from(this.faculty.values());
  }

  async getFaculty(id: string): Promise<Faculty | undefined> {
    return this.faculty.get(id);
  }

  async createFaculty(insertFaculty: InsertFaculty): Promise<Faculty> {
    const id = randomUUID();
    const faculty: Faculty = { ...insertFaculty, id, createdAt: new Date() };
    this.faculty.set(id, faculty);
    return faculty;
  }

  async updateFaculty(id: string, updates: Partial<Faculty>): Promise<Faculty | undefined> {
    const faculty = this.faculty.get(id);
    if (!faculty) return undefined;
    
    const updated = { ...faculty, ...updates };
    this.faculty.set(id, updated);
    return updated;
  }

  async deleteFaculty(id: string): Promise<boolean> {
    return this.faculty.delete(id);
  }

  // Course methods
  async getAllCourses(): Promise<Course[]> {
    return Array.from(this.courses.values());
  }

  async getCourse(id: string): Promise<Course | undefined> {
    return this.courses.get(id);
  }

  async createCourse(insertCourse: InsertCourse): Promise<Course> {
    const id = randomUUID();
    const course: Course = { ...insertCourse, id, createdAt: new Date() };
    this.courses.set(id, course);
    return course;
  }

  async updateCourse(id: string, updates: Partial<Course>): Promise<Course | undefined> {
    const course = this.courses.get(id);
    if (!course) return undefined;
    
    const updated = { ...course, ...updates };
    this.courses.set(id, updated);
    return updated;
  }

  async deleteCourse(id: string): Promise<boolean> {
    return this.courses.delete(id);
  }

  // Room methods
  async getAllRooms(): Promise<Room[]> {
    return Array.from(this.rooms.values());
  }

  async getRoom(id: string): Promise<Room | undefined> {
    return this.rooms.get(id);
  }

  async createRoom(insertRoom: InsertRoom): Promise<Room> {
    const id = randomUUID();
    const room: Room = { ...insertRoom, id, createdAt: new Date() };
    this.rooms.set(id, room);
    return room;
  }

  async updateRoom(id: string, updates: Partial<Room>): Promise<Room | undefined> {
    const room = this.rooms.get(id);
    if (!room) return undefined;
    
    const updated = { ...room, ...updates };
    this.rooms.set(id, updated);
    return updated;
  }

  async deleteRoom(id: string): Promise<boolean> {
    return this.rooms.delete(id);
  }

  // Timetable methods
  async getAllTimetableEntries(scenarioId?: string): Promise<TimetableEntry[]> {
    const entries = Array.from(this.timetableEntries.values());
    if (scenarioId) {
      return entries.filter(entry => entry.scenarioId === scenarioId);
    }
    return entries;
  }

  async getTimetableEntry(id: string): Promise<TimetableEntry | undefined> {
    return this.timetableEntries.get(id);
  }

  async createTimetableEntry(insertEntry: InsertTimetableEntry): Promise<TimetableEntry> {
    const id = randomUUID();
    const entry: TimetableEntry = { ...insertEntry, id, createdAt: new Date() };
    this.timetableEntries.set(id, entry);
    return entry;
  }

  async updateTimetableEntry(id: string, updates: Partial<TimetableEntry>): Promise<TimetableEntry | undefined> {
    const entry = this.timetableEntries.get(id);
    if (!entry) return undefined;
    
    const updated = { ...entry, ...updates };
    this.timetableEntries.set(id, updated);
    return updated;
  }

  async deleteTimetableEntry(id: string): Promise<boolean> {
    return this.timetableEntries.delete(id);
  }

  // Scenario methods
  async getAllScenarios(): Promise<Scenario[]> {
    return Array.from(this.scenarios.values());
  }

  async getScenario(id: string): Promise<Scenario | undefined> {
    return this.scenarios.get(id);
  }

  async createScenario(insertScenario: InsertScenario): Promise<Scenario> {
    const id = randomUUID();
    const scenario: Scenario = { ...insertScenario, id, createdAt: new Date() };
    this.scenarios.set(id, scenario);
    return scenario;
  }

  async updateScenario(id: string, updates: Partial<Scenario>): Promise<Scenario | undefined> {
    const scenario = this.scenarios.get(id);
    if (!scenario) return undefined;
    
    const updated = { ...scenario, ...updates };
    this.scenarios.set(id, updated);
    return updated;
  }

  async deleteScenario(id: string): Promise<boolean> {
    return this.scenarios.delete(id);
  }
}

export const storage = new MemStorage();
