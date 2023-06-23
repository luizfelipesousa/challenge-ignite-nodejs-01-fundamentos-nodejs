import { PrismaTasksRepository } from '../../repository/prisma-repository/prisma-tasks-repository'
import { GetTaskDetailsUseCase } from '../get-task-details-use-case'

export function makeGetTasksDetails() {
  const repository = new PrismaTasksRepository()
  const getTaskDetails = new GetTaskDetailsUseCase(repository)
  return getTaskDetails
}
