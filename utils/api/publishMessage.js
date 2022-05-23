import { PubSub } from '@google-cloud/pubsub'
import { projectId, topicNameOrId } from '../../utils/api/config'
import { getRequestIp } from './share'

const pubSubClient = new PubSub({ projectId })

// publish message to Google PubSub
export default async function publishMessage(formSchema, jsonData, request) {
  try {
    const validateData = await formSchema.validate(jsonData, {
      stripUnknown: true,
    })

    const ip = await getRequestIp(request)
    validateData.ip = ip

    const messageId = await pubSubClient
      .topic(topicNameOrId)
      .publishMessage({ json: validateData })

    console.log(`Message ${messageId} published.`)
    return true
  } catch (error) {
    console.error(`Received error while publishing: ${error.message}`)
    return error.message
  }
}
