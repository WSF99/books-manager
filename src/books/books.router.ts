import express, { NextFunction, Request, Response } from 'express'

import * as BookService from './books.service'
import { ServerResponse } from './utils/utils'

export const booksRouter = express.Router()

booksRouter.get(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const resp: ServerResponse = await BookService.getBooks(req)
      const statusCode = resp?.statusCode
      res.status(statusCode).send(resp)
    } catch (e) {
      next(e)
    }
  }
)

booksRouter.get(
  '/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const resp: ServerResponse = await BookService.getBook(req)
      const statusCode = resp?.statusCode
      res.status(statusCode).send(resp)
    } catch (e) {
      next(e)
    }
  }
)

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

booksRouter.put(
  '/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const resp = await BookService.putBook(req)
      res.status(200).send(resp)
    } catch (e) {
      next(e)
    }
  }
)

booksRouter.delete(
  '/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const resp: ServerResponse = await BookService.deleteBook(req)
      const statusCode = resp?.statusCode
      res.status(statusCode).send(resp)
    } catch (e) {
      next(e)
    }
  }
)
