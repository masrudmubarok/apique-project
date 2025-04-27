# Task Management Web App (Next.js)

## Project Summary
This project is a web-based task management application built using Next.js. It serves as the frontend for interacting with the Task API, allowing users to create, view, update, and delete tasks. The app provides a clean and responsive interface for managing daily activities efficiently.

### Key Features:
- **Task Listing**: View all tasks in a user-friendly format, with support for filtering by status and date.
- **Add & Edit Tasks**: Create new tasks and update existing ones with ease.
- **Responsive UI**: Fully responsive design that works well on desktops, tablets, and mobile devices.
- **API Integration**: Connects seamlessly with a Laravel-powered RESTful API backend.

---

## Setup

### Requirements
- **Node.js** v22.14.0
- **NPM** v11.3.0
- **Next.js** v15

### Clone the Project
```bash
git clone https://github.com/masrudmubarok/apique-project.git
cd apique-project/frontend-next

```

### Install Node Modules
```bash
npm install
```

### Start the Development Server
```bash
npm run dev
```
Default URL: [http://localhost:3000](http://localhost:3000)

---

## Notes
- Environment: Make sure your Laravel API is running on `http://localhost:8000` (default) or adjust the base URL in utils/api.ts.
- By default, tasks are fetched, filtered by today’s date, and sorted ascending by ID.
- Date Filtering: The date picker uses client-side filtering by creation date in `TaskList.tsx`.
