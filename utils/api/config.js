import 'dotenv/config'

const { env } = process

console.log(env)

export const projectId = env.PROJECT_ID || 'mirrorlearning-161006'
export const topicNameOrId =
  env.PUBSUB_COVID19_QUERY_NAME || 'readr-project-covid19-query'

export const keystoneAPIUrl =
  env.KEYSTONE_API_URL ||
  'https://editools-dev-4g6paft7cq-de.a.run.app/api/graphql'

// feedback form
export const feedbackFormName = env.FEEDBACK_FORM_NAME || 'feedback-comment'
export const feedbackFieldName = env.FEEDBACK_FIELD_NAME || '跟大家分享你的經驗'

// reCAPTCHA
export const recaptchaSiteKey = env.RECAPTCHA_SITE_KEY || ''
export const recaptchaScoreBoundary =
  Number(env.RECAPTCHA_SCORE_BOUNDARY) || 0.7
