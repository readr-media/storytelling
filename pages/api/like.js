import CORS from 'cors'
import globalAPICall from '../../utils/api/globalAPICall'
import publishMessage from '../../utils/api/publishMessage'
import { runMiddleware } from '../../utils/api/share'
import { getLikeAndDislikeAmount } from '../../utils/api/getLikeAndDislikeAmount'
import { likeFormName, likeFieldName } from '../../utils/api/config'

const cors = CORS({
  methods: ['HEAD', 'PUT'],
})

// default handler
async function handler(req, res) {
  await runMiddleware(req, res, cors)

  async function PUT() {
    // publish message to PubSub
    const result = await publishMessage(req)

    if (result === true) {
      res.status(200).json({})
    } else {
      res.status(400).json({ message: result })
    }
  }

  async function GET() {
    const result = await getLikeAndDislikeAmount(likeFormName, likeFieldName)

    if (typeof result === 'string') {
      res.status(400).json({ message: result })
    } else {
      res.status(200).json(result)
    }
  }

  await globalAPICall(req, res, { PUT, GET })
}

export default handler
