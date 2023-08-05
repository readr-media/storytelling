import { getQueryResult } from '../../utils/api/getQueryResult'
import {
  getFeedback as getFeedbackQuery,
  getFieldOptions as getFieldOptionsQuery,
} from '../../graphql/query'
import { number, object } from 'yup'
import { truthValue, cancelValue } from './share'
import { basicFormSchema } from './validationSchema'
import { optionDelimiter } from './config'

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
    console.log(
      JSON.stringify({
        severity: 'ALERT',
        message: 'Received error while getLikeAndDislikeAmount',
        debugPayload: {
          error: err.message,
          stack: err.stack,
        },
      })
    )

    return err.message
  }
}

// get option summary (will replace getLikeAndDislikeAmount)

const optionQuerySchema = basicFormSchema

/**
 * @param {string} fieldId
 * @returns {Promise<Record<string, number>>}
 */
async function getFieldOptions(fieldId) {
  const options = {}
  const {
    data: { field },
  } = await getQueryResult(getFieldOptionsQuery, {
    field: fieldId,
  })

  if (field?.options?.length > 0) {
    field.options.map((o) => {
      const k = o.value
      options[k] = 0
    })
  }

  return options
}

export async function getOptionSummary(req) {
  try {
    const params = await optionQuerySchema.validate(req.query, {
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

    const summary = await getFieldOptions(queryParams.field)

    for (let resultObject of formResults) {
      let result = resultObject.result

      if (typeof result === 'string') {
        const selected = result.split(optionDelimiter)

        for (let s of selected) {
          if (s in summary) {
            summary[s] += 1
          }
        }
      }
    }

    return summary
  } catch (err) {
    console.log(
      JSON.stringify({
        severity: 'ALERT',
        message: 'Received error while getOptionSummary',
        debugPayload: {
          error: err.message,
          stack: err.stack,
        },
      })
    )

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
    console.log(
      JSON.stringify({
        severity: 'ALERT',
        message: 'Received error while getFeedback',
        debugPayload: {
          error: err.message,
          stack: err.stack,
        },
      })
    )

    return err.message
  }
}
