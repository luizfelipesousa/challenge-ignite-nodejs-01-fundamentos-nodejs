import { Tasks } from "@prisma/client"

export class Task {

    public id: string
    public title: string
    public description: string | null
    public dueDate: Date | null
    public createdAt: Date | null
    public updatedAt: Date | null
    public completedAt: Date | null

    constructor(task: Tasks){
        this.id = task.id
        this.title = task.title
        this.description = task.description
        this.dueDate = task.due_date
        this.createdAt = task.created_at
        this.updatedAt = task.updated_at
        this.completedAt = task.completed_at
    }
}