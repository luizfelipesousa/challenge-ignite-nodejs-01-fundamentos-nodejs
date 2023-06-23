import { FastifyRequest, FastifyReply } from 'fastify'
import { makeListTask } from '../../use-cases/factories/make-list-task-factory'

export async function getListTasksController(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  const getTask = makeListTask()
  const tasks = await getTask.execute()

  return reply.status(200).send(tasks)
}
