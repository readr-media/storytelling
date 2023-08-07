import { PubSub } from '@google-cloud/pubsub'
import { projectId, topicNameOrId } from '../../utils/api/config'

const pubSubClient = new PubSub({ projectId })

// publish message to Google PubSub
export default async function publishMessage(formSchema, jsonData) {
  try {
    const validateData = await formSchema.validate(jsonData, {
      stripUnknown: true,
    })

    await pubSubClient
      .topic(topicNameOrId)
      .publishMessage({ json: validateData })

    console.log(
      JSON.stringify({
        severity: 'DEBUG',
        message: 'Message published',
        debugPayload: {
          jsonData,
          validateData,
        },
      })
    )

    return true
  } catch (error) {
    console.log(
      JSON.stringify({
        severity: 'ALERT',
        message: 'Received error while publishing message',
        debugPayload: {
          jsonData,
          error: error.message,
          stack: error.stack,
        },
      })
    )

    return error.message
  }
}
