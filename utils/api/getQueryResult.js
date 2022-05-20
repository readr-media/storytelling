import { print } from 'graphql/language/printer'
import axios from 'axios'
import { keystoneAPIUrl } from './config'

export async function getQueryResult(query, variables) {
  try {
    const { data: result } = await axios({
      url: keystoneAPIUrl,
      method: 'post',
      data: {
        query: print(query),
        variables,
      },
      headers: {
        'content-type': 'application/json',
        'Cache-Control': 'no-store',
      },
    })

    if (result.errors) {
      throw new Error(result.errors[0].message)
    }

    return result
  } catch (error) {
    throw new Error(error.message)
  }
}
