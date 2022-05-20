import gql from 'graphql-tag'

export const getFeedback = gql`
  query ($formName: String!, $fieldName: String!, $skip: Int, $take: Int) {
    formResults(
      where: {
        AND: [
          { form: { name: { equals: $formName } } }
          { field: { name: { equals: $fieldName } } }
        ]
      }
      skip: $skip
      take: $take
    ) {
      ip
      name
      result
      responseTime
      field {
        name
      }
    }
  }
`
