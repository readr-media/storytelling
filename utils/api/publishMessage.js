import { PubSub } from '@google-cloud/pubsub'
import { projectId, topicNameOrId } from '../../utils/api/config'

const pubSubClient = new PubSub({ projectId })

// publish message to Google PubSub
export default async function publishMessage(formSchema, jsonData) {
  try {
    const validateData = await formSchema.validate(jsonData, {
      stripUnknown: true,
    })

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
