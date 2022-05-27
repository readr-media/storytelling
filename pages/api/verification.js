import CORS from 'cors'
import globalAPICall from '../../utils/api/globalAPICall'
import createAssessment from '../../utils/api/createAssessment'
import { runMiddleware } from '../../utils/api/share'
import {
  projectId,
  recaptchaSiteKey,
  recaptchaScoreBoundary,
  corsOrigins,
} from '../../utils/api/config'
import { validationSchema } from '../../utils/api/validationSchema'

const cors = CORS({
  methods: ['HEAD', 'POST'],
  origin: corsOrigins,
})

// default handler
async function handler(req, res) {
  await runMiddleware(req, res, cors)

  async function POST() {
    // check post body format
    let jsonData
    try {
      jsonData = await validationSchema.validate(req.body, {
        stripUnknown: true,
      })
    } catch (error) {
      return res.status(400).json({ message: error.message })
    }

    // recaptcha assessment
    const score = await createAssessment({
      projectID: projectId,
      recaptchaSiteKey,
      token: jsonData.token,
      recaptchaAction: jsonData.recaptchaAction,
    })

    if (score === null || score < recaptchaScoreBoundary) {
      res.status(401).json({ message: 'recaptach assessment failed' })
    } else {
      res.status(200).json({})
    }
  }

  await globalAPICall(req, res, { POST })
}

export default handler
