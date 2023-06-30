import { TasksRepository } from '../repositories/task-repository'
import { InvalidDueDateException } from '../errors/invalid-due-date'
import dayjs from 'dayjs'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import { Task } from '../model/task'

interface CreateTaskUseCaseRequest {
  title: string
  description: string
  dueDate: Date
}

export class CreateTaskUseCase {
  constructor(private taskRepository: TasksRepository) {}

  async execute({
    title,
    description,
    dueDate,
  }: CreateTaskUseCaseRequest): Promise<Task> {
    dayjs.extend(isSameOrBefore)

    const isSameOrAfterDay = dayjs().isSameOrBefore(dueDate, 'date')

    if (isSameOrAfterDay) {
      return await this.taskRepository.create({
        title,
        description,
        due_date: dueDate,
      })
    }

    throw new InvalidDueDateException()
  }
}
