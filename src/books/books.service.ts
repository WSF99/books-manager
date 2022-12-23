import { PrismaClient } from '@prisma/client'
import { Request } from 'express'
import { BadRequest } from '../middleware/BadRequest'
import { Conflict } from '../middleware/Conflict'
import { NotFound } from '../middleware/NotFound'
import createBookSchema from '../schemas/createBook.schema'
import updateBookSchema from '../schemas/updateBook.schema'
import { BaseItem, Item } from './books.interface'
import { ServerResponse, success, validSBN } from './utils/utils'
import { validate } from './utils/validateRequest'

const prisma = new PrismaClient()
const MAX_SIGNED_INT_32 = 2147483647

export const getBooks = async (req: Request): Promise<ServerResponse> => {
  const offset = Number(req?.query?.offset) || 0
  const limit = Number(req?.query?.limit) || 10
  const res: BaseItem[] = await prisma.book.findMany({
    take: limit,
    skip: offset,
    orderBy: {
      createdAt: 'asc'
    },
    select: {
      id: true,
      name: true
    }
  })
  if (res.length < 1) {
    return success(204)
  }
  return success(200, 'Found', res)
}

export const getBook = async (req: Request): Promise<ServerResponse> => {
  const bookId = Number(req.params?.id) || undefined

  if (!bookId || bookId > MAX_SIGNED_INT_32 || bookId <= 0) {
    throw new BadRequest('ID Inválido.')
  }
  const result: Item | null = await prisma.book.findFirst({
    where: {
      id: bookId
    }
  })
  if (!result) {
    throw new NotFound('O livro informado não foi encontrado.')
  }
  return success(200, 'Found', result)
}

export const postBook = async (req: Request): Promise<ServerResponse> => {
  const payload = req?.body
  await validate(createBookSchema, payload)
  const { sbn, name, description, author, inventory } = payload
  if (!validSBN(sbn)) {
    throw new BadRequest('O SBN informado não é válido.')
  }
  const found = await prisma.book.findFirst({
    where: {
      sbn: sbn
    }
  })
  if (found) {
    throw new Conflict('Já existe um livro cadastrado com o mesmo SBN.')
  }
  const data = {
    sbn: String(sbn),
    name: String(name),
    author: String(author),
    description: String(description),
    inventory: Number(inventory)
  }
  const resp = await prisma.book.create({ data: data })
  return success(201, 'Livro Cadastrado com sucesso', resp)
}

export const putBook = async (req: Request): Promise<ServerResponse> => {
  const payload = req?.body
  const bookId = Number(req.params?.id) || undefined
  await validate(updateBookSchema, payload)
  if (!bookId || bookId > MAX_SIGNED_INT_32 || bookId <= 0) {
    throw new BadRequest('ID Inválido.')
  }
  const res: Item | null = await prisma.book.findUnique({
    where: {
      id: bookId
    }
  })
  if (!res) {
    throw new NotFound('O livro informado não foi encontrado.')
  }
  const updated_at = new Date()
  const { name, author, description, inventory } = payload
  const dataToUpdate = {
    name: String(name),
    author: String(author),
    description: String(description),
    inventory: Number(inventory),
    updatedAt: updated_at
  }
  const data = await prisma.book.update({
    where: { id: bookId },
    data: dataToUpdate
  })
  return success(200, 'Livro atualizado com sucesso.', data)
}

export const deleteBook = async (req: Request): Promise<ServerResponse> => {
  const bookId = Number(req.params?.id) || undefined
  if (!bookId || bookId > MAX_SIGNED_INT_32 || bookId <= 0) {
    throw new BadRequest('ID Inválido.')
  }
  const res: Item | null = await prisma.book.findUnique({
    where: {
      id: bookId
    }
  })
  if (!res) {
    throw new NotFound('O livro informado não foi encontrado.')
  }
  await prisma.book.delete({ where: { id: bookId } })
  return success(204, 'Livro deletado com sucesso', res)
}
