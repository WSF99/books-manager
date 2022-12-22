import { PrismaClient } from '@prisma/client'
import { Request } from 'express'
import { BadRequest } from '../middleware/BadRequest'
import { Conflict } from '../middleware/Conflict'
import createBookSchema from '../schemas/createBook.schema'
import { ServerResponse, success, validSBN } from './utils/utils'
import { validate } from './utils/validateRequest'

const prisma = new PrismaClient()
const MAX_SIGNED_INT_32 = 2147483647

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
