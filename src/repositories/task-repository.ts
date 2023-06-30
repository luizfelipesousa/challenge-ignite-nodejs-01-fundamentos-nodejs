import { Prisma } from '@prisma/client'
import { Task } from '../model/task'
import { SearchCriteria } from './prisma-repository/prisma-tasks-repository'

export interface TasksRepository {
  create(task: Prisma.TasksUncheckedCreateInput): Promise<Task>
  delete(task: Task): Promise<void>
  update(task: Task): Promise<Task>
  getById(taskId: string): Promise<Task | null>
  getAllTasks({ page }: SearchCriteria): Promise<Task[]>
  getFilteredTasks({
    page,
    dueDate,
    isCompleted,
    q,
  }: SearchCriteria): Promise<Task[]>
}
