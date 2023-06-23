import { ResourceNotFoundException } from "../errors/resource-not-found";
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
         title, description, dueDate}: EditTaskUseCaseRequest): Promise<void> {
        const task = await this.taskRepository.getById(taskId);

        if(!task) {
            throw new ResourceNotFoundException('Task not found.')
        }

        await this.taskRepository.update({
            ...task, 
            title: title ?? task.title,
            description,
            due_date: dueDate ?? task.due_date,
            updated_at: new Date(),
        });
    }
}