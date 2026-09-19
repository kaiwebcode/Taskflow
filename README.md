# TaskFlow — Task Management Dashboard

A responsive full-stack task management dashboard built with Next.js, JavaScript, Node.js, Express.js, MongoDB, and JWT authentication.

TaskFlow allows authenticated users to create, view, search, filter, edit, update, and delete tasks through a responsive dashboard designed for both desktop and mobile devices.

## Live Demo:-

**Frontend:**
https://taskflow-frontend-tau.vercel.app

**Backend API:**
https://taskflow-uomk.onrender.com

**GitHub Repository:**
https://github.com/kaiwebcode/Taskflow

---

## Project Overview

TaskFlow was developed as a full-stack task management solution for managing employee-related tasks across different stores.

The application includes:

* User authentication
* Task management
* Task status management
* Search and filtering
* Task validation
* API error handling
* Summary statistics
* Responsive desktop and mobile UI
* Production deployment
* Automated CI checks
* AI-assisted code review

---

## Features:-

### Authentication

* User registration
* User login
* JWT-based authentication
* Protected task APIs
* Authenticated dashboard access
* Logout functionality
* Invalid/expired authentication handling

### Task Management

Users can:

* Create tasks
* View tasks
* Edit tasks
* Delete tasks
* Change task status
* Set task priority
* Assign an employee
* Assign a store
* Set a due date
* Add task descriptions

### Task Status

Supported statuses:

* Pending
* In Progress
* Completed

### Priority

Supported priorities:

* Low
* Medium
* High

### Search & Filters

Tasks can be searched and filtered by:

* Task title
* Description
* Employee
* Store
* Status
* Priority
* Due date

Multiple filters can be combined, and all filters can be cleared easily.

### Dashboard Summary

The dashboard provides summary cards for:

* Total tasks
* Pending tasks
* Completed tasks
* Overdue tasks

Overdue tasks are calculated based on the due date and current task status. Completed tasks are not considered overdue.

### Validation & Error Handling

The application includes:

* Required field validation
* Task title length validation
* Description length validation
* Employee validation
* Store validation
* Due-date validation
* API error handling
* Authentication error handling
* Loading states
* Empty states
* User-friendly toast notifications

### Responsive Design

The dashboard is designed for:

* Desktop
* Laptop
* Tablet
* Mobile

On smaller screens, the task table changes to a card-based layout for better usability.

---

## 🛠️ Tech Stack

### Frontend

* Next.js
* React
* JavaScript
* CSS
* Lucide Icons

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JSON Web Token (JWT)
* bcrypt

### Deployment

* Vercel — Frontend
* Render — Backend
* MongoDB Atlas — Database

### Development & Code Quality

* Git
* GitHub
* GitHub Actions
* CodeRabbit

> TypeScript was listed as a suggested technology in the assignment. This implementation uses JavaScript.

---

## 🏗️ Architecture

```text
                    ┌─────────────────────┐
                    │       User          │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   Next.js Frontend  │
                    │     JavaScript      │
                    │       Vercel        │
                    └──────────┬──────────┘
                               │
                         REST API / JWT
                               │
                               ▼
                    ┌─────────────────────┐
                    │  Express.js Backend │
                    │       Node.js       │
                    │       Render        │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │      MongoDB        │
                    │    MongoDB Atlas    │
                    └─────────────────────┘
```

---

## 📁 Project Structure

```text
Taskflow/
│
├── .github/
│   └── workflows/
│       └── ci.yml
│
├── Backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
├── ui/
│   ├── app/
│   │   ├── dashboard/
│   │   │   ├── components/
│   │   │   └── page.js
│   │   ├── login/
│   │   ├── register/
│   │   └── ...
│   ├── components/
│   ├── app/utils/
│   ├── package.json
│   └── ...
│
├── .gitignore
├── README.md
└── AI_USAGE.md
```

---

## ⚙️ Requirements

Before running the project locally, make sure you have installed:

* Node.js 20+
* npm
* Git
* MongoDB Atlas account or a MongoDB instance

---

# 🔧 Local Setup

## 1. Clone the Repository

```bash
git clone https://github.com/kaiwebcode/Taskflow.git
cd Taskflow
```

---

## 2. Backend Setup

Navigate to the backend:

```bash
cd Backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Do not commit the `.env` file to GitHub.

Start the backend:

```bash
npm start
```

The backend will run on:

```text
http://localhost:5000
```

---

## 3. Frontend Setup

Open another terminal and navigate to the frontend:

```bash
cd ui
```

Install dependencies:

```bash
npm install
```

Create:

```text
ui/.env.local
```

Add:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Start the development server:

```bash
npm run dev
```

The frontend will run on:

```text
http://localhost:3000
```

---

# 🔐 Environment Variables

## Backend

Create:

```text
Backend/.env
```

Required variables:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

## Frontend

Create:

```text
ui/.env.local
```

For local development:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

For production:

```env
NEXT_PUBLIC_API_URL=https://taskflow-uomk.onrender.com/api
```

### Security

Environment files containing secrets are excluded from Git using `.gitignore`.

Never commit:

```text
.env
.env.local
```

---

# 🔌 API Endpoints

The backend exposes REST APIs under:

```text
/api
```

## Authentication

### Register

```http
POST /api/auth/register
```

### Login

```http
POST /api/auth/login
```

### Get Profile

```http
GET /api/auth/profile
```

Requires authentication.

---

## Tasks

### Get Tasks

```http
GET /api/tasks
```

Requires authentication.

### Create Task

```http
POST /api/tasks
```

Requires authentication.

### Update Task

```http
PUT /api/tasks/:id
```

Requires authentication.

### Change Task Status

```http
PATCH /api/tasks/:id/status
```

Requires authentication.

### Delete Task

```http
DELETE /api/tasks/:id
```

Requires authentication.

---

# 🔑 Authentication Flow

TaskFlow uses JWT-based authentication.

```text
User
 │
 ▼
