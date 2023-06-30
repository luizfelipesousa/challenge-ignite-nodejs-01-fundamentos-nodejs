import { beforeEach, describe, expect, it } from 'vitest'
import { CompleteTaskUseCase } from './complete-task-use-case'
import { InMemoryTaskRepository } from '../repositories/in-memory-repository/in-memory-task-repository'
import { ResourceNotFoundException } from '../errors/resource-not-found'
import { TaskAlreadyCompletedException } from '../errors/task-already-completed'

describe('Complete task use case', () => {
  let repo: InMemoryTaskRepository
  let sut: CompleteTaskUseCase

  beforeEach(() => {
    repo = new InMemoryTaskRepository()
    sut = new CompleteTaskUseCase(repo)
  })

  it('should be possible to complete a task', async () => {
    const task = await repo.create({
      description: 'new Task',
      title: 'test task',
      dueDate: new Date(),
      completedAt: null,
      createdAt: new Date(),
      id: 'complete-task',
      updatedAt: null,
    })

    await sut.execute({ taskId: task.id })

    const completedTask = await repo.getById(task.id)

    expect(completedTask?.completedAt).instanceOf(Date)
  })

  it('should not be possible to complete a non existing task', async () => {
    await expect(() =>
      sut.execute({ taskId: 'non-existing' }),
    ).rejects.toBeInstanceOf(ResourceNotFoundException)
  })

  it('should not be possible to complete a task already completed', async () => {
    const alreadyCompletedTask = await repo.create({
      description: 'new Task',
      title: 'test task',
      dueDate: new Date(),
      completedAt: new Date(),
      createdAt: new Date(),
      id: 'already-completed',
      updatedAt: null,
    })

    await expect(() =>
      sut.execute({ taskId: alreadyCompletedTask.id }),
    ).rejects.toBeInstanceOf(TaskAlreadyCompletedException)
  })
})
