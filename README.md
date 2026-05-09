# Authentication Flow Project

## Overview

This project is a full-stack authentication and task management application. It includes:
- User registration and login with JWT-based authentication
- Protected user and admin routes
- Task creation, update, deletion, and retrieval
- Redis caching for faster authenticated user validation

## Tech Stack

### Frontend
- React with Vite
- Zustand for state management
- Axios for API calls
- Environment variables for backend URL

### Backend
- Node.js and Express
- MongoDB with Mongoose
- JWT for authentication
- Redis for caching user session and lookup
- Zod for request validation

## Frontend Functionality

- Signup page to create a new user
- Login page to authenticate and save cookies
- Profile access (`/auth/me`) for logged-in users
- Admin access check (`/auth/admin`)
- Task management pages:
  - create task
  - update task
  - list user tasks
  - delete user task
  - admin task list and delete task

## Backend Functionality

- User registration and login routes
- JWT access tokens stored in cookies
- Protected `isAuth` middleware to verify JWT
- `isAdmin` middleware to restrict admin-only routes
- Task CRUD APIs with user ownership checks
- Redis caching to speed up user verification and reduce DB load

## API Summary

### Auth APIs
- `POST /api/v1/auth/signup` - register a new user
- `POST /api/v1/auth/login` - login and set auth cookie
- `GET /api/v1/auth/me` - return current user profile
- `GET /api/v1/auth/admin` - check admin access
- `POST /api/v1/auth/logout` - logout user and clear cookie

### Task APIs
- `POST /api/v1/task/create` - create a task for authenticated user
- `PATCH /api/v1/task/update` - update a user-owned task
- `GET /api/v1/task/my-tasks` - get tasks for current user
- `DELETE /api/v1/task/delete` - delete a user-owned task
- `GET /api/v1/task/all-tasks` - admin only: get all tasks
- `DELETE /api/v1/task/admin-delete` - admin only: delete any task

## Redis Caching

Redis is used as a cache layer for authenticated user data. When a request is authenticated:
- the user object is saved in Redis with a short TTL
- subsequent requests load the user from Redis instead of querying MongoDB
- this improves performance and reduces database load

## JWT Authentication

- JWT tokens are generated on login
- tokens are stored in a secure cookie named `accessToken`
- backend middleware checks token validity on protected routes
- invalid or expired tokens are rejected with `401 Unauthorized`

## User Flow

### Signup
- User sends `name`, `email`, `password`
- backend validates input and creates a hashed password
- user is saved in MongoDB

### Login
- User sends `email` and `password`
- backend verifies credentials
- JWT token is created and sent in a cookie
- frontend can access protected routes using the auth cookie

### Task Management
- Authenticated users can create, update, delete, and list their tasks
- Admin users can view all tasks and delete any task
- Tasks are stored in MongoDB and linked to user IDs

## Initialize and Run

### Backend
1. Open terminal in `backend/`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create or update `.env` with values like:
   ```env
   PORT=5001
   MONGO_URI=your_mongodb_uri
   REDIS_URL=your_redis_url
   FRONTEND_URL=http://localhost:5173
   JWT_SECRET=your_jwt_secret
   JWT_ACCESS_SECRET=your_jwt_access_secret
   JWT_REFRESH_SECRET=your_jwt_refresh_secret
   ```
4. Start backend:
   ```bash
   npm run dev
   ```

### Frontend
1. Open terminal in `frontend/`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create or update `.env` with:
   ```env
   VITE_BACKEND_URL=http://localhost:5001/api/v1
   ```
4. Start frontend:
   ```bash
   npm run dev
   ```

### Admin User Setup
- Admin user creation is typically done through a backend script and not a public API.
- Run the admin creation script from the backend if available:
  ```bash
  node ./utils/adminUserGenerate.js
  ```

## Notes

- Make sure the frontend and backend environment URLs match.
- Use Postman or browser dev tools to verify cookies and API calls.
- Protect the admin credentials and do not expose admin creation in public APIs.
