# Task Management API

This is a RESTful API for creating and managing tasks. It is built using Node.js, TypeScript, Fastify, Zod, and Prisma.

## Features

- Create a new task
- Get a list of all tasks
- Get a specific task by ID
- Update a task
- Delete a task
- Complete a task

## Prerequisites

- Node.js (version 18.15.0)
- npm (version 9.5.0)

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/luizfelipesousa/task-management-api.git
   ```

2. Install dependencies:

   ```bash
   cd task-management-api
   npm install
   ```

3. Set up the database:

   - Rename the `.env.example` file to `.env` and update the database connection URL.

4. Run database migrations:

   ```bash
   npx prisma migrate dev --name init
   ```

5. Start the server:

   ```bash
   npm run build
   npm run start
   ```

6. The API is now running at `http://localhost:3333`. You can send HTTP requests to the endpoints listed below.

## API Endpoints

### `POST /tasks`

Create a new task.

**Request Body:**

```json
{
  "title": "Task title",
  "description": "Task description",
  "dueDate": "2023-05-25"
}
```

**Response:**

```json
{
    "id": "11ffb6ec-0519-491b-85df-abf1db2d52c3",
    "title": "Task title",
    "description": "Task description",
    "dueDate": "2023-05-25T00:00:00.000Z",
    "createdAt": "2023-06-23T16:49:45.035Z",
    "updatedAt": null,
    "completedAt": null
}
```

### `GET /tasks`

Get a list of all tasks.

**Response:**

```json
[
  {
    "id": "42fcec01-4ca5-4629-aea9-5c23ae084077",
    "title": "Task title",
    "description": "Task description",
    "dueDate": "2023-05-25",
    "createdAt": "2023-05-20T10:00:00.000Z",
    "updatedAt": null,
    "completedAt": null
  },
  {
    "id": "a5d3a312-bf84-432f-9d20-cc4b1edda94c",
    "title": "Another task",
    "description": "Another task description",
    "dueDate": "2023-05-26",
    "createdAt": "2023-05-20T11:00:00.000Z",
    "updatedAt": null,
    "completedAt": null
  }
]
```

### `GET /tasks/:id`

Get a specific task by ID.

**Response:**

```json
{
  "id": "42fcec01-4ca5-4629-aea9-5c23ae084077",
  "title": "Task title",
  "description": "Task description",
  "dueDate": "2023-05-25",
  "createdAt": "2023-05-20T10:00:00.000Z",
  "updatedAt": null,
  "completedAt": null
}
```

### `PUT /tasks/:id`

Edit a task.

**Request Body:**

```json
{
  "title": "Edited task title",
  "description": "Edited task description",
  "dueDate": "2023-05-27"
}
```

**Response:**

```json
{
  "id": "42fcec01-4ca5-4629-aea9-5c23ae084077",
  "title": "Edited task title",
  "description": "Edited task description",
  "dueDate": "2023-05-27",
  "createdAt": "2023-05-20T10:00:00.000Z",
  "updatedAt": "2023-05-20T12:00:00.000Z",
  "completedAt": null
}
```

### `DELETE /tasks/:id`

Delete a task.

**Response:**

```json
{
  "message": "Task deleted successfully"
}
```

### `PATCH /tasks/:id/complete`

Complete a task.

**Response:**

```json
{
  "message": "Task completed successfully"
}
```

## License

This project is licensed under the [MIT License](LICENSE).

---

Feel free to customize the README file according to your project's specific details and requirements.
