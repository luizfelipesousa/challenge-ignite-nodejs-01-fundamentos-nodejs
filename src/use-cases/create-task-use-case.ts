import { randomUUID } from "node:crypto";
import { TasksRepository } from "../repository/task-repository";
import dayjs from "dayjs";
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import { InvalidDueDateException } from "../errors/invalid-due-date";

interface CreateTaskUseCaseRequest{
    title: string
    description: string
    dueDate: Date
}

export class CreateTaskUseCase {

    constructor(private taskRepository: TasksRepository){}

    async execute({title, description, dueDate}: CreateTaskUseCaseRequest): Promise<void> {
        dayjs.extend(isSameOrAfter)

        const isSameOrAfterDay = dayjs().isSameOrAfter(dueDate, 'date')

        if(isSameOrAfterDay){
            await this.taskRepository.create({title, description, due_date: dueDate})

            return;
        }
        
        throw new InvalidDueDateException()
    }
}