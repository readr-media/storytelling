// use helper function to run middleware
export async function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

// get ip address from request
export function getRequestIp(req) {
  const forwarded = req.headers['x-forwarded-for']
  const ip = forwarded ? forwarded.split(/, /)[0] : req.connection.remoteAddress
  return ip
}

// add ip to data
export async function addIpToData(request, data) {
  const ip = await getRequestIp(request)
  data.ip = ip
  return data
}

// truth values
export const truthValue = ['true', 1, true]

// cancel values
export const cancelValue = ['null', 'undefined', null, undefined]
