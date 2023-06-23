export class InvalidDueDateException extends Error {
    constructor(){
        super('Due date cannot be in the past.')
    }
}