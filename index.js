'use strict'

const {BaseKonnector, log} = require('cozy-konnector-libs')

module.exports = new BaseKonnector(fields => {
  const timeout = Number(fields.timeout) || 8000
  if (timeout > 0) {
    return new Promise(resolve => {
      setTimeout(() => {
        generateError(fields.error)
        resolve()
      }, timeout)
    })
  }

  generateError(fields.error)
})

function generateError (error) {
  if (error !== 'OK') log('error', error)
}
