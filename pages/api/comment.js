import CORS from 'cors'
import { PubSub } from '@google-cloud/pubsub'

const cors = CORS({
  methods: ['HEAD', 'GET', 'POST'],
})

const topicNameOrId = 'YOUR_TOPIC_NAME_OR_ID'
const pubSubClient = new PubSub()

// use helper function to run middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

// publish message to Google PubSub
async function publishMessage(jsonData) {
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

// POST /api/comment
async function postHandler(req, res) {
  const result = await publishMessage(req.body)

  console.log(result)
  if (result === true) {
    res.status(200).json({ status: 'success' })
  } else {
    res.status(503).json({ status: 'failed', message: result })
  }
}

// default handler
async function handler(req, res) {
  await runMiddleware(req, res, cors)

  if (req.method === 'POST') {
    await postHandler(req, res)
  } else {
    res.json({ message: 'Hello Everyone!' })
  }
}

export default handler
