import { getQueryResult } from '../../utils/api/getQueryResult'
import { getFeedback as getFeedbackQuery } from '../../graphql/query'
import { number, object } from 'yup'
import { truthValue, cancelValue } from './share'
import { basicFormSchema } from './validationSchema'

// get like and dislike amount

const likeQuerySchema = basicFormSchema

export async function getLikeAndDislikeAmount(req) {
  try {
    const params = await likeQuerySchema.validate(req.query, {
      stripUnknown: true,
    })

    const queryParams = Object.assign(params, {
      order: {
        createdAt: 'desc',
      },
    })

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
      } else if (cancelValue.includes(result)) {
        // currently, do nothing
      } else {
        amount.dislike += 1
      }
    }

    return amount
  } catch (err) {
    return err.message
  }
}

// get feedback

const feedbackQuerySchema = basicFormSchema.concat(
  object({
    skip: number().optional().integer().default(0),
    take: number().when('skip', {
      is: (val) => Number.isInteger(val) && val > 0,
      then: number().default(10).required(),
      otherwise: number().default(3).required(),
    }),
  })
)

export async function getFeedback(req) {
  try {
    const params = await feedbackQuerySchema.validate(req.query, {
      stripUnknown: true,
    })

    const queryParams = Object.assign(params, {
      order: {
        createdAt: 'desc',
      },
    })

    const result = await getQueryResult(getFeedbackQuery, queryParams)

    const dataAmount = result.data.formResults.length
    result.skip = queryParams.skip + dataAmount

    return result
  } catch (err) {
    return err.message
  }
}
