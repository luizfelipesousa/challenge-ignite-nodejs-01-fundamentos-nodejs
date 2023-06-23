import { PrismaTasksRepository } from '../../repository/prisma-repository/prisma-tasks-repository'
import { CompleteTaskUseCase } from '../complete-task-use-case'

export function makeCompleteTask() {
  const repository = new PrismaTasksRepository()
  const completeTask = new CompleteTaskUseCase(repository)
  return completeTask
}
