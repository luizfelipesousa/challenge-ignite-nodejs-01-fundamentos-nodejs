import { ResourceNotFoundException } from '../errors/resource-not-found'
import { TasksRepository } from '../repository/task-repository'

interface DeleteTaskUseCaseRequest {
  taskId: string
  userId?: string // should not be optional
}

export class DeleteTaskUseCase {
  constructor(private taskRepository: TasksRepository) {}

  async execute({ taskId, userId }: DeleteTaskUseCaseRequest): Promise<void> {
    // find user
    // throw exception

    const task = await this.taskRepository.getById(taskId)

    if (!task) {
      throw new ResourceNotFoundException('Task not found.')
    }

    await this.taskRepository.delete(task)
  }
}
