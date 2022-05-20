const { env } = process

export const projectId = env.PROJECT_ID || 'mirrorlearning-161006'
export const topicNameOrId =
  env.PUBSUB_COVID19_QUERY_NAME || 'readr-project-covid19-query'
export const keystoneAPIUrl =
  env.KEYSTONE_API_URL ||
  'https://editools-dev-4g6paft7cq-de.a.run.app/api/graphql'
