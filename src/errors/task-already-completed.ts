export class TaskAlreadyCompletedException extends Error {
  constructor() {
    super('Task already completed.')
  }
}
