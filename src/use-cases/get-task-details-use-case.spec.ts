import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryTaskRepository } from '../repositories/in-memory-repository/in-memory-task-repository'
import { GetTaskDetailsUseCase } from './get-task-details-use-case'
import { ResourceNotFoundException } from '../errors/resource-not-found'

describe('Get task details use case', () => {
  let repo: InMemoryTaskRepository
  let sut: GetTaskDetailsUseCase

  beforeEach(async () => {
    repo = new InMemoryTaskRepository()
    sut = new GetTaskDetailsUseCase(repo)
  })

  it('should be possible to get a task detail', async () => {
    const date = new Date()
    const createdTask = await repo.create({
      description: 'new Task',
      title: 'test task',
      dueDate: date,
      completedAt: null,
      createdAt: date,
      id: 'detail-task',
      updatedAt: null,
    })

    const taskDetails = await sut.execute({ taskId: createdTask.id })

    expect(taskDetails).toEqual(
      expect.objectContaining({
        description: 'new Task',
        title: 'test task',
        dueDate: date,
        completedAt: null,
        createdAt: date,
        id: 'detail-task',
        updatedAt: null,
      }),
    )
  })

  it('should not be possible to get details from a non-existing task', async () => {
    await expect(() =>
      sut.execute({ taskId: 'non-existing' }),
    ).rejects.toBeInstanceOf(ResourceNotFoundException)
  })
})
