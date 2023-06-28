import { TasksRepository } from '../repositories/task-repository'

interface ListTaskUseCaseResponse {
  tasks: any[]
}

export class ListTaskUseCase {
  constructor(private taskRepository: TasksRepository) {}

  async execute(page?: number): Promise<ListTaskUseCaseResponse> {
    const tasks = await this.taskRepository.getAllTasks({ page })
    return { tasks }
  }
}
