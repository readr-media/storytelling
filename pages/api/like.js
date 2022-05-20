import CORS from 'cors'
import globalAPICall from '../../utils/api/globalAPICall'
import publishMessage from '../../utils/api/publishMessage'

const cors = CORS({
  methods: ['HEAD', 'PUT'],
})

import { runMiddleware } from '../../utils/api/share'

// default handler
async function handler(req, res) {
  await runMiddleware(req, res, cors)

  async function PUT() {
    // publish message to PubSub
    const result = await publishMessage(req.body)

    if (result === true) {
      res.status(200).json({})
    } else {
      res.status(400).json({ message: result })
    }
  }

  await globalAPICall(req, res, { PUT })
}

export default handler
