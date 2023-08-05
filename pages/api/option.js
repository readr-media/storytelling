import CORS from 'cors'
import globalAPICall from '../../utils/api/globalAPICall'
import { runMiddleware } from '../../utils/api/share'
import { getOptionSummary } from '../../utils/api/getDataFromStorage'
import { addOption } from '../../utils/api/addDataToStorage'
import { corsOrigins } from '../../utils/api/config'

const cors = CORS({
  methods: ['HEAD', 'PUT', 'GET'],
  origin: corsOrigins,
})

// default handler
async function handler(req, res) {
  await runMiddleware(req, res, cors)

  async function PUT() {
    // add like/dislike to storage
    const result = await addOption(req)

    if (result === true) {
      res.status(200).json({})
    } else {
      res.status(400).json({ message: result })
    }
  }

  // get like and dislike amount
  async function GET() {
    const result = await getOptionSummary(req)

    if (typeof result === 'string') {
      res.status(400).json({ message: result })
    } else {
      res.status(200).json(result)
    }
  }

  await globalAPICall(req, res, { PUT, GET })
}

export default handler
