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

- Node.js (version X.X.X)
- npm (version X.X.X)

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/luizfelipesousa/challenge-ignite-nodejs-01-fundamentos-nodejs.git
   ```

2. Install dependencies:

   ```bash
   cd task-management-api
   npm install
   ```

3. Run database migrations:

   ```bash
   npx prisma migrate dev --name init
   ```

4. Start the server:

   ```bash
   npm run build
   ```
   ```bash
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
  "id": 1,
  "title": "Task title",
  "description": "Task description",
  "dueDate": "2023-05-25",
  "createdAt": "2023-05-20T10:00:00.000Z",
  "updatedAt": "2023-05-20T10:00:00.000Z"
}
```

### `GET /tasks`

Get a list of all tasks.

**Response:**

```json
[
  {
    "id": 1,
    "title": "Task title",
    "description": "Task description",
    "dueDate": "2023-05-25",
    "createdAt": "2023-05-20T10:00:00.000Z",
    "updatedAt": "2023-05-20T10:00:00.000Z"
  },
  {
    "id": 2,
    "title": "Another task",
    "description": "Another task description",
    "dueDate": "2023-05-26",
    "createdAt": "2023-05-20T11:00:00.000Z",
    "updatedAt": "2023-05-20T11:00:00.000Z"
  }
]
```

### `GET /tasks/:id`

Get a specific task by ID.

**Response:**

```json
{
  "id": 1,
  "title": "Task title",
  "description": "Task description",
  "dueDate": "2023-05-25",
  "createdAt": "2023-05-20T10:00:00.000Z",
  "updatedAt": "2023-05-20T10:00:00.000Z"
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
  "id": 1,
  "title": "Edited task title",
  "description": "Edited task description",
  "dueDate": "2023-05-27",
  "createdAt": "2023-05-20T10:00:00.000Z",
  "updatedAt": "2023-05-20T12:00:00.000Z"
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

## License

This project is licensed under the [MIT License](LICENSE).

---

Feel free to customize the README file according to your project's specific details and requirements.