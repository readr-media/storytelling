import gql from 'graphql-tag'

export const getFeedback = gql`
  query (
    $form: ID!
    $field: ID!
    $uri: String
    $skip: Int
    $take: Int
    $order: FormResultOrderByInput!
  ) {
    formResults(
      where: {
        AND: [
          { form: { id: { equals: $form } } }
          { field: { id: { equals: $field } } }
          { uri: { equals: $uri } }
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

export const getFieldOptions = gql`
  query ($field: ID!) {
    field(where: { id: $field }) {
      id
      options {
        id
        name
        value
      }
    }
  }
`
