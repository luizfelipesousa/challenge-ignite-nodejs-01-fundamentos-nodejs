import { Task } from '../../model/task'
import { SearchCriteria } from '../prisma-repository/prisma-tasks-repository'
import { TasksRepository } from '../task-repository'

const tasks: Task[] = []
export class InMemoryTaskRepository implements TasksRepository {
  async getById(taskId: string): Promise<Task | null> {
    const taskIndex = tasks.findIndex((t) => taskId === t.id)
    return tasks[taskIndex]
  }

  async getAllTasks({ page }: SearchCriteria): Promise<Task[]> {
    const pageNumber = page ?? 1
    return tasks.splice((pageNumber - 1) * 20, pageNumber * 20)
  }

  async create(task: Task): Promise<Task> {
    tasks.push(task)
    return task
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
}
