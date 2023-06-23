import {FastifyRequest, FastifyReply} from 'fastify'
import { makeEditTask } from '../../use-cases/factories/make-edit-task-factory';
import { z } from 'zod';

export async function editTaskController(req: FastifyRequest, reply: FastifyReply){


    const paramSchema = z.object({
        id: z.string()
    })
    
    const requestSchema = z.object({
        title: z.string().optional(),
        description: z.string(),
        dueDate: z.coerce.date().optional(),
    })
    
    const {id} = paramSchema.parse(req.params)
    const {title, description, dueDate} = requestSchema.parse(req.body)

    const editTask = makeEditTask();
    const updatedTask = await editTask.execute({taskId: id, title, description, dueDate});

    return reply.status(200).send(updatedTask);
}