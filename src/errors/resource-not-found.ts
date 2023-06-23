export class ResourceNotFoundException extends Error {
    constructor(message: string){
        super(message)
    }
}