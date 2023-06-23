import { ResourceNotFoundException } from "../errors/resource-not-found";
import { TaskAlreadyCompletedException } from "../errors/task-already-completed";
import { Task } from "../model/task";
import { TasksRepository } from "../repository/task-repository";

interface EditTaskUseCaseRequest{
    taskId: string
    title: string | undefined
    description: string
    dueDate: Date | undefined
}

export class EditTaskUseCase {

    constructor(private taskRepository: TasksRepository){}

    async execute({taskId,
         title, description, dueDate}: EditTaskUseCaseRequest): Promise<Task> {
        const task = await this.taskRepository.getById(taskId);

        if(!task) {
            throw new ResourceNotFoundException('Task not found.')
        }

        if(task.completedAt === null) {
            throw new TaskAlreadyCompletedException();
        }

        const updatedTask = await this.taskRepository.update({
            ...task, 
            title: title ?? task.title,
            description,
            dueDate: dueDate ?? task.dueDate,
            updatedAt: new Date(),
        });

        return updatedTask;
    }
}