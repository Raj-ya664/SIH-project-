import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertStudentSchema, insertFacultySchema, insertCourseSchema, insertRoomSchema, insertScenarioSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Authentication routes
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password, role } = req.body;
      
      const user = await storage.getUserByUsername(username);
      if (!user || user.password !== password || user.role !== role) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // In a real app, you'd set up proper session management
      res.json({ 
        user: { 
          id: user.id, 
          username: user.username, 
          role: user.role, 
          email: user.email 
        } 
      });
    } catch (error) {
      res.status(500).json({ message: "Login failed" });
    }
  });

  // Students routes
  app.get("/api/students", async (req, res) => {
    try {
      const students = await storage.getAllStudents();
      res.json(students);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch students" });
    }
  });

  app.post("/api/students", async (req, res) => {
    try {
      const validatedData = insertStudentSchema.parse(req.body);
      const student = await storage.createStudent(validatedData);
      res.json(student);
    } catch (error) {
      res.status(400).json({ message: "Invalid student data" });
    }
  });

  app.put("/api/students/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const student = await storage.updateStudent(id, req.body);
      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }
      res.json(student);
    } catch (error) {
      res.status(500).json({ message: "Failed to update student" });
    }
  });

  app.delete("/api/students/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await storage.deleteStudent(id);
      if (!deleted) {
        return res.status(404).json({ message: "Student not found" });
      }
      res.json({ message: "Student deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete student" });
    }
  });

  // Faculty routes
  app.get("/api/faculty", async (req, res) => {
    try {
      const faculty = await storage.getAllFaculty();
      res.json(faculty);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch faculty" });
    }
  });

  app.post("/api/faculty", async (req, res) => {
    try {
      const validatedData = insertFacultySchema.parse(req.body);
      const faculty = await storage.createFaculty(validatedData);
      res.json(faculty);
    } catch (error) {
      res.status(400).json({ message: "Invalid faculty data" });
    }
  });

  app.put("/api/faculty/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const faculty = await storage.updateFaculty(id, req.body);
      if (!faculty) {
        return res.status(404).json({ message: "Faculty not found" });
      }
      res.json(faculty);
    } catch (error) {
      res.status(500).json({ message: "Failed to update faculty" });
    }
  });

  app.delete("/api/faculty/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await storage.deleteFaculty(id);
      if (!deleted) {
        return res.status(404).json({ message: "Faculty not found" });
      }
      res.json({ message: "Faculty deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete faculty" });
    }
  });

  // Courses routes
  app.get("/api/courses", async (req, res) => {
    try {
      const courses = await storage.getAllCourses();
      res.json(courses);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch courses" });
    }
  });

  app.post("/api/courses", async (req, res) => {
    try {
      const validatedData = insertCourseSchema.parse(req.body);
      const course = await storage.createCourse(validatedData);
      res.json(course);
    } catch (error) {
      res.status(400).json({ message: "Invalid course data" });
    }
  });

  app.put("/api/courses/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const course = await storage.updateCourse(id, req.body);
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
      res.json(course);
    } catch (error) {
      res.status(500).json({ message: "Failed to update course" });
    }
  });

  app.delete("/api/courses/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await storage.deleteCourse(id);
      if (!deleted) {
        return res.status(404).json({ message: "Course not found" });
      }
      res.json({ message: "Course deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete course" });
    }
  });

  // Rooms routes
  app.get("/api/rooms", async (req, res) => {
    try {
      const rooms = await storage.getAllRooms();
      res.json(rooms);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch rooms" });
    }
  });

  app.post("/api/rooms", async (req, res) => {
    try {
      const validatedData = insertRoomSchema.parse(req.body);
      const room = await storage.createRoom(validatedData);
      res.json(room);
    } catch (error) {
      res.status(400).json({ message: "Invalid room data" });
    }
  });

  app.put("/api/rooms/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const room = await storage.updateRoom(id, req.body);
      if (!room) {
        return res.status(404).json({ message: "Room not found" });
      }
      res.json(room);
    } catch (error) {
      res.status(500).json({ message: "Failed to update room" });
    }
  });

  app.delete("/api/rooms/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await storage.deleteRoom(id);
      if (!deleted) {
        return res.status(404).json({ message: "Room not found" });
      }
      res.json({ message: "Room deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete room" });
    }
  });

  // Scenarios routes
  app.get("/api/scenarios", async (req, res) => {
    try {
      const scenarios = await storage.getAllScenarios();
      res.json(scenarios);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch scenarios" });
    }
  });

  app.post("/api/scenarios", async (req, res) => {
    try {
      const validatedData = insertScenarioSchema.parse(req.body);
      const scenario = await storage.createScenario(validatedData);
      res.json(scenario);
    } catch (error) {
      res.status(400).json({ message: "Invalid scenario data" });
    }
  });

  // Timetable generation endpoint
  app.post("/api/timetable/generate", async (req, res) => {
    try {
      // Simulate AI timetable generation
      await new Promise(resolve => setTimeout(resolve, 2000)); // 2 second delay
      
      const metrics = {
        conflicts: Math.floor(Math.random() * 3), // 0-2 conflicts
        studentSatisfaction: 88 + Math.floor(Math.random() * 12), // 88-99%
        facultyBalance: 80 + Math.floor(Math.random() * 20), // 80-99%
        roomUtilization: 75 + Math.floor(Math.random() * 20), // 75-94%
      };

      res.json({
        message: "Timetable generated successfully",
        metrics,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to generate timetable" });
    }
  });

  // Timetable entries routes
  app.get("/api/timetable", async (req, res) => {
    try {
      const { scenarioId } = req.query;
      const entries = await storage.getAllTimetableEntries(scenarioId as string);
      res.json(entries);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch timetable entries" });
    }
  });

  // Dashboard stats endpoint
  app.get("/api/dashboard/stats", async (req, res) => {
    try {
      const students = await storage.getAllStudents();
      const faculty = await storage.getAllFaculty();
      const rooms = await storage.getAllRooms();
      const scenarios = await storage.getAllScenarios();
      
      const activeScenario = scenarios.find(s => s.isActive);
      
      res.json({
        totalStudents: students.length,
        totalFaculty: faculty.length,
        totalRooms: rooms.length,
        conflicts: activeScenario?.metrics?.conflicts || 0,
        studentSatisfaction: activeScenario?.metrics?.studentSatisfaction || 0,
        facultyBalance: activeScenario?.metrics?.facultyBalance || 0,
        roomUtilization: activeScenario?.metrics?.roomUtilization || 0,
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch dashboard stats" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
