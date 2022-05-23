import { getQueryResult } from '../../utils/api/getQueryResult'
import { getFeedback as getFeedbackQuery } from '../../graphql/query'

const truthValue = ['true', 1, true]

export async function getLikeAndDislikeAmount(formName, fieldName) {
  try {
    const queryParams = {
      formName,
      fieldName,
    }

    const {
      data: { formResults },
    } = await getQueryResult(getFeedbackQuery, queryParams)

    const amount = {
      like: 0,
      dislike: 0,
    }

    for (let resultObject of formResults) {
      let result = resultObject.result

      if (typeof result === 'string') {
        result = result.toLowerCase()
      }

      if (truthValue.includes(result)) {
        amount.like += 1
      } else {
        amount.dislike += 1
      }
    }

    return amount
  } catch (err) {
    return err.message
  }
}
