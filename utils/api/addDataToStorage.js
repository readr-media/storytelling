import publishMessage from './publishMessage'
import { feedbackFormSchema, likeFormSchema } from './validationSchema'


export async function addFeedback(req) {
  return await publishMessage(feedbackFormSchema, req.body, req)
}


export async function addLikeOrDislike(req) {
  return await publishMessage(likeFormSchema, req.body, req)
}
