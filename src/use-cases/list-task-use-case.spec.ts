import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryTaskRepository } from '../repositories/in-memory-repository/in-memory-task-repository'
import { ListTaskUseCase } from './list-task-use-case'

describe('List a task use case', () => {
  let repo: InMemoryTaskRepository
  let sut: ListTaskUseCase

  beforeEach(async () => {
    repo = new InMemoryTaskRepository()
    sut = new ListTaskUseCase(repo)
  })

  it('should be possible to list a task', async () => {
    await repo.create({
      description: 'new Task',
      title: 'test task',
      dueDate: new Date(),
      completedAt: null,
      createdAt: new Date(),
      id: 'complete-task',
      updatedAt: null,
    })

    const { tasks } = await sut.execute()

    expect(tasks.length).toEqual(1)
    expect(tasks).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
        }),
      ]),
    )
  })

  it('should be possible to paginate a list of tasks', async () => {
    for (let i = 0; i < 22; i++) {
      await repo.create({
        description: 'new Task',
        title: 'test task',
        dueDate: new Date(),
        completedAt: null,
        createdAt: new Date(),
        id: 'complete-task',
        updatedAt: null,
      })
    }

    const { tasks } = await sut.execute(2)

    expect(tasks.length).toEqual(2)
    expect(tasks).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
        }),
      ]),
    )
  })
})