Login
 │
 ▼
Backend validates credentials
 │
 ▼
JWT token generated
 │
 ▼
Frontend stores authentication token
 │
 ▼
Token attached to protected API requests
 │
 ▼
Backend authentication middleware
 │
 ▼
Protected task API
```

The backend verifies the JWT before allowing access to protected task operations.

---

# 📊 Task Data

A task can contain information such as:

```text
Title
Description
Employee
Store
Status
Priority
Due Date
Created At
Updated At
```

Supported status values:

```text
Pending
In Progress
Completed
```

Supported priority values:

```text
Low
Medium
High
```

---

# 🔄 CI/CD

TaskFlow uses GitHub Actions for continuous integration.

The CI workflow runs when changes are pushed or when a Pull Request is created for the configured branches.

The workflow performs:

```text
GitHub
   │
   ▼
GitHub Actions
   │
   ├── Checkout repository
   ├── Setup Node.js
   ├── Install frontend dependencies
   ├── Build frontend
   └── Install backend dependencies
```

### Deployment

Production deployment is handled through:

```text
GitHub
   │
   ├── Vercel → Frontend
   │
   └── Render → Backend
```

This keeps deployment separate from the CI validation process.

---

# Code Review

CodeRabbit is used as an additional automated code-review layer through GitHub Pull Requests.

The workflow is:

```text
Feature Branch
      │
      ▼
Pull Request
      │
      ├── CodeRabbit Review
      │
      └── GitHub Actions CI
      │
      ▼
Developer Review
      │
      ▼
Merge
```

CodeRabbit suggestions are reviewed manually before changes are accepted.

---

# Testing & Verification

The application was manually verified for the following functionality:

### Authentication

* Login
* Protected dashboard access
* Authentication error handling

### Task Management

* Create task
* Edit task
* Change task status
* Delete task

### Search & Filtering

* Search by task information
* Employee filter
* Store filter
* Status filter
* Priority filter
* Due-date filter
* Combined filters
* Clear filters

### Dashboard

* Total count
* Pending count
* Completed count
* Overdue count

### Validation

* Required fields
* Task title validation
* Employee/store validation
* Due-date validation
* Description length validation

### Responsive UI

* Desktop
* Tablet
* Mobile

---

# Production Deployment

## Frontend

The Next.js frontend is deployed using Vercel.

Production URL:

https://taskflow-frontend-tau.vercel.app

## Backend

The Node.js/Express backend is deployed using Render.

Production URL:

https://taskflow-uomk.onrender.com

## Database

MongoDB Atlas is used for persistent task and user data.

---

# Known Considerations

* The project uses JavaScript rather than TypeScript.
* Overdue status is calculated from the task due date and current status rather than stored as a separate database field.
* Production API availability depends on the deployed Render backend.
* Environment variables must be configured correctly for local and production environments.

---

# Screenshots

Screenshots and demo media can be added to this section before submission.

Recommended screenshots:

1. Login
2. Dashboard
3. Task creation/edit form
4. Search and filters
5. Task status management
6. Mobile responsive layout
7. GitHub Actions
8. CodeRabbit Pull Request review

---

# Assignment Requirements

| Requirement              | Status |
| ------------------------ | ------ |
| Simple login             | ✅      |
| Display tasks in a table | ✅      |
| Search tasks             | ✅      |
| Filter by employee       | ✅      |
| Filter by date           | ✅      |
| Filter by status         | ✅      |
| Filter by store          | ✅      |
| Create task              | ✅      |
| Edit task                | ✅      |
| Change task status       | ✅      |
| Total summary            | ✅      |
| Pending summary          | ✅      |
| Completed summary        | ✅      |
| Overdue summary          | ✅      |
| API error handling       | ✅      |
| Validation               | ✅      |
| Desktop responsive UI    | ✅      |
| Mobile responsive UI     | ✅      |
| Backend API              | ✅      |
| Production deployment    | ✅      |
| CI workflow              | ✅      |
| AI-assisted code review  | ✅      |

---

# AI Usage

Detailed AI usage is documented separately in:

```text
AI_USAGE.md
```

The document describes how ChatGPT and CodeRabbit were used during development and how AI-generated suggestions were reviewed and tested.

---

# Author

**Kaif Qureshi**

Full-Stack / Frontend Developer

GitHub:
https://github.com/kaiwebcode

---

## 📄 License

This project was created as part of a technical assignment and portfolio work.
