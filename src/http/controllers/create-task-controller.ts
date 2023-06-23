import {FastifyRequest, FastifyReply} from 'fastify'
import { makeCreateTask } from '../../use-cases/factories/make-create-task-factory';
import {z} from 'zod';

export async function createTaskController(req: FastifyRequest, reply: FastifyReply){

    const requestSchema = z.object({
        title: z.string(),
        description: z.string(),
        dueDate: z.coerce.date()
    })
    
    const {title, description, dueDate} = requestSchema.parse(req.body)

    const createTask = makeCreateTask();
    await createTask.execute({title, description, dueDate});

    return reply.status(201).send();
}