# AMS – Attendance Monitoring & Leave Management System

AMS is a comprehensive, full-stack Attendance Monitoring & Leave Management System designed to streamline HR processes, track employee working hours with location check-in (geofencing ready), and manage leave request balances.

The system features:
- **Role-Based Access Control (RBAC)**: Admin, HR, and Employee interfaces.
- **Attendance Logging**: Real-time clock-in/clock-out tracking with geographic coordinates (latitude and longitude).
- **Leave Request Workflow**: Comprehensive application, status tracking, and residue leave balance computations.
- **Session Timers**: Auto logout/timeout to keep employee sessions secure.

---

## Tech Stack

### Frontend
- **Framework**: React.js with Vite
- **Routing**: React Router DOM
- **HTTP Client**: Axios (configured with interceptors for token management)
- **Styling**: Vanilla CSS

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database ORM**: Prisma ORM
- **Database**: PostgreSQL (e.g., Supabase, RDS, or local Docker)
- **Authentication**: JSON Web Tokens (JWT) & bcrypt

---

## Project Structure

```text
AMS/
├── backend/
│   ├── prisma/             # Prisma database schema & migrations
│   ├── src/
│   │   ├── config/         # Config files (e.g., database connection)
│   │   ├── controllers/    # Business logic handlers (auth, attendance, leaves, users)
│   │   ├── middleware/     # Auth and validation middlewares
│   │   └── routes/         # Express API routes
│   │   └── server.js       # App entry point
│   ├── package.json
│   └── tsconfig.json
└── frontend/
    ├── public/
    ├── src/
    │   ├── api/            # API call modules (Axios instances & requests)
    │   ├── assets/         # Static assets (images, logos)
    │   ├── components/     # UI Components (Sidebars, leave indicators, timers)
    │   ├── layouts/        # Page layouts (Admin, HR, Main)
    │   ├── pages/          # Complete page views (Login, ApplyLeave, CreateUser, etc.)
    │   ├── App.jsx         # Component routing & structure
    │   ├── index.css       # Core design styles
    │   └── main.jsx        # App mounting point
    ├── package.json
    └── vite.config.js
```

---

## Database Models

The database is built on PostgreSQL using **Prisma ORM**. Key models defined in [schema.prisma](file:///c:/Users/SreehariKP/OneDrive%20-%20Gnapi%20Technologies%20Private%20Limited/Documents/Training%20Projects/AMS/backend/prisma/schema.prisma) include:

- **User**: Stores employee profile information, credentials, and roles (Admin, HR, Employee).
- **Attendance**: Records daily clock-in/out timestamps, computed durations, location coordinates (latitude/longitude), and status.
- **Leave**: Manages individual leave requests with start/end dates and status (PENDING, APPROVED, REJECTED).
- **LeaveBalance**: Tracks total vs. used balances for Annual, Sick, and Remote leaves.

---

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher)
- [PostgreSQL](https://www.postgresql.org/) database instance

### 1. Backend Setup

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your environment variables by creating a `.env` file inside `backend/`:
   ```env
   PORT=5000
   DATABASE_URL="postgresql://username:password@localhost:5432/ams_db?schema=public"
   JWT_SECRET="your_jwt_secret_key"
   ```
4. Push the database schema and seed the database (if applicable):
   ```bash
   npx prisma migrate dev --name init
   ```
5. Start the backend development server:
   ```bash
   npm run dev
   ```

### 2. Frontend Setup

1. Navigate to the frontend folder:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `frontend/` directory to configure the backend API URL:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```
4. Start the frontend development server:
   ```bash
   npm run dev
   ```

---

## API Endpoints

- **Authentication**: `POST /api/auth/login`
- **Attendance**:
  - `POST /api/attendance/clockin`
  - `POST /api/attendance/clockout`
  - `GET /api/attendance/logs`
- **Leaves**:
  - `POST /api/leaves/apply`
  - `GET /api/leaves/balance`
  - `GET /api/leaves/requests` (HR/Admin approval list)
- **User Management**:
  - `POST /api/users/create` (HR/Admin only)
  - `DELETE /api/users/delete/:id` (HR/Admin only)
