import cors from 'cors'
import * as dotenv from 'dotenv'
import express, { Application } from 'express'
import helmet from 'helmet'
import { booksRouter } from './books/books.router'
import { errorHandler } from './middleware/errorHandler'

dotenv.config()

if (!process.env.PORT) {
  process.exit(1)
}

const PORT: number = Number(process.env.PORT)

const app: Application = express()

app.use(cors())
app.use(helmet())
app.use(express.json())

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})

app.use('/api/v1/books', booksRouter)
app.use(errorHandler)
