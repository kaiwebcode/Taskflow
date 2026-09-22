# AI Usage — TaskFlow

## Project

**TaskFlow — Task Management Dashboard**

## Developer

**Kaif Qureshi**

---

# Purpose

AI tools were used during the development of TaskFlow as development assistants for architecture planning, debugging, implementation guidance, UI improvements, validation, API troubleshooting, documentation, and code review.

The use of AI did not replace the developer's responsibility for understanding and verifying the implementation.

AI-generated suggestions and code were reviewed, modified, tested, and integrated manually.

The final responsibility for the application's implementation, debugging, testing, deployment, and understanding remained with the developer.

---

# AI Tools Used

## ChatGPT

ChatGPT was used as a development assistant for:

* Understanding technical requirements
* Planning frontend and backend implementation
* Debugging frontend issues
* Debugging backend issues
* Improving task filtering
* Improving validation
* Troubleshooting API communication
* Improving responsive UI
* Explaining technical concepts
* Reviewing implementation approaches
* Deployment troubleshooting
* Documentation

## CodeRabbit

CodeRabbit was used for automated code review through GitHub Pull Requests.

It was used to:

* Review changed files
* Identify potential bugs
* Identify code-quality issues
* Suggest maintainability improvements
* Review implementation changes

CodeRabbit feedback was reviewed manually before changes were accepted.

---

# Five Important Prompts

## Prompt 1 — Task Dashboard Architecture

> Review the TaskFlow assignment requirements and help design a full-stack task management dashboard using Next.js for the frontend and Node.js/Express/MongoDB for the backend. The application should support authentication, task CRUD, status changes, search, filters, summary cards, validation, responsive design, and API error handling.

### Result

The architecture was organized into:

* Next.js frontend
* Express backend
* MongoDB database
* JWT authentication
* REST API endpoints
* Reusable dashboard components
* Separate API utility functions

This helped establish the overall frontend/backend structure.

---

## Prompt 2 — Task Filtering

> Improve the TaskFlow task list so users can search by title, description, employee, and store, and filter by employee, store, status, priority, and due date. Multiple filters should work together and there should be a clear filters action.

### Result

The task list was improved to support:

* Search
* Employee filter
* Store filter
* Status filter
* Priority filter
* Due-date filter
* Combined filtering
* Clear filters

The implementation was then tested manually using different combinations of filters.

---

## Prompt 3 — Dashboard Summary Cards

> Add dashboard summary cards for total tasks, pending tasks, completed tasks, and overdue tasks. Overdue should be calculated from the due date and should not include completed tasks.

### Result

The dashboard was updated to calculate:

```text
Total
Pending
Completed
Overdue
```

The overdue calculation checks the due date against the current date and excludes tasks whose status is `Completed`.

---

## Prompt 4 — Responsive Task List

> Refactor the TaskFlow task list to provide a professional responsive experience. Keep a table layout for desktop and use a card-based layout for smaller screens so task information remains readable and usable on mobile devices.

### Result

The task list was redesigned to support:

* Desktop table layout
* Tablet layout
* Mobile card layout
* Responsive controls
* Better spacing
* Loading states
* Empty states
* User-friendly task actions

The responsive behavior was manually tested on smaller screen sizes.

---

## Prompt 5 — Debugging and API Integration

> Review the TaskFlow frontend and backend API integration. The dashboard needs to load tasks, create tasks, update tasks, change task status, and delete tasks through the authenticated API. Identify API integration problems and suggest fixes while keeping the existing architecture.

### Result

The API integration was reviewed and adjusted to support:

```text
GET    /api/tasks
POST   /api/tasks
PUT    /api/tasks/:id
PATCH  /api/tasks/:id/status
DELETE /api/tasks/:id
```

Authentication tokens are attached to protected requests and API failures are handled through the frontend UI.

---

# AI-Generated Code

AI assistance was used for portions of the following areas:

* Frontend component implementation
* Task filtering logic
* Task validation logic
* Dashboard summary calculations
* API integration
* Responsive UI improvements
* Error handling
* Loading and empty states
* Toast notifications
* Documentation
* Debugging suggestions

The implementation was not blindly copied.

Generated suggestions were reviewed and modified according to the actual TaskFlow codebase.

---

# AI Mistakes Found and Corrected

The assessment requires documenting mistakes discovered during AI-assisted development.

## Mistake 1 — Frontend and Backend API Contract Mismatch

### Problem

During development, an API integration issue occurred where the frontend request structure did not match what the backend task endpoint expected.

This resulted in task operations not behaving correctly because the request body and backend validation requirements were not aligned.

### How It Was Identified

The issue was identified through manual testing of the task flow.

The request was inspected and compared with the Express/Mongoose task route and model validation.

### Correction

The frontend request was adjusted to match the backend API contract.

The task payload was kept consistent with the backend model fields, including:

```text
title
description
employee
store
status
priority
dueDate
```

The API response and error handling were also reviewed after the correction.

### Verification

The corrected implementation was tested using:

* Create task
* Edit task
* Change status
* Delete task
* Refresh dashboard

The task operations then worked correctly.

---

# Mistake 2 — Overdue Task Calculation

### Problem

An initial implementation of the overdue calculation could treat the current date incorrectly when comparing task due dates.

