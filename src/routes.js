import { Database } from "./database.js";
import { randomUUID } from 'node:crypto';
import { buildRoutePath } from "./utils/build-route-path.js";

const database = new Database();

export const routes = [
    {
        method: 'GET',
        path: buildRoutePath('/tasks'),
        handler: (req, res) => {
            return res.end(JSON.stringify(database.select('tasks')));
        }
    },
    {
        method: 'POST',
        path: buildRoutePath('/tasks'),
        handler: (req, res) => {
            const { title, description } = req.body;

            if (!title || !description) {
                return res.writeHead(404).end('The title and description are mandatory and must be valid!');
            }

            const task = {
                id: randomUUID(),
                title,
                description,
                created_at: new Date(),
                updated_at: null,
                completed_at: null
            }

            database.insert('tasks', task);

            return res.writeHead(201).end(JSON.stringify(task));
        }
    },
    {
        method: 'DELETE',
        path: buildRoutePath('/tasks/:id'),
        handler: (req, res) => {
            const { id } = req.params;
            return database.delete('tasks', id) ? res.writeHead(204).end() : res.writeHead(404).end('Task not found.');
        }
    },
    {
        method: 'PUT',
        path: buildRoutePath('/tasks/:id'),
        handler: (req, res) => {
            const { id } = req.params;
            const { title, description } = req.body;

            if (!title || !description) {
                return res.writeHead(404).end('The title and description are mandatory and must be valid!');
            }
            const task = database.update('tasks', id, { title, description });
            return task ? res.writeHead(204).end(JSON.stringify(task)) : res.writeHead(404).end('Task not found.');
        }
    },
    {
        method: 'PATCH',
        path: buildRoutePath('/tasks/:id/complete'),
        handler: (req, res) => {
            const { id } = req.params;
            const task = database.update('tasks', id, { completed_at: new Date() });
            return task ? res.writeHead(200).end(JSON.stringify(task)) : res.writeHead(404).end('Task not found.');
        }
    },
]