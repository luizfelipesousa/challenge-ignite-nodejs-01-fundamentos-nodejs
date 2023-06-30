import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryTaskRepository } from '../repositories/in-memory-repository/in-memory-task-repository'
import { SearchTaskUseCase } from './search-task-use-case'

describe('Search task  use case', () => {
  let repo: InMemoryTaskRepository
  let sut: SearchTaskUseCase

  beforeEach(async () => {
    repo = new InMemoryTaskRepository()
    sut = new SearchTaskUseCase(repo)
  })

  it('should be possible to search a task detail', async () => {
    const date = new Date()
    await repo.create({
      description: 'new Task',
      title: 'test task',
      dueDate: date,
      completedAt: null,
      createdAt: date,
      id: 'detail-task',
      updatedAt: null,
    })

    const { tasks } = await sut.execute({ q: 'task' })
    expect(tasks.length).toEqual(1)
    expect(tasks).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          description: 'new Task',
          title: 'test task',
          dueDate: date,
          completedAt: null,
          createdAt: date,
          id: 'detail-task',
          updatedAt: null,
        }),
      ]),
    )
  })

  it('should return empty list when there is no search match', async () => {
    const { tasks } = await sut.execute({ q: 'non-existing' })
    expect(tasks).toEqual([])
  })
})
