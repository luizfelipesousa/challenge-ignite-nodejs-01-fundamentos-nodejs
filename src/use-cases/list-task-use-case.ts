import { TasksRepository } from "../repository/task-repository";

interface ListTaskUseCaseResponse {
    tasks: any[]
}

export class ListTaskUseCase {

    constructor(private taskRepository: TasksRepository){}

    async execute(): Promise<ListTaskUseCaseResponse> {
        
        const tasks = await this.taskRepository.getAllTasks();
        return {tasks}
    }
}