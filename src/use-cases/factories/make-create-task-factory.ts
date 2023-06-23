import { PrismaTasksRepository } from "../../repository/prisma-repository/prisma-tasks-repository";
import { CreateTaskUseCase } from "../create-task-use-case";

export function makeCreateTask() {
    const repository = new PrismaTasksRepository();
    const createTask = new CreateTaskUseCase(repository);
    return createTask;
}