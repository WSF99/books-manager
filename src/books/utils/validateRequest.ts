import { AnySchema } from 'yup'

export const validate = async (schema: AnySchema, data: any) => {
  try {
    const res = await schema.validate(data)
    return res
  } catch (error) {
    throw error
  }
}
