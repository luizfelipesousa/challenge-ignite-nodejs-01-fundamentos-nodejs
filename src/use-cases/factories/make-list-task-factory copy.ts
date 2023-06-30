import { PrismaTasksRepository } from '../../repositories/prisma-repository/prisma-tasks-repository'
import { SearchTaskUseCase } from '../search-task-use-case'

export function makeSearchTask() {
  const repository = new PrismaTasksRepository()
  const listTask = new SearchTaskUseCase(repository)
  return listTask
}
