import { truthValue, cancelValue } from './share'
import { object, string, date } from 'yup'

export const feedbackFormSchema = object({
  name: string().required(),
  form: string().required(),
  ip: string().required(),
  responseTime: date().required(),
  field: string().required(),
  userFeedback: string().required(), // need to transform into string so that Python subscriber could handle properly
})

export const likeFormSchema = object({
  name: string().required(),
  form: string().required(),
  ip: string().required(),
  responseTime: date().required(),
  field: string().required(),
  userFeedback: string()
    .transform((value) => {
      // need to transform into string expression so that Python subscriber could handle properly
      if (truthValue.includes(value)) {
        return 'true'
      } else if (cancelValue.includes(value)) {
        return 'null'
      } else {
        return 'false'
      }
    })
    .nullable()
    .defined(),
})

export const validationSchema = object({
  token: string().required(),
  recaptchaAction: string().required(),
})
