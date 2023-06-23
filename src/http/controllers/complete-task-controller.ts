import { FastifyRequest, FastifyReply } from 'fastify'
import { makeCompleteTask } from '../../use-cases/factories/make-complete-task-factory'
import { z } from 'zod'

export async function completeTaskController(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  const paramSchema = z.object({
    id: z.string(),
  })

  const { id } = paramSchema.parse(req.params)

  const editTask = makeCompleteTask()
  await editTask.execute({ taskId: id })

  return reply.status(200).send({
    message: 'Task completed successfully',
  })
}
