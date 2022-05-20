import CORS from 'cors'
import globalAPICall from '../../utils/api/globalAPICall'
import publishMessage from '../../utils/api/publishMessage'
import createAssessment from '../../utils/api/createAssessment'
import { runMiddleware } from '../../utils/api/share'
import { projectId } from '../../utils/api/config'

const recaptchaSiteKey = '6LeHLAEgAAAAADb0pcN6CVZdgD7KFDtCFElRu-f7'
const recaptchaScoreBoundary = 0.7

const cors = CORS({
  methods: ['HEAD', 'GET', 'POST'],
})

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
    const result = await publishMessage(req)

    if (result === true) {
      res.status(200).json({})
    } else {
      res.status(400).json({ message: result })
    }
  }

  async function GET() {
    // get feedbacks from keystone
    res.status(200).json({ message: 'empty' })
  }

  await globalAPICall(req, res, { POST, GET })
}

export default handler
