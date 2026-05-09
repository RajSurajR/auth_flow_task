# API Documentation

## Base URL

Use the following base URL for all requests:

```text
http://localhost:5000/api/v1
```

If your backend port is `5001`, use:

```text
http://localhost:5001/api/v1
```

---

## Response Format

Successful response example:

```json
{
  "success": true,
  "message": "...",
  "data": { ... },
  "meta": null,
  "error": null
}
```

Error response example:

```json
{
  "success": false,
  "message": "...",
  "data": null,
  "error": {
    "code": "..."
  }
}
```

---

## Authentication APIs

### 1. Signup

- Endpoint: `POST /auth/signup`
- Description: Register a new user
- Headers:
  - `Content-Type: application/json`
- Body:
  ```json
  {
    "name": "User Name",
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- Returns:
  - `success: true`
  - `message: "User registered successfully. Now you can login"`
  - `data: null`
- Status codes:
  - `201 Created` on success
  - `400 Bad Request` when required fields are missing or email already exists
  - `500 Internal Server Error` on unexpected failure

---

### 2. Login

- Endpoint: `POST /auth/login`
- Description: Login an existing user and issue the auth cookie
- Headers:
  - `Content-Type: application/json`
- Body:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- Returns:
  - `success: true`
  - `message: "Login successful"` (or similar)
  - `data.user` object containing user details
  - Sets `accessToken` cookie in the response
- Status codes:
  - `200 OK` on success
  - `400 Bad Request` when credentials are invalid or missing
  - `401 Unauthorized` when login fails
  - `500 Internal Server Error` on unexpected failure

---

### 3. Get Current User

- Endpoint: `GET /auth/me`
- Description: Get the profile of the currently authenticated user
- Headers:
  - Cookie must include `accessToken`
- Returns:
  - `success: true`
  - `message: "User profile fetched successfully"`
  - `data.user` object
- Status codes:
  - `200 OK` on success
  - `401 Unauthorized` if no token or token is invalid
  - `404 Not Found` if the user cannot be found

---

### 4. Admin Check

- Endpoint: `GET /auth/admin`
- Description: Verify that the authenticated user is an admin
- Headers:
  - Cookie must include `accessToken`
- Returns:
  - `success: true`
  - `message: "Hello admin"`
  - `data: null`
- Status codes:
  - `200 OK` on success
  - `401 Unauthorized` if not authenticated
  - `403 Forbidden` if authenticated but not admin

---

### 5. Logout

- Endpoint: `POST /auth/logout`
- Description: Logout the user by clearing the auth cookie and revoking token data
- Headers:
  - Cookie must include `accessToken`
- Returns:
  - `success: true`
  - `message: "Logged out successfully"`
  - `data: null`
- Status codes:
  - `200 OK` on success
  - `401 Unauthorized` if not authenticated

---

## Task APIs

### 6. Create Task

- Endpoint: `POST /task/create`
- Description: Create a new task for the authenticated user
- Headers:
  - `Content-Type: application/json`
  - Cookie must include `accessToken`
- Body:
  ```json
  {
    "title": "Task title",
    "description": "Task description"
  }
  ```
- Returns:
  - `success: true`
  - `message: "Task created successfully"`
  - `data.task` object
- Status codes:
  - `201 Created` on success
  - `400 Bad Request` when title or description is missing
  - `401 Unauthorized` if not authenticated

---

### 7. Update Task

- Endpoint: `PATCH /task/update`
- Description: Update an existing task owned by the authenticated user
- Headers:
  - `Content-Type: application/json`
  - Cookie must include `accessToken`
- Body:
  ```json
  {
    "taskId": "taskObjectId",
    "title": "Updated title",
    "description": "Updated description"
  }
  ```
- Returns:
  - `success: true`
  - `message: "Task updated successfully"`
  - `data.task` object
- Status codes:
  - `200 OK` on success
  - `400 Bad Request` when required fields are missing
  - `401 Unauthorized` if not authenticated
  - `404 Not Found` if task not found or not owned by the user

---

### 8. Get My Tasks

- Endpoint: `GET /task/my-tasks`
- Description: Retrieve all tasks for the authenticated user
- Headers:
  - Cookie must include `accessToken`
- Returns:
  - `success: true`
  - `message: "Tasks retrieved successfully"`
  - `data.tasks` array
- Status codes:
  - `200 OK` on success
  - `401 Unauthorized` if not authenticated

---

### 9. Delete User Task

- Endpoint: `DELETE /task/delete`
- Description: Delete a task owned by the authenticated user
- Headers:
  - `Content-Type: application/json`
  - Cookie must include `accessToken`
- Body:
  ```json
  {
    "taskId": "taskObjectId"
  }
  ```
- Returns:
  - `success: true`
  - `message: "Task deleted successfully"`
  - `data.task` object
- Status codes:
  - `200 OK` on success
  - `400 Bad Request` when taskId is missing
  - `401 Unauthorized` if not authenticated
  - `404 Not Found` if task not found or not owned by the user

---

### 10. Get All Tasks (Admin Only)

- Endpoint: `GET /task/all-tasks`
- Description: Retrieve all tasks in the system (admin only)
- Headers:
  - Cookie must include `accessToken`
  - User must be admin
- Returns:
  - `success: true`
  - `message: "All tasks retrieved successfully"`
  - `data.tasks` array
- Status codes:
  - `200 OK` on success
  - `401 Unauthorized` if not authenticated
  - `403 Forbidden` if authenticated but not admin

---

### 11. Delete Task as Admin

- Endpoint: `DELETE /task/admin-delete`
- Description: Delete any task by ID (admin only)
- Headers:
  - `Content-Type: application/json`
  - Cookie must include `accessToken`
  - User must be admin
- Body:
  ```json
  {
    "taskId": "taskObjectId"
  }
  ```
- Returns:
  - `success: true`
  - `message: "Task deleted successfully"`
  - `data.task` object
- Status codes:
  - `200 OK` on success
  - `400 Bad Request` when taskId is missing
  - `401 Unauthorized` if not authenticated
  - `403 Forbidden` if not admin
  - `404 Not Found` if task not found

---

## Notes

- All protected routes require the `accessToken` cookie returned by login.
- Use `{{baseUrl}}` in API clients like Postman when you define an environment variable.
- If your backend is running on port `5001`, use `http://localhost:5001/api/v1` as the base URL.
- The admin-only routes must be accessed by users with `role: "admin"`.

---

## Admin User Creation

- Description: Admin users are created manually through a backend script, not through a public API.
- Reason:
  - Admin accounts are sensitive and should not be exposed to public signup.
  - A public admin creation API would allow anyone to create elevated users.
  - Admin credentials should be created securely only by developers or system administrators.
- How to create:
  - Run the backend script directly from the terminal:
    ```bash
    node ./utils/adminUserGenerate.js
    ```
  - This script connects to the database, checks for an existing admin, and creates one if needed.
  - It typically seeds a default admin user with a secure hashed password.
- What to do after creation:
  - Use the created admin email and password to log in via `POST /auth/login`.
  - Change the password immediately after first login if the script uses a default value.

---

## Why no public admin API?

- Admin creation is a privileged operation that should not be available to regular users.
- Exposing admin creation through an API can lead to unauthorized privilege escalation.
- Keeping admin creation out of public routes helps protect your system from abuse.
- Use a secure backend script or protected deployment tool to assign admin roles.
