import { Prisma } from '@prisma/client'
import { TasksRepository } from '../task-repository'
import { Task } from '../../model/task'
import { prisma } from '../../lib/prisma'

export interface SearchCriteria {
  page: number | undefined
}

export class PrismaTasksRepository implements TasksRepository {
  async create(task: Prisma.TasksUncheckedCreateInput): Promise<Task> {
    const createdTask = await prisma.tasks.create({ data: { ...task } })
    return new Task(createdTask)
  }

  async delete(task: Task): Promise<void> {
    await prisma.tasks.delete({
      where: {
        id: task.id,
      },
    })
  }

  async update({
    id,
    title,
    description,
    completedAt,
    updatedAt,
  }: Task): Promise<Task> {
    const updatedTask = await prisma.tasks.update({
      where: {
        id,
      },
      data: {
        title,
        description,
        completed_at: completedAt,
        updated_at: updatedAt,
      },
    })

    return new Task(updatedTask)
  }

  async getById(taskId: string): Promise<Task | null> {
    const task = await prisma.tasks.findFirst({
      where: {
        id: taskId,
      },
    })

    const result = task ? new Task(task) : null
    return result
  }

  async getAllTasks({ page }: SearchCriteria): Promise<Task[]> {
    const pageNumber = page ?? 1
    const tasks = await prisma.tasks.findMany({
      take: 20,
      skip: (pageNumber - 1) * 20,
    })
    const tasksList = tasks.map((t) => new Task(t))
    return tasksList
  }
}
