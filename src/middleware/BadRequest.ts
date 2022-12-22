export class BadRequest extends Error {
  status?: number
  message: string
  constructor(message: string = 'Bad Request') {
    super(message)
    this.status = 400
    this.message = message
  }
}
