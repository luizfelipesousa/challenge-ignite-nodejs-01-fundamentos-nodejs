import {FastifyRequest, FastifyReply} from 'fastify'
import { makeDeleteTask } from '../../use-cases/factories/make-delete-task-factory'
import {z} from 'zod'

export type Params = {
    taskId: any
}

export async function deleteTaskController(req: FastifyRequest, reply: FastifyReply){

    const paramSchema = z.object({
        id: z.string()
    })

    const {id} = paramSchema.parse(req.params)
    const deleteUseCase = makeDeleteTask();
    await deleteUseCase.execute({taskId:id});

    return reply.status(200).send({
        "message": "Task deleted successfully"
      });
}