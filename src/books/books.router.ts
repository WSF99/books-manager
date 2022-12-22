import express, { NextFunction, Request, Response } from 'express'

import * as BookService from './books.service'
import { ServerResponse } from './utils/utils'

export const booksRouter = express.Router()

booksRouter.post(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const resp: ServerResponse = await BookService.postBook(req)
      res.status(201).send(resp)
    } catch (e) {
      next(e)
    }
  }
)
