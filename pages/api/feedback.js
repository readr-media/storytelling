import CORS from 'cors'
import globalAPICall from '../../utils/api/globalAPICall'
import publishMessage from '../../utils/api/publishMessage'

const cors = CORS({
  methods: ['HEAD', 'GET', 'POST'],
})

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

// default handler
async function handler(req, res) {
  await runMiddleware(req, res, cors)

  async function POST() {
    const result = await publishMessage(req.body)

    if (result === true) {
      res.status(200).json({ status: 'success' })
    } else {
      res.status(503).json({ status: 'failed', message: result })
    }
  }

  async function GET() {
    res.status(200).json({ message: 'empty' })
  }

  await globalAPICall(req, res, { POST, GET })
}

export default handler
