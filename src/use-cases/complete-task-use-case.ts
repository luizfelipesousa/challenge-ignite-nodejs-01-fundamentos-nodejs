import { ResourceNotFoundException } from "../errors/resource-not-found";
import { TaskAlreadyCompletedException } from "../errors/task-already-completed";
import { TasksRepository } from "../repository/task-repository";

interface CompleteTaskUseCaseRequest{
    taskId: string
}

export class CompleteTaskUseCase {

    constructor(private taskRepository: TasksRepository){}

    async execute({taskId}: CompleteTaskUseCaseRequest): Promise<void> {
        const task = await this.taskRepository.getById(taskId);

        if(!task) {
            throw new ResourceNotFoundException('Task not found.')
        }

        if(!!task.completedAt) {
            throw new TaskAlreadyCompletedException()
        }

        await this.taskRepository.update({...task, completedAt: new Date(), updatedAt: new Date()});
    }
}