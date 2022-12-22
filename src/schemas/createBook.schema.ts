import { number, object, string } from 'yup'
const MAX_SIGNED_INT_32 = 2147483647

export default object().shape({
  name: string().required('Name is required.'),
  sbn: string().required('SBN is required.'),
  description: string().notRequired(),
  author: string().required('Author is required'),
  inventory: number().notRequired().max(MAX_SIGNED_INT_32).moreThan(-1)
})
