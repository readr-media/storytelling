import gql from 'graphql-tag'

export const getFeedback = gql`
  query (
    $formName: String!
    $fieldName: String!
    $skip: Int
    $take: Int
    $order: FormResultOrderByInput!
  ) {
    formResults(
      where: {
        AND: [
          { form: { name: { equals: $formName } } }
          { field: { name: { equals: $fieldName } } }
          { hidden: { not: { equals: true } } }
        ]
      }
      skip: $skip
      take: $take
      orderBy: [$order]
    ) {
      id
      ip
      name
      hidden
      result
      responseTime
      form {
        name
      }
      field {
        name
      }
    }
  }
`
