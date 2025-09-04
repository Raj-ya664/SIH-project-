# Overview

EduTime AI is a web-based timetable generation system designed for educational institutions, specifically built to comply with NEP 2020 requirements. The application serves as an AI-powered scheduling solution that helps administrators, faculty, and students manage academic timetables efficiently. It features role-based access control with separate portals for administrators, faculty members, and students, each providing tailored functionality for their specific needs.

The system handles complex scheduling requirements including major/minor courses, skill-based courses, AEC (Ability Enhancement Courses), VAC (Value Added Courses), and laboratory sessions. It provides conflict-free scheduling, faculty workload optimization, and student preference management while maintaining flexibility for different academic programs like B.Ed., M.Ed., FYUP, and ITEP.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The client-side is built using React with TypeScript, leveraging Vite for development tooling and build optimization. The application uses a component-based architecture with shadcn/ui components for consistent design patterns. Routing is handled by Wouter for lightweight navigation, while state management relies on TanStack React Query for server state and local React state for UI components.

The UI framework employs Tailwind CSS for styling with a custom design system that supports dark/light themes through CSS variables. The application is structured with separate page components for different user roles (admin, faculty, student) and shared components for common UI elements like forms, tables, and modals.

## Backend Architecture
The server is built using Express.js with TypeScript, following a RESTful API design pattern. The architecture separates concerns with dedicated route handlers, storage abstraction layer, and middleware for request processing. The server implements role-based authentication and authorization to control access to different endpoints based on user roles.

The storage layer is abstracted through an interface-based design that currently uses in-memory storage for development but is structured to easily switch to database implementations. The API endpoints follow RESTful conventions for CRUD operations on students, faculty, courses, rooms, and timetable entries.

## Data Storage Solutions
The application uses Drizzle ORM with PostgreSQL for database operations, configured through environment variables for database connection. The schema defines tables for users, students, faculty, courses, rooms, timetable entries, and scenarios with proper relationships and constraints.

The database schema supports complex academic structures with JSON fields for storing preferences, availability schedules, and course selections. It uses UUID primary keys and proper indexing for performance optimization.

## Authentication and Authorization
Authentication is handled through a simple username/password system with role-based access control. The system supports three main roles: admin, faculty, and student, each with different permissions and access levels.

Session management is currently implemented using local storage on the client side, with plans to implement proper server-side session management using PostgreSQL session storage through connect-pg-simple middleware.

## Design System and UI Components
The application uses a comprehensive design system built on top of Radix UI primitives and styled with Tailwind CSS. Components are organized following the shadcn/ui pattern with consistent theming, typography, and spacing systems.

The design system supports responsive layouts, accessibility features, and smooth animations. Color schemes are defined through CSS custom properties to enable easy theme switching between light and dark modes.

# External Dependencies

## Database Services
- **Neon Database**: Serverless PostgreSQL database service accessed through @neondatabase/serverless driver
- **Drizzle ORM**: Type-safe database toolkit for schema definition, migrations, and query building
- **connect-pg-simple**: PostgreSQL session store for Express sessions

## UI and Component Libraries
- **Radix UI**: Headless UI components for accessibility and interaction patterns including dialogs, dropdowns, form controls, and navigation elements
- **shadcn/ui**: Component system built on Radix UI with consistent styling and theming
- **Lucide React**: Icon library providing consistent iconography throughout the application
- **Recharts**: Charting library for displaying analytics and timetable visualizations

## Development and Build Tools
- **Vite**: Modern build tool for fast development server and optimized production builds
- **TypeScript**: Static type checking for both client and server code
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **TanStack React Query**: Data fetching and caching library for server state management

## Validation and Forms
- **Zod**: Schema validation library integrated with Drizzle for type-safe database operations
- **React Hook Form**: Form state management with validation support
- **@hookform/resolvers**: Integration between React Hook Form and validation libraries

## Routing and Navigation
- **Wouter**: Lightweight routing library for client-side navigation
- **React Router**: Alternative routing solution for complex navigation requirements