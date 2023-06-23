import { PrismaTasksRepository } from '../../repository/prisma-repository/prisma-tasks-repository'
import { ListTaskUseCase } from '../list-task-use-case'

export function makeListTask() {
  const repository = new PrismaTasksRepository()
  const listTask = new ListTaskUseCase(repository)
  return listTask
}
