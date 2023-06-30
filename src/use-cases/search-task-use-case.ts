import { TasksRepository } from '../repositories/task-repository'

interface SearchTaskUseCaseRequest {
  page?: number
  q?: string
  isCompleted?: boolean
  dueDate?: Date
}

interface SearchTaskUseCaseResponse {
  tasks: any[]
}

export class SearchTaskUseCase {
  constructor(private taskRepository: TasksRepository) {}

  async execute({
    q,
    isCompleted,
    dueDate,
    page,
  }: SearchTaskUseCaseRequest): Promise<SearchTaskUseCaseResponse> {
    const tasks = await this.taskRepository.getFilteredTasks({
      page,
      q,
      isCompleted,
      dueDate,
    })
    return { tasks }
  }
}
