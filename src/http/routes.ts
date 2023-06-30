import { FastifyInstance } from 'fastify'
import { getTaskController } from './controllers/get-task-details-controller'
import { createTaskController } from './controllers/create-task-controller'
import { deleteTaskController } from './controllers/delete-task-controller'
import { editTaskController } from './controllers/edit-task-controller'
import { getListTasksController } from './controllers/get-list-task-controller'
import { completeTaskController } from './controllers/complete-task-controller'
import { searchTaskController } from './controllers/search-task-controller'

export async function taskRoutes(app: FastifyInstance) {
  app.get('/tasks', getListTasksController)
  app.get('/tasks/search', searchTaskController)
  app.get('/tasks/:id', getTaskController)
  app.post('/tasks', createTaskController)
  app.put('/tasks/:id', editTaskController)
  app.patch('/tasks/:id/complete', completeTaskController)
  app.delete('/tasks/:id', deleteTaskController)
}
