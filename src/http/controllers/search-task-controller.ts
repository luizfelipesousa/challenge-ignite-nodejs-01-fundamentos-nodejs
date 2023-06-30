import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeSearchTask } from '../../use-cases/factories/make-list-task-factory copy'

export async function searchTaskController(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  const stringToBoolean = (value: string): boolean => {
    return value.toLowerCase() === 'true'
  }

  const paramSchema = z.object({
    q: z.string().optional(),
    dueDate: z.coerce.date().optional(),
    isCompleted: z.string().transform(stringToBoolean),
    page: z.coerce.number().optional(),
  })

  const { q, dueDate, isCompleted, page } = paramSchema.parse(req.query)

  const getTask = makeSearchTask()
  const tasks = await getTask.execute({ q, dueDate, isCompleted, page })

  return reply.status(200).send(tasks)
}
