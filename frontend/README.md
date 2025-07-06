# Ride Booking Frontend

This is the frontend application for the ride booking system.

## Running the Application

### Prerequisites

- Node.js 18+ installed
- MongoDB installed and running locally (or a MongoDB Atlas connection string)
- npm or yarn package manager

### 1. Setting Up the Backend

First, we need to get the backend server running:

1. Navigate to the backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The backend server will start on http://localhost:3001. You should see a message indicating the server is running and connected to MongoDB.

### 2. Setting Up the Frontend

In a new terminal window:

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env.local` file in the frontend directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

4. Start the development server:

```bash
npm run dev
```

The frontend application will start on http://localhost:3000.

### Verifying the Setup

1. Backend health check:

   - Visit http://localhost:3001/health
   - You should see a success response

2. Frontend application:
   - Visit http://localhost:3000
   - You should see the login page

### Production Deployment

For production deployment:

1. Backend:

```bash
cd backend
npm run build
npm start
```

2. Frontend:

```bash
cd frontend
npm run build
npm start
```

## Tech Stack & Architecture Decisions

### Frontend Stack

- **Next.js 14**: Chosen for its powerful features including:

  - Server-side rendering for better SEO and initial load performance
  - App Router for simplified routing and layouts
  - Built-in TypeScript support
  - API routes for backend communication
  - Excellent developer experience with hot reloading
  - Strong community support and extensive ecosystem

- **TypeScript**: Used throughout the application for:

  - Type safety and better developer experience
  - Early error detection
  - Better IDE support and code documentation
  - Enhanced maintainability for larger codebases

- **Tailwind CSS**: Selected for:
  - Rapid UI development
  - Consistent design system
  - Built-in responsive design
  - Zero runtime CSS-in-JS overhead
  - Easy customization and theming

### Backend Stack

- **Fastify**: Chosen for the MVP phase because:
  - Extremely fast performance (one of the fastest Node.js frameworks)
  - Low overhead and minimal boilerplate
  - Built-in TypeScript support
  - Plugin-based architecture for easy extensibility
  - Excellent validation via JSON Schema
  - Perfect for quick MVP development

### Production Considerations

For a full-scale production application, Spring Boot would be a better choice because:

1. **Enterprise-Grade Features**:

   - Built-in support for microservices
   - Robust security features
   - Advanced caching mechanisms
   - Better transaction management

2. **Scalability**:

   - Better handling of concurrent requests
   - Superior memory management
   - Built-in support for clustering
   - Easy horizontal scaling

### Why Fastify for MVP?

1. **Development Speed**:

   - Faster setup and configuration
   - Less boilerplate code
   - Quick iteration cycles
   - JavaScript/TypeScript familiarity

2. **Learning Curve**:
   - Easier to learn and implement
   - Great for small teams
   - Excellent documentation
   - Active community support

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Create a `.env.local` file in the frontend directory with the following content:

```
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

3. Start the development server:

```bash
npm run dev
```

## Features

- User authentication (login/register)
- Passenger dashboard
- Driver dashboard
- Ride history
- Profile management
