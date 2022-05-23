import publishMessage from './publishMessage'
import { truthValue } from './share'
import { object, string, number, date, boolean, mixed } from 'yup'

const feedbackFormSchema = object({
  name: string().required(),
  form: string().required(),
  responseTime: date().required(),
  field: number().positive().integer().required(),
  userFeedback: mixed().required(),
})

export async function addFeedback(req) {
  return await publishMessage(feedbackFormSchema, req.body, req)
}

const likeFormSchema = object({
  name: string().required(),
  form: string().required(),
  responseTime: date().required(),
  field: number().positive().integer().required(),
  userFeedback: boolean()
    .transform((value) => {
      if (truthValue.includes(value)) return true
      else return false
    })
    .required(),
})

export async function addLikeOrDislike(req) {
  return await publishMessage(likeFormSchema, req.body, req)
}
