import gql from 'graphql-tag'

export const getFeedback = gql`
  query (
    $form: ID!
    $field: ID!
    $skip: Int
    $take: Int
    $order: FormResultOrderByInput!
  ) {
    formResults(
      where: {
        AND: [
          { form: { id: { equals: $form } } }
          { field: { id: { equals: $field } } }
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
