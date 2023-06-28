import { PrismaTasksRepository } from '../../repositories/prisma-repository/prisma-tasks-repository'
import { EditTaskUseCase } from '../edit-task-use-case'

export function makeEditTask() {
  const repository = new PrismaTasksRepository()
  const editTask = new EditTaskUseCase(repository)
  return editTask
}
