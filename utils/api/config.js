const { env } = process

export const projectId = env.PROJECT_ID || 'mirrorlearning-161006'
export const topicNameOrId =
  env.PUBSUB_COVID19_QUERY_NAME || 'readr-project-covid19-query'
