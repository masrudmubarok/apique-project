# Task Flow API Project

## Project Summary

This project implements a RESTful API for managing tasks.

### Key Features:
- **RESTful API**: Standard CRUD endpoints for tasks.
- **Filtering**: Flexible filtering when retrieving tasks.

## Setup

### Requirements
- PHP >= 8.1 (Minimum recommended version)
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

### Configure .env
Adjust database configurations in the `.env` file:
- `DB_HOST`: The database host (e.g., localhost).
- `DB_DATABASE`: The name of the database (e.g., task_flow_db).
- `DB_USERNAME`: The database username.
- `DB_PASSWORD`: The database password.

Customize other configurations as needed, such as the application URL (`APP_URL`) and debugging settings (`APP_DEBUG`).

### Generate Application Key
```bash
php artisan key:generate
```

### Run Database Migrations and Seeders
```bash
php artisan migrate:fresh --seed
```
This command will:
- Drop all existing tables in the database.
- Run all database migrations.
- Execute defined database seeders to populate initial data.

### Start the Development Server
```bash
php artisan serve
```
The application will be accessible at [http://localhost:8000](http://localhost:8000) by default.

## API Documentation

### Tasks

#### List Tasks
**GET** `/api/tasks`

Retrieves a list of tasks with optional filtering.

**Query Parameters**:
- `title` (string): Filter tasks by title (e.g., `/api/tasks?title=My Task`).
- `status` (string): Filter tasks by status (e.g., `pending`, `completed`).
- `sort_by` (string): Sort by field (`id`, `title`, `status`, `created_at`, `updated_at`).
- `sort_order` (string): Sort order (`asc` or `desc`).
- `page` (integer): Pagination page number.
- `per_page` (integer): Results per page (default is 15).

**Response**:
```json
[
    {
        "id": 1,
        "title": "Task 1",
        "status": "pending",
        "created_at": "2024-07-24T10:00:00.000000Z",
        "updated_at": "2024-07-24T12:30:00.000000Z"
    },
    {
        "id": 2,
        "title": "Task 2",
        "status": "completed",
        "created_at": "2024-07-24T11:00:00.000000Z",
        "updated_at": "2024-07-24T13:45:00.000000Z"
    }
]
```

#### Task Detail
**GET** `/api/tasks/{id}`

Retrieves a single task by its ID.

**Response**:
```json
{
    "id": 1,
    "title": "Task 1",
    "status": "pending",
    "created_at": "2024-07-24T10:00:00.000000Z",
    "updated_at": "2024-07-24T12:30:00.000000Z"
}
```

Returns 404 if task is not found.

#### Create Task
**POST** `/api/tasks`

**Request Body**:
```json
{
    "title": "Task name"
}
```

Returns the created task with status 201.

**Response**:
```json
{
    "id": 3,
    "title": "Task name",
    "status": "pending",
    "created_at": "2024-07-24T14:00:00.000000Z",
    "updated_at": "2024-07-24T14:00:00.000000Z"
}
```

Returns 422 if title is missing or invalid.

#### Update Task
**PUT/PATCH** `/api/tasks/{id}`

**Request Body**:
```json
{
    "title": "New task name",
    "status": "completed"
}
```

**Response**:
```json
{
    "id": 1,
    "title": "New task name",
    "status": "completed",
    "created_at": "2024-07-24T10:00:00.000000Z",
    "updated_at": "2024-07-24T14:15:00.000000Z"
}
```

Returns 404 if task not found. Returns 422 for invalid data.

#### Delete Task
**DELETE** `/api/tasks/{id}`

**Response**:
```json
{
    "message": "Task deleted successfully"
}
```

Returns 404 if task not found.

## Notes
- Ensure Laravel server is running when testing the API.
- Adjust `.env` as needed for your environment.
- Documentation may be updated to reflect future API changes.