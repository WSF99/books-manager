export class NotFound extends Error {
  status?: number
  message: string
  constructor(message: string = 'Not Found') {
    super(message)
    this.status = 404
    this.message = message
  }
}
