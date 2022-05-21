import { getQueryResult } from '../../utils/api/getQueryResult'
import { getFeedback as getFeedbackQuery } from '../../graphql/query'
import { object, number } from 'yup'

const querySchema = object({
  skip: number().optional().integer().default(0),
  take: number().when('skip', {
    is: (val) => Number.isInteger(val) && val > 0,
    then: number().default(10).required(),
    otherwise: number().default(3).required(),
  }),
})

export async function getFeedback(formName, fieldlName, req) {
  try {
    const params = await querySchema.validate(req.params, {
      stripUnknown: true,
    })

    const queryParams = Object.assign(params, {
      formName,
      fieldlName,
    })

    const result = await getQueryResult(getFeedbackQuery, queryParams)

    const dataAmount = result.data.formResults.length
    result.skip = queryParams.skip + dataAmount

    return result
  } catch (err) {
    return err.message
  }
}
