import { PubSub } from '@google-cloud/pubsub'
import { projectId, topicNameOrId } from '../../utils/api/config'
import { object, string, number, date, mixed } from 'yup'
import { getRequestIp } from './share'

const pubSubClient = new PubSub({ projectId })

// publish message to Google PubSub
export default async function publishMessage(req) {
  /*
    jsonData format
    {
      'name': <username_string>,
      'form': <form_id_string>,
      'ip': <ip_address_string>,
      'responseTime': <date_string>,
      'field': <field_number>,
      'userFeedback': <feedback_value>
    }
  */

  const formSchema = object({
    name: string().required(),
    from: string().required(),
    responseTime: date().required(),
    field: number().positive().required(),
    userFeedback: mixed().required(),
  })

  const jsonData = req.body

  try {
    const validateData = await formSchema.validate(jsonData, {
      stripUnknown: true,
    })

    const ip = await string().required().validate(getRequestIp(req))
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
