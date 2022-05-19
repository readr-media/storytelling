import { PubSub } from '@google-cloud/pubsub'

const projectId = process.env.PROJECT_ID || 'mirrorlearning-161006'
const topicNameOrId =
  process.env.PUBSUB_COVID19_QUERY_NAME || 'readr-project-covid19-query'
const pubSubClient = new PubSub({ projectId })

// publish message to Google PubSub
export default async function publishMessage(jsonData) {
  /*
    jsonData format
    {
      'form': <form_id_string>,
      'ip': <ip_address_string>,
      'responseTime': <date_string>,
      'result': [
        {
          field: <field_id_string>,
          userFeedback: <feedback_value>
        },
        {
          field: <field_id_string>,
          userFeedback: <feedback_value>
        },
        ...
      ]
    }
  */
  try {
    const messageId = await pubSubClient
      .topic(topicNameOrId)
      .publishMessage({ json: jsonData })
    console.log(`Message ${messageId} published.`)
    return true
  } catch (error) {
    console.error(`Received error while publishing: ${error.message}`)
    return error.message
  }
}
