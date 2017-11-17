const authenticate = params => Promise.reject('Undefined login error')

const synchronize = (params, authentication) => {
  const timeout = Number(params.timeout) || 8000
  if (timeout > 0) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve()
      }, timeout)
    })
  }
}

module.exports = {
  authenticate,
  synchronize
}
