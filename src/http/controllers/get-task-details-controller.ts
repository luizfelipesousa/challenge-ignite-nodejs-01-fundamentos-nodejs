import {FastifyRequest, FastifyReply} from 'fastify'
import { makeGetTasksDetails } from '../../use-cases/factories/make-get-task-details-factory';
import {z} from 'zod'

export async function getTaskController(req: FastifyRequest, reply: FastifyReply){
    const paramSchema = z.object({
        id: z.string()
    })

    const {id} = paramSchema.parse(req.params)

    const getTask = makeGetTasksDetails()
    const tasks = await getTask.execute({taskId:id});

    return reply.status(200).send(tasks);
}