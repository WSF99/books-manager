import { BaseItem, Item } from '../books.interface'

export interface ServerResponse {
  statusCode: number
  message?: string
  data?: Item | Item[] | BaseItem | BaseItem[]
}

export const success = (
  statusCode: number = 200,
  message: string = 'Success',
  data: Item | Item[] | BaseItem | BaseItem[] = []
): ServerResponse => {
  return {
    statusCode: statusCode,
    message: message,
    data: data
  }
}

export const validSBN = (SBN: string) => {
  const regex = new RegExp(
    '^(SBN)?[-\\s]?\\d{3}[-\\s\\.]?\\d{5}[-\\s\\.]?\\d{1}$'
  )
  return regex.test(SBN)
}
