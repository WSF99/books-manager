export class Conflict extends Error {
  status?: number
  message: string
  constructor(message: string = 'Conflict') {
    super(message)
    this.status = 409
    this.message = message
  }
}
