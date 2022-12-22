import { number, object, string } from 'yup'
const MAX_SIGNED_INT_32 = 2147483647

export default object().shape({
  name: string().min(1).notRequired(),
  description: string().notRequired(),
  author: string().min(1).notRequired(),
  inventory: number().notRequired().max(MAX_SIGNED_INT_32).moreThan(-1)
})
