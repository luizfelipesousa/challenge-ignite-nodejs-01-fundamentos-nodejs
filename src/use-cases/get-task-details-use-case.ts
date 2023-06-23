import { ResourceNotFoundException } from '../errors/resource-not-found'
import { Task } from '../model/task'
import { TasksRepository } from '../repository/task-repository'

interface GetTaskDetailsUseCaseRequest {
  taskId: string
}

export class GetTaskDetailsUseCase {
  constructor(private taskRepository: TasksRepository) {}

  async execute({ taskId }: GetTaskDetailsUseCaseRequest): Promise<Task> {
    const task = await this.taskRepository.getById(taskId)

    if (!task) {
      throw new ResourceNotFoundException('Task not found.')
    }

    return task
  }
}
