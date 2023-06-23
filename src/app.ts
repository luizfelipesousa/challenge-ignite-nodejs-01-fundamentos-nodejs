import fastify from "fastify";
import { taskRoutes } from "./http/routes";
import { ResourceNotFoundException } from "./errors/resource-not-found";
import {ZodError} from 'zod'
import { TaskAlreadyCompletedException } from "./errors/task-already-completed";
import { InvalidDueDateException } from "./errors/invalid-due-date";

export const app = fastify({})

app.register(taskRoutes);


app.setErrorHandler(async (error,req, reply) => {

    if(error instanceof ZodError){
        return reply.status(400).send({message: error.format()})
    }

    if(error instanceof ResourceNotFoundException){
        return reply.status(404).send({message: error.message})
    }

    if(error instanceof InvalidDueDateException){
        return reply.status(404).send({message: error.message})
    }

    if(error instanceof TaskAlreadyCompletedException){
        return reply.status(404).send({message: error.message})
    }

})