import { truthValue } from './share'
import { object, string, number, date, boolean, mixed } from 'yup'

export const feedbackFormSchema = object({
  name: string().required(),
  form: string().required(),
  ip: string().required(),
  responseTime: date().required(),
  field: number().positive().integer().required(),
  userFeedback: mixed().required(),
})

export const likeFormSchema = object({
  name: string().required(),
  form: string().required(),
  ip: string().required(),
  responseTime: date().required(),
  field: number().positive().integer().required(),
  userFeedback: boolean()
    .transform((value) => {
      if (truthValue.includes(value)) return true
      else return false
    })
    .required(),
})

export const validationSchema = object({
  token: string().required(),
  recaptchaAction: string().required(),
})
