/**
 *
 * @param {http.IncomingMessage} req
 * @param {http.ServerResponse} res
 * @param {{[key: string]: () => Promise<void>}} actions
 */

import CustomError from './CustomError.js'

export default async function globalAPICall(req, res, actions) {
  try {
    const method = req.method
    // check an action exists with request.method else throw method not allowed
    if (!Object.keys(actions).includes(method)) {
      throw new CustomError('Method not allowed', 405)
    }
    // run the action matching the request.method
    await actions[method]()
  } catch (err) {
    console.log(
      JSON.stringify({
        severity: 'ALERT',
        message: 'Received unexpected error',
        debugPayload: {
          error: err.message,
          stack: err.stack,
        },
      })
    )

    if (err instanceof CustomError) {
      res.status(err.code).json({ message: err.message })
    } else {
      res.status(500).json({ message: 'Internal server error' })
    }
  }
}
