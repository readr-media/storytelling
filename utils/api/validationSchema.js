import { truthValue, cancelValue } from './share'
import { object, string, date, ref } from 'yup'

export const basicFormSchema = object({
  form: string().required(),
  field: string().required(),
  identifier: string().optional(),
  uri: ref('identifier'),
})

export const feedbackFormSchema = basicFormSchema.concat(
  object({
    name: string().required(),
    ip: string().required(),
    responseTime: date().required(),
    userFeedback: string().required(), // need to transform into string so that Python subscriber could handle properly
  })
)

export const likeFormSchema = basicFormSchema.concat(
  object({
    name: string().required(),
    ip: string().required(),
    responseTime: date().required(),
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
)

export const validationSchema = object({
  token: string().required(),
  recaptchaAction: string().required(),
})
