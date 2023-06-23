import {Prisma, Tasks} from '@prisma/client'

export interface TasksRepository {
    create(task:Prisma.TasksUncheckedCreateInput): Promise<void>
    delete(task: Tasks): Promise<void>
    update(task: Tasks): Promise<void>
    getById(taskId: string): Promise<Tasks | null>
    getAllTasks(): Promise<Tasks[]>
}