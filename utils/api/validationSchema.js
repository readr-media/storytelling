import { truthValue, cancelValue } from './share'
import { object, string, date, ref } from 'yup'
import { optionDelimiter } from './config'

export const basicFormSchema = object({
  form: string().required(),
  field: string().required(),
  identifier: string().optional().default(''),
  uri: ref('identifier'),
})

const basicInputFormSchema = basicFormSchema.concat(
  object({
    name: string().required(),
    ip: string().required(),
    responseTime: date().required(),
  })
)

export const feedbackFormSchema = basicInputFormSchema.concat(
  object({
    userFeedback: string().required(), // need to transform into string so that Python subscriber could handle properly
  })
)

export const likeFormSchema = basicInputFormSchema.concat(
  object({
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

// will replace likeFormSchema
export const optionFormSchema = basicInputFormSchema.concat(
  object({
    userFeedback: string()
      .transform((value) => {
        if (Array.isArray(value)) {
          return value.join(optionDelimiter)
        } else {
          return ''
        }
      })
      .defined(),
  })
)

export const validationSchema = object({
  token: string().required(),
  recaptchaAction: string().required(),
})
