const { BaseKonnector, log } = require('cozy-konnector-libs')

/**
   * Send a special error code which is interpreted by the cozy stack to terminate the execution of the
   * connector now
   *
   * @param  {string} message - The error code to be saved as connector result see [docs/ERROR_CODES.md]
   */
const terminate = (message) => {
  // Encapsulating in a Promise allows to prevent then() calls before
  // process.exit is actually called.
  return new Promise(() => {
    // The error log is also sent to be compatible with older versions of the cozy stack
    // For version of the stack older than 18bcbd5865a46026de6f794f661d83d5d87a3dbf
    log('error', message)
    log('critical', message)
    // Allow asynchronous calls to end, for example, previous log calls.
    // To breack promise chaining and avoid then() calls to be made,
    // The call is encapsulated in a promise, see above.
    setImmediate(() => process.exit(1))
  })
}

module.exports = {
  run: konnector => new BaseKonnector(params => {
    console.log(this)
    konnector
      .authenticate(params)
      .catch(error => {
        log('error', error)
        terminate('LOGIN_FAILED')
      })
      .then(authentication => konnector.synchronize(params, authentication))
  })
}
