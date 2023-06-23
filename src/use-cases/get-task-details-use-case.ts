import { ResourceNotFoundException } from "../errors/resource-not-found";
import { TasksRepository } from "../repository/task-repository";
import { Tasks } from '@prisma/client'

interface GetTaskDetailsUseCaseRequest {
    taskId: string
}

export class GetTaskDetailsUseCase {

    constructor(private taskRepository: TasksRepository){}

    async execute({taskId}: GetTaskDetailsUseCaseRequest): Promise<Tasks> {
        
        const task = await this.taskRepository.getById(taskId);

        if(!task){
            throw new ResourceNotFoundException('Task not found.')
        }

        return task
    }
}