import CORS from 'cors'
import globalAPICall from '../../utils/api/globalAPICall'
import { runMiddleware } from '../../utils/api/share'
import { getFeedback } from '../../utils/api/getDataFromStorage'
import { addFeedback } from '../../utils/api/addDataToStorage'
import { corsOrigins } from '../../utils/api/config'

const cors = CORS({
  methods: ['HEAD', 'GET', 'POST'],
  origin: corsOrigins,
})

// default handler
async function handler(req, res) {
  await runMiddleware(req, res, cors)

  async function POST() {
    // add feedback to storage
    const result = await addFeedback(req)

    if (result === true) {
      res.status(200).json({})
    } else {
      res.status(400).json({ message: result })
    }
  }

  async function GET() {
    // get feedback from keystone
    const result = await getFeedback(req)

    if (typeof result === 'string') {
      res.status(400).json({ message: result })
    } else {
      res.status(200).json(result)
    }
  }

  await globalAPICall(req, res, { POST, GET })
}

export default handler
