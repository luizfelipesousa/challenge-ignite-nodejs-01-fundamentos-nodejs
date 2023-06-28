import { PrismaTasksRepository } from '../../repositories/prisma-repository/prisma-tasks-repository'
import { DeleteTaskUseCase } from '../delete-task-use-case'

export function makeDeleteTask() {
  const repository = new PrismaTasksRepository()
  const deleteTask = new DeleteTaskUseCase(repository)
  return deleteTask
}
