import {Prisma} from '@prisma/client'
import { Task } from '../model/task'

export interface TasksRepository {
    create(task:Prisma.TasksUncheckedCreateInput): Promise<Task>
    delete(task: Task): Promise<void>
    update(task: Task): Promise<Task>
    getById(taskId: string): Promise<Task | null>
    getAllTasks(): Promise<Task[]>
}