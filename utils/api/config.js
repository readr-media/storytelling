import 'dotenv/config'

const { env } = process
const delimiter = ','

export const projectId = env.PROJECT_ID || 'mirrorlearning-161006'
export const topicNameOrId =
  env.PUBSUB_COVID19_QUERY_NAME || 'readr-project-covid19-query'

export const keystoneAPIUrl =
  env.KEYSTONE_API_URL ||
  'https://editools-dev-4g6paft7cq-de.a.run.app/api/graphql'

// feedback form
export const feedbackFormName = env.FEEDBACK_FORM_NAME || 'feedback-comment'
export const feedbackFieldName = env.FEEDBACK_FIELD_NAME || '跟大家分享你的經驗'

// like and dislike form
export const likeFormName = env.LIKE_FORM_NAME || 'feedback-like'
export const likeFieldName = env.LIKE_FIELD_NAME || '這個結果符合實際情況嗎？'

// reCAPTCHA
export const recaptchaSiteKey = env.RECAPTCHA_SITE_KEY || ''
export const recaptchaScoreBoundary =
  Number(env.RECAPTCHA_SCORE_BOUNDARY) || 0.7

// CORS origins
export const corsOrigins = env.CORS_ORIGINS
  ? env.CORS_ORIGINS.split(delimiter)
  : ['http://localhost']
