import { prisma } from "../../lib/prisma";
import {Prisma, Tasks} from '@prisma/client'
import { TasksRepository } from "../task-repository";
import { randomUUID } from "node:crypto";

export class PrismaTasksRepository implements TasksRepository{
    
    async create(task: Prisma.TasksUncheckedCreateInput): Promise<void> {
        await prisma.tasks.create({data: {...task}})
    }
    async delete(task: Tasks): Promise<void> {
        await prisma.tasks.delete({where:{
            id: task.id
        }})
    }
    async update({id, title, description, completed_at, updated_at}: Tasks): Promise<void> {
        await prisma.tasks.update({where: {
            id
        }, data: {
            title, description, completed_at, updated_at
        }})
    }
    async getById(taskId: string): Promise<Tasks | null> {
        const task = await prisma.tasks.findFirst({where:{
            id: taskId
        }})

        return task
    }
    async getAllTasks(): Promise<Tasks[]> {
        const tasks = await prisma.tasks.findMany();

        return tasks
    }
}