import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryTaskRepository } from '../repositories/in-memory-repository/in-memory-task-repository'
import { CreateTaskUseCase } from './create-task-use-case'
import { InvalidDueDateException } from '../errors/invalid-due-date'
import dayjs from 'dayjs'

describe('Create a task use case', () => {
  let repo: InMemoryTaskRepository
  let sut: CreateTaskUseCase

  beforeEach(() => {
    repo = new InMemoryTaskRepository()
    sut = new CreateTaskUseCase(repo)
  })

  it('should be possible to create a task', async () => {
    const task = await sut.execute({
      description: 'new Task',
      title: 'test task',
      dueDate: new Date(),
    })

    expect(task).toEqual(
      expect.objectContaining({
        id: expect.any(String),
      }),
    )
  })

  it('should not be possible to create a task with a due date lower than today', async () => {
    const date = dayjs().subtract(1, 'day').toDate()
    await expect(() =>
      sut.execute({
        description: 'new Task',
        title: 'test task',
        dueDate: date,
      }),
    ).rejects.toBeInstanceOf(InvalidDueDateException)
  })
})
