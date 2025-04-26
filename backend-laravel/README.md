# Task Management API

## Project Summary
This project implements a RESTful API for managing tasks.

### Key Features:
- **RESTful API**: Standard CRUD endpoints for tasks.
- **Filtering**: Flexible filtering when retrieving tasks.

---

## Setup

### Requirements
- PHP >= 8.1 *(Minimum recommended)*
- Composer 2.7.1
- MySQL >= 8.0

### Clone the Project
```bash
git clone https://github.com/masrudmubarok/apique-project.git
cd apique-project/backend-laravel
```

### Install Composer Dependencies
```bash
composer install
```

### Copy the .env File
```bash
cp .env.example .env
```

### Configure `.env`
Adjust database configurations:
- `DB_HOST`: The database host (e.g., `localhost`)
- `DB_DATABASE`: The name of your DB (e.g., `apique-project`)
- `DB_USERNAME`: Your DB username
- `DB_PASSWORD`: Your DB password

### Create Database
Before running migrations, make sure you have created a database named `apique-task` in your MySQL server.

You can create it manually via your database management tool (e.g., phpMyAdmin, TablePlus) or by running the following SQL command:
```sql
CREATE DATABASE apique-task;
```

### Run Database Migrations and Seeders
After the database is ready, run the following command to migrate and seed the database:
```bash
php artisan migrate:fresh --seed
```
This will:
- Drop all existing tables
- Run all migrations
- Seed the DB with initial data

### Start the Development Server
```bash
php artisan serve
```
Default URL: [http://localhost:8000](http://localhost:8000)

---

## API Documentation

### 📋 List Tasks
**GET** `/api/tasks`

Retrieves a list of tasks with optional filtering.

#### Query Parameters (optional) :
- `status` (string): Filter by status (e.g., `Pending`, `Done`)
- `created_at` (date): Filter by date

#### Response:
```json
{
    "success": true,
    "message": "Tasks retrieved successfully",
    "data": [
        {
            "id": 1,
            "title": "Learn Laravel",
            "status": "Done",
            "created_at": "2025-04-25T12:56:14.000000Z",
            "updated_at": "2025-04-25T12:56:14.000000Z"
        },
        {
            "id": 2,
            "title": "Create Backend API",
            "status": "Pending",
            "created_at": "2025-04-25T12:56:14.000000Z",
            "updated_at": "2025-04-25T12:56:14.000000Z"
        }
    ]
}
```

---

### 📄 Task Detail
**GET** `/api/tasks/{id}`

Retrieve a task by ID.

#### Path Parameter:
- `id` (int): Task ID

#### Response:
```json
{
    "success": true,
    "message": "Task retrieved successfully",
    "data": {
        "id": 1,
        "title": "Learn Laravel",
        "status": "Done",
        "created_at": "2025-04-25T12:56:14.000000Z",
        "updated_at": "2025-04-25T12:56:14.000000Z"
    }
}
```
If task is not found, return `404 Not Found`.

---

### ➕ Create Task
**POST** `/api/tasks`

Create a new task.

#### Request Body:
```json
{
    "title": "Task name"
}
```

#### Parameters:
- `title` (string, required)

#### Response:
```json
{
    "success": true,
    "message": "Task created successfully",
    "data": {
        "id": 3,
        "title": "Task name",
        "status": "Pending",
        "created_at": "2025-04-25T14:00:00.000000Z",
        "updated_at": "2025-04-25T14:00:00.000000Z"
    }
}
```
Missing/invalid title returns `422 Unprocessable Entity`.

---

### 📝 Update Task
**PUT** `/api/tasks/{id}`

Update an existing task (PUT for full update, PATCH also supported).

#### Path Parameter:
- `id` (int): Task ID

#### Request Body:
```json
{
    "title": "New task name",
    "status": "Done"
}
```

#### Response:
```json
{
    "success": true,
    "message": "Task updated successfully",
    "data": {
        "id": 1,
        "title": "New task name",
        "status": "Done",
        "created_at": "2024-07-24T10:00:00.000000Z",
        "updated_at": "2024-07-24T14:15:00.000000Z"
    }
}
```
Invalid input returns `422`, missing task returns `404`.

---

### 📝 Update Task Status
**PUT** `/api/tasks/{id}/status`

Update an existing task status (PATCH task status).

#### Path Parameter:
- `id` (int): Task ID

#### Request Body:
```json
{
    "status": "Done"
}
```

#### Response:
```json
{
    "success": true,
    "message": "Task status updated successfully",
    "data": {
        "id": 1,
        "title": "New task name",
        "status": "Done",
        "created_at": "2024-07-24T10:00:00.000000Z",
        "updated_at": "2024-07-24T14:15:00.000000Z"
    }
}
```
Invalid input returns `422`, missing task returns `404`.

---

### ❌ Delete Task
**DELETE** `/api/tasks/{id}`

Deletes a task.

#### Path Parameter:
- `id` (int): Task ID

#### Response:
```json
{
    "success": true,
    "message": "Task deleted successfully"
}
```
Task not found returns `404 Not Found`.

---

## Notes
- Ensure Laravel server is running during API usage.
- Adjust `.env` settings as needed.
- This doc may be updated as the API evolves.