A task due today should not be treated as overdue simply because of the current time.

### How It Was Identified

The issue was identified while manually testing the dashboard summary with tasks having:

* Past due dates
* Today's due date
* Future due dates
* Completed status

### Correction

The overdue calculation was adjusted to compare the relevant calendar date rather than treating a task due today as overdue.

Completed tasks are also explicitly excluded from the overdue count.

The intended logic is:

```text
Due date before today
AND
Status is not Completed
```

### Verification

The dashboard was tested using tasks with different due dates and statuses.

The resulting overdue summary matched the expected behavior.

---

# Additional Debugging and Code Review

During development, AI-assisted debugging was also used for issues involving:

* API errors
* Frontend/backend communication
* Task filtering
* Validation
* Responsive layouts
* Deployment configuration
* Production environment variables
* Next.js build warnings
* GitHub Actions configuration

These suggestions were evaluated against the actual project rather than being applied automatically.

---

# CodeRabbit Usage

CodeRabbit was used through GitHub Pull Requests.

The development workflow was:

```text
Feature Branch
      │
      ▼
Commit Changes
      │
      ▼
Push Branch
      │
      ▼
Create Pull Request
      │
      ├── GitHub Actions CI
      │
      └── CodeRabbit Review
      │
      ▼
Review Suggestions
      │
      ▼
Fix if Required
      │
      ▼
Merge into Main
```

CodeRabbit was used as a review assistant rather than an automatic approval system.

Its suggestions were reviewed manually before being applied.

---

# How AI-Generated Code Was Verified

AI-assisted changes were verified using:

1. Manual browser testing
2. API testing
3. Authentication testing
4. Task CRUD testing
5. Search testing
6. Filter testing
7. Status change testing
8. Validation testing
9. Responsive UI testing
10. Production deployment testing
11. GitHub Actions CI
12. CodeRabbit review

The main application flows were tested after implementation:

```text
Login
  ↓
Dashboard
  ↓
Create Task
  ↓
Search / Filter
  ↓
Edit Task
  ↓
Change Status
  ↓
Delete Task
  ↓
Logout
```

---

# Developer Understanding

The main architecture of TaskFlow is:

```text
User
 │
 ▼
Next.js Frontend
 │
 │ REST API + JWT
 ▼
Express.js Backend
 │
 ▼
MongoDB
```

### Frontend

The Next.js frontend is responsible for:

* Authentication UI
* Dashboard UI
* Task form
* Task list
* Search
* Filters
* Summary cards
* Loading states
* Error states
* User interactions

### Backend

The Express backend is responsible for:

* Authentication
* JWT verification
* Task APIs
* Request validation
* MongoDB operations
* Error responses

### Database

MongoDB stores:

* User information
* Task information

### Authentication

JWT is used to authenticate protected API requests.

The backend middleware verifies the token before allowing access to protected task routes.

---

# Important API Operations

TaskFlow uses the following task endpoints:

```text
GET    /api/tasks
POST   /api/tasks
PUT    /api/tasks/:id
PATCH  /api/tasks/:id/status
DELETE /api/tasks/:id
```

Authentication endpoints include:

```text
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/profile
```

---

# Known Considerations

* The project uses JavaScript rather than TypeScript.
* TypeScript was suggested by the assessment but was not mandatory.
* Overdue status is calculated from the task due date and current status.
* Production functionality depends on the deployed backend and MongoDB connection.
* Environment variables are required for local and production configuration.

---

# Assessment Requirements

The Developer Technical Assessment states that candidates must understand and be able to explain submitted code.

AI was therefore used as an assistant rather than as a replacement for development work.

The developer was responsible for:

* Understanding the architecture
* Reviewing generated suggestions
* Testing generated code
* Identifying bugs
* Correcting implementation problems
* Integrating frontend and backend
* Testing production behavior
* Reviewing CodeRabbit feedback
* Maintaining the Git history
* Preparing the final documentation

---

# Git History

The assessment requires at least three meaningful Git commits.

TaskFlow maintains meaningful commits representing development work such as:

```text
feat: implement task dashboard
feat: add task filtering and status management
feat: improve responsive task list
docs: add project and ai usage documentation
ci: add github actions workflow
```

Only commits actually present in the repository should be considered part of the final submission.

---

# Five-Minute Demonstration Video

The assessment requires a five-minute demonstration video.

The recommended demonstration flow is:

```text
00:00 — Project introduction
00:20 — Login
00:40 — Dashboard and summary cards
01:10 — Create a task
01:40 — Search and filters
02:20 — Edit a task
02:50 — Change task status
03:10 — Delete a task
03:30 — Responsive/mobile UI
04:00 — Architecture explanation
04:25 — GitHub Actions
04:40 — CodeRabbit review
05:00 — End
```

The demonstration should focus on the working application and briefly explain the architecture and development workflow.

# Final Note

AI tools helped accelerate development, debugging, code review, and documentation.

However, AI-generated output was treated as a starting point rather than automatically trusted.

The developer reviewed the generated suggestions, identified implementation issues, corrected them, tested the application, verified the production deployment, and reviewed CodeRabbit recommendations.

The final responsibility for the code and technical understanding remained with the developer.
