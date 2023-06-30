import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryTaskRepository } from '../repositories/in-memory-repository/in-memory-task-repository'
import { EditTaskUseCase } from './edit-task-use-case'
import { TaskAlreadyCompletedException } from '../errors/task-already-completed'
import { ResourceNotFoundException } from '../errors/resource-not-found'
import dayjs from 'dayjs'

describe('Edit a task use case', () => {
  let repo: InMemoryTaskRepository
  let sut: EditTaskUseCase

  beforeEach(() => {
    repo = new InMemoryTaskRepository()
    sut = new EditTaskUseCase(repo)
  })

  it('should be possible to edit a task', async () => {
    const createdTask = await repo.create({
      description: 'new Task',
      title: 'test task',
      dueDate: new Date(),
      completedAt: null,
      createdAt: new Date(),
      id: 'new-task',
      updatedAt: null,
    })

    const newDate = dayjs().add(15, 'd').toDate()
    const updatedTask = await sut.execute({
      description: 'New Description Update',
      title: 'Title Edited',
      dueDate: newDate,
      taskId: createdTask.id,
    })

    expect(updatedTask).toEqual(
      expect.objectContaining({
        description: 'New Description Update',
        title: 'Title Edited',
        dueDate: newDate,
      }),
    )
  })

  it('should not be possible to edit a non existing task', async () => {
    await expect(() =>
      sut.execute({
        taskId: 'non-existing',
        description: 'Update Description',
        title: 'Update Title',
        dueDate: new Date(),
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundException)
  })

  it('should not be possible to edit a task already completed', async () => {
    await repo.create({
      description: 'new Task',
      title: 'test task',
      dueDate: new Date(),
      completedAt: new Date(),
      createdAt: new Date(),
      id: 'already-completed',
      updatedAt: null,
    })

    await expect(() =>
      sut.execute({
        taskId: 'already-completed',
        description: 'Update Description',
        title: 'Update Title',
        dueDate: new Date(),
      }),
    ).rejects.toBeInstanceOf(TaskAlreadyCompletedException)
  })
})
