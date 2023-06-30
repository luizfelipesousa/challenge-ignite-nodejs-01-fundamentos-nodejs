import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryTaskRepository } from '../repositories/in-memory-repository/in-memory-task-repository'
import { DeleteTaskUseCase } from './delete-task-use-case'
import { ResourceNotFoundException } from '../errors/resource-not-found'

describe('Delete a task use case', () => {
  let repo: InMemoryTaskRepository
  let sut: DeleteTaskUseCase

  beforeEach(() => {
    repo = new InMemoryTaskRepository()
    sut = new DeleteTaskUseCase(repo)
  })

  it('should be possible to delete a task', async () => {
    const task = await repo.create({
      description: 'new Task',
      title: 'test task',
      dueDate: new Date(),
      completedAt: null,
      createdAt: new Date(),
      id: 'delete-task',
      updatedAt: null,
    })

    await sut.execute({
      taskId: task.id,
    })

    const deletedTask = await repo.getById(task.id)
    expect(deletedTask).toEqual(null)
  })

  it('should not be possible to delete a non existing task ', async () => {
    await expect(() =>
      sut.execute({ taskId: 'non-existing' }),
    ).rejects.toBeInstanceOf(ResourceNotFoundException)
  })
})
