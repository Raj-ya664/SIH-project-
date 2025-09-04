import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table for authentication
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull(), // 'admin', 'faculty', 'student'
  email: text("email"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Students table
export const students = pgTable("students", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  rollNo: text("roll_no").notNull().unique(),
  name: text("name").notNull(),
  email: text("email"),
  program: text("program").notNull(), // 'B.Ed.', 'M.Ed.', 'FYUP', 'ITEP'
  semester: integer("semester").notNull(),
  totalCredits: integer("total_credits").default(0),
  preferences: json("preferences").$type<{
    majors: string[];
    minors: string[];
    skills: string[];
    aec: string[];
    vac: string[];
  }>(),
  section: text("section"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Faculty table
export const faculty = pgTable("faculty", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  employeeId: text("employee_id").notNull().unique(),
  name: text("name").notNull(),
  email: text("email"),
  department: text("department").notNull(),
  expertise: json("expertise").$type<string[]>(),
  maxHoursPerWeek: integer("max_hours_per_week").default(20),
  currentHours: integer("current_hours").default(0),
  availability: json("availability").$type<{
    [day: string]: { start: string; end: string; available: boolean }[];
  }>(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Courses table
export const courses = pgTable("courses", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  code: text("code").notNull().unique(),
  title: text("title").notNull(),
  credits: integer("credits").notNull(),
  type: text("type").notNull(), // 'Major', 'Minor', 'Skill', 'AEC', 'VAC', 'Lab', 'TP'
  theoryHours: integer("theory_hours").default(0),
  practicalHours: integer("practical_hours").default(0),
  maxEnrollment: integer("max_enrollment"),
  prerequisites: json("prerequisites").$type<string[]>(),
  department: text("department"),
  semester: integer("semester"),
  isElective: boolean("is_elective").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Rooms/Labs table
export const rooms = pgTable("rooms", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull().unique(),
  type: text("type").notNull(), // 'classroom', 'lab', 'auditorium'
  capacity: integer("capacity").notNull(),
  building: text("building"),
  floor: integer("floor"),
  features: json("features").$type<string[]>(), // ['projector', 'smart_board', 'lab_benches']
  availability: json("availability").$type<{
    [day: string]: { start: string; end: string; available: boolean }[];
  }>(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Timetable entries
export const timetableEntries = pgTable("timetable_entries", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  scenarioId: varchar("scenario_id"),
  courseId: varchar("course_id").notNull(),
  facultyId: varchar("faculty_id").notNull(),
  roomId: varchar("room_id").notNull(),
  studentGroup: text("student_group"), // section or group identifier
  dayOfWeek: integer("day_of_week").notNull(), // 0-6 (Monday-Sunday)
  startTime: text("start_time").notNull(), // "09:00"
  endTime: text("end_time").notNull(), // "10:00"
  createdAt: timestamp("created_at").defaultNow(),
});

// Scenarios for timetable management
export const scenarios = pgTable("scenarios", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description"),
  isActive: boolean("is_active").default(false),
  metrics: json("metrics").$type<{
    conflicts: number;
    studentSatisfaction: number;
    facultyBalance: number;
    roomUtilization: number;
  }>(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({ id: true, createdAt: true });
export const insertStudentSchema = createInsertSchema(students).omit({ id: true, createdAt: true });
export const insertFacultySchema = createInsertSchema(faculty).omit({ id: true, createdAt: true });
export const insertCourseSchema = createInsertSchema(courses).omit({ id: true, createdAt: true });
export const insertRoomSchema = createInsertSchema(rooms).omit({ id: true, createdAt: true });
export const insertTimetableEntrySchema = createInsertSchema(timetableEntries).omit({ id: true, createdAt: true });
export const insertScenarioSchema = createInsertSchema(scenarios).omit({ id: true, createdAt: true });

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Student = typeof students.$inferSelect;
export type InsertStudent = z.infer<typeof insertStudentSchema>;
export type Faculty = typeof faculty.$inferSelect;
export type InsertFaculty = z.infer<typeof insertFacultySchema>;
export type Course = typeof courses.$inferSelect;
export type InsertCourse = z.infer<typeof insertCourseSchema>;
export type Room = typeof rooms.$inferSelect;
export type InsertRoom = z.infer<typeof insertRoomSchema>;
export type TimetableEntry = typeof timetableEntries.$inferSelect;
export type InsertTimetableEntry = z.infer<typeof insertTimetableEntrySchema>;
export type Scenario = typeof scenarios.$inferSelect;
export type InsertScenario = z.infer<typeof insertScenarioSchema>;
