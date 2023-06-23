import { TasksRepository } from "../task-repository";

const  tasks:any[] = []
export class InMemoryTaskRepository implements TasksRepository{


    async create(task: any): Promise<void> {
        tasks.push(task);
    }

    async delete(taskId: string): Promise<void> {
      const taskIndex = tasks.findIndex(task => task.id === taskId);
      tasks.splice(taskIndex, 1);
    }

    async update(taskId: string, task: any): Promise<void> {
        const taskIndex = tasks.findIndex(task => task.id === taskId);
        tasks[taskIndex] = {id:taskId, ...task}
    }

    async get(taskId: string): Promise<any[]> {

        if(!taskId){
            return tasks
        }
        
        const task = tasks.find(task => task.id === taskId);
        return [task] ?? []
    }

}