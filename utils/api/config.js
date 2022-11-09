import 'dotenv/config'

const { env } = process
const delimiter = ','

export const projectId = env.PROJECT_ID || 'mirrorlearning-161006'
export const topicNameOrId =
  env.PUBSUB_COVID19_QUERY_NAME || 'readr-project-covid19-query'

export const keystoneAPIUrl =
  env.KEYSTONE_API_URL ||
  'https://editools-dev-4g6paft7cq-de.a.run.app/api/graphql'

// reCAPTCHA
export const recaptchaSiteKey = env.RECAPTCHA_SITE_KEY || ''
export const recaptchaScoreBoundary =
  Number(env.RECAPTCHA_SCORE_BOUNDARY) || 0.7

// CORS origins
export const corsOrigins = env.CORS_ORIGINS
  ? env.CORS_ORIGINS.split(delimiter)
  : ['http://localhost']
