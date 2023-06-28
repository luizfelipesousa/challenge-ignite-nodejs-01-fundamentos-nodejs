import { FastifyRequest, FastifyReply } from 'fastify'
import { makeListTask } from '../../use-cases/factories/make-list-task-factory'
import { z } from 'zod'

export async function getListTasksController(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  const querySchema = z.object({
    page: z.coerce.number(),
  })
  const { page } = querySchema.parse(req.query)
  const getTask = makeListTask()
  const tasks = await getTask.execute(page)

  return reply.status(200).send(tasks)
}
