# PrimeTrade Assignment

This repository contains a full-stack task management application with a Node.js/Express backend and a Next.js frontend. The project is organized into two main folders: `Backend` and `ui`.

## Table of Contents
- [Project Structure](#project-structure)
- [Backend](#backend)
- [Frontend (UI)](#frontend-ui)
- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [License](#license)

## Project Structure
```
.
├── Backend/           # Node.js/Express backend API
│   ├── controllers/   # Route controllers (e.g., taskController.js)
│   ├── middleware/    # Custom middleware (e.g., auth.js)
│   ├── models/        # Mongoose models (Task.js, User.js)
│   ├── routes/        # Express routes (auth.js, tasks.js)
│   ├── package.json   # Backend dependencies and scripts
│   └── server.js      # Entry point for backend server
│
├── ui/                # Next.js frontend
│   ├── app/           # Next.js app directory
│   │   ├── dashboard/ # Dashboard page and components
│   │   ├── login/     # Login page
│   │   ├── register/  # Registration page
│   │   ├── schema/    # Auth schema
│   │   ├── utils/     # API utilities
│   │   └── ...        # Other Next.js app files
│   ├── components/    # Shared React components
│   ├── lib/           # Utility functions
│   ├── public/        # Static assets
│   ├── package.json   # Frontend dependencies and scripts
│   └── next.config.mjs# Next.js configuration
│
├── package.json       # Root package.json (optional, for monorepo setups)
└── README.md          # Project documentation
```

## Backend
- **Framework:** Node.js with Express
- **Features:**
  - User authentication (JWT-based)
  - Task CRUD operations
  - Mongoose models for User and Task
  - Modular route and controller structure
- **Key Files:**
  - `server.js`: Main server entry point
  - `controllers/`: Business logic for tasks
  - `middleware/auth.js`: Authentication middleware
  - `models/`: Mongoose schemas for User and Task
  - `routes/`: API endpoints for authentication and tasks

## Frontend (UI)
- **Framework:** Next.js (React)
- **Features:**
  - User registration and login
  - Dashboard for managing tasks
  - Modular and reusable components (e.g., TaskCard, TaskForm, Navbar)
  - API utilities for backend communication
  - Modern UI with custom components and styles
- **Key Files:**
  - `app/`: Next.js app directory (pages, layouts, etc.)
  - `components/`: Shared UI components
  - `lib/utils.js`: Utility functions
  - `public/`: Static assets (SVGs, images)

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn
- MongoDB (local or cloud instance)

### Backend Setup
1. Navigate to the backend folder:
   ```sh
   cd Backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Configure environment variables (e.g., MongoDB URI, JWT secret) in a `.env` file.
4. Start the backend server:
   ```sh
   npm start
   ```

### Frontend (UI) Setup
1. Navigate to the UI folder:
   ```sh
   cd ui
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the Next.js development server:
   ```sh
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

### Backend
- `npm start` — Starts the Express server
- `npm run dev` — (If configured) Starts the server with nodemon for development

### Frontend (UI)
- `npm run dev` — Starts the Next.js development server
- `npm run build` — Builds the Next.js app for production
- `npm start` — Starts the Next.js production server

## License

This project is for educational and assignment purposes.
