import { randomUUID } from 'crypto'
import { Task } from '../../model/task'
import { SearchCriteria } from '../prisma-repository/prisma-tasks-repository'
import { TasksRepository } from '../task-repository'
import dayjs from 'dayjs'

const tasks: Task[] = []
export class InMemoryTaskRepository implements TasksRepository {
  async getById(taskId: string): Promise<Task | null> {
    const taskIndex = tasks.findIndex((t) => taskId === t.id)
    return tasks[taskIndex] ?? null
  }

  async getAllTasks({ page }: SearchCriteria): Promise<Task[]> {
    const pageNumber = page ?? 1
    return tasks.splice((pageNumber - 1) * 20, pageNumber * 20)
  }

  async create(task: Task): Promise<Task> {
    const createdTask = { ...task, id: task.id ?? randomUUID() }
    tasks.push(createdTask)
    return createdTask
  }

  async delete(task: Task): Promise<void> {
    const taskIndex = tasks.findIndex((t) => t.id === task.id)
    tasks.splice(taskIndex, 1)
  }

  async update(task: Task): Promise<Task> {
    const taskIndex = tasks.findIndex((t) => task.id === t.id)
    tasks[taskIndex] = { ...task }
    return tasks[taskIndex]
  }

  async get(taskId: string): Promise<any[]> {
    if (!taskId) {
      return tasks
    }

    const task = tasks.find((task) => task.id === taskId)
    return [task] ?? []
  }

  async getFilteredTasks({
    page,
    dueDate,
    isCompleted,
    q,
  }: SearchCriteria): Promise<Task[]> {
    let filteredTasks = tasks

    if (q) {
      filteredTasks = filteredTasks.filter(
        (t) => t.title.includes(q) || t.description?.includes(q),
      )
    }

    if (dueDate) {
      filteredTasks = filteredTasks.filter((t) =>
        dayjs(t.dueDate).isSame(dueDate, 'date'),
      )
    }
    if (isCompleted) {
      filteredTasks = filteredTasks.filter((t) => t.completedAt !== null)
    }

    const pageNumber = page ?? 1
    return filteredTasks.splice((pageNumber - 1) * 20, pageNumber * 20)
  }
}
