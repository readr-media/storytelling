import CORS from 'cors'
import globalAPICall from '../../utils/api/globalAPICall'
import publishMessage from '../../utils/api/publishMessage'
import createAssessment from '../../utils/api/createAssessment'
import { projectId } from '../../utils/api/config'

const cors = CORS({
  methods: ['HEAD', 'GET', 'POST'],
})

const recaptchaSiteKey = '6LeHLAEgAAAAADb0pcN6CVZdgD7KFDtCFElRu-f7'
const recaptchaScoreBoundary = 0.7

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
    // recaptcha assessment
    const score = await createAssessment({
      projectID: projectId,
      recaptchaSiteKey,
      token: req.body.token,
      recaptchaAction: req.body.recaptchaAction,
    })

    if (score === null || score < recaptchaScoreBoundary) {
      return res.status(401).json({ message: 'recaptach assessment failed' })
    }

    // publish message to PubSub
    const result = await publishMessage(req.body)

    if (result === true) {
      res.status(200).json({})
    } else {
      res.status(503).json({ message: result })
    }
  }

  async function GET() {
    // get feedbacks from keystone
    res.status(200).json({ message: 'empty' })
  }

  await globalAPICall(req, res, { POST, GET })
}

export default handler
