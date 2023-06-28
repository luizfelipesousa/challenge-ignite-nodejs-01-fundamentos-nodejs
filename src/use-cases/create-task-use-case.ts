import { TasksRepository } from '../repositories/task-repository'
import { InvalidDueDateException } from '../errors/invalid-due-date'
import dayjs from 'dayjs'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
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
    dayjs.extend(isSameOrAfter)

    const isSameOrAfterDay = dayjs().isSameOrAfter(dueDate, 'date')

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
