# TaskFlow — Task Management Dashboard

TaskFlow is a responsive full-stack task management dashboard built for the Developer Technical Assessment.

It allows authenticated users to create, view, search, filter, edit, update, and delete tasks through a responsive dashboard designed for desktop, tablet, and mobile devices.

The application uses a Next.js frontend with a Node.js/Express.js backend, MongoDB for persistent storage, and JWT-based authentication.

## Live Demo

### Frontend

TaskFlow Frontend: `https://taskflow-frontend-tau.vercel.app`

### Backend API

TaskFlow Backend: `https://taskflow-uomk.onrender.com`

### GitHub Repository

TaskFlow Repository: `https://github.com/kaiwebcode/Taskflow`

---

# Project Overview

TaskFlow was developed as a full-stack task management solution for managing employee-related tasks across different stores.

The application provides:

* User registration and login
* JWT authentication
* Protected task APIs
* Task creation and management
* Task status management
* Task priority management
* Search and filtering
* Task validation
* API and authentication error handling
* Dashboard summary statistics
* Responsive desktop and mobile UI
* Production deployment
* GitHub Actions CI
* CodeRabbit pull-request code review

The project was developed using JavaScript. TypeScript was suggested by the assessment, but it was not mandatory, so the implementation uses JavaScript throughout the frontend.

---

# Features

## Authentication

TaskFlow includes:

* User registration
* User login
* JWT-based authentication
* Protected task APIs
* Authenticated dashboard access
* Logout functionality
* Authentication error handling

The backend verifies the JWT before allowing access to protected task operations.

---

## Task Management

Authenticated users can:

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

---

## Task Status

Supported task statuses:

```text
Pending
In Progress
Completed
```

---

## Task Priority

Supported priorities:

```text
Low
Medium
High
```

---

## Search and Filters

Tasks can be searched and filtered by:

* Task title
* Task description
* Employee
* Store
* Status
* Priority
* Due date

Multiple filters can be combined.

A clear-filters action is also provided to reset the current filtering state.

---

## Dashboard Summary

The dashboard provides summary cards for:

* Total tasks
* Pending tasks
* Completed tasks
* Overdue tasks

Overdue tasks are calculated using the task due date and current task status.

A task is considered overdue when its due date has passed and its status is not `Completed`.

---

# Validation and Error Handling

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
* Delete confirmation
* Invalid API response handling

Validation is implemented on the backend as well as through the frontend user interface.

---

# Responsive Design

The dashboard is designed for:

* Desktop
* Laptop
* Tablet
* Mobile

On smaller screens, the desktop task table changes into a card-based layout so that task information remains usable on narrow screens.

---

# Tech Stack

## Frontend

* Next.js
* React
* JavaScript
* CSS
* Lucide Icons
* Sonner

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JSON Web Token (JWT)
* bcrypt

## Deployment

* Vercel — Frontend
* Render — Backend
* MongoDB Atlas — Database

## Development and Code Quality

* Git
* GitHub
* GitHub Actions
* CodeRabbit

> TypeScript was suggested as part of the assessment's recommended stack. This implementation uses JavaScript.

---

# Architecture

```text
                         ┌─────────────────────┐
                         │        User         │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │   Next.js Frontend  │
                         │      JavaScript     │
                         │       Vercel        │
                         └──────────┬──────────┘
                                    │
                              REST API + JWT
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

# Authentication Flow

TaskFlow uses JWT-based authentication.

```text
User
 │
 ▼
Register / Login
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

The authentication middleware verifies the token before allowing access to protected task endpoints.

---

# Project Structure

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
│   │
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

# Requirements

Before running TaskFlow
