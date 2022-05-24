import publishMessage from './publishMessage'
import { addIpToData } from './share'
import { feedbackFormSchema, likeFormSchema } from './validationSchema'

export async function addFeedback(request) {
  const jsonData = await addIpToData(request, request.body)
  return await publishMessage(feedbackFormSchema, jsonData)
}

export async function addLikeOrDislike(request) {
  const jsonData = await addIpToData(request, request.body)
  return await publishMessage(likeFormSchema, jsonData)
}
