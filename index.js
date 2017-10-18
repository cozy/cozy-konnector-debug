'use strict'

const {BaseKonnector} = require('cozy-konnector-libs')

module.exports = new BaseKonnector(fields => {
  const timeout = Number(fields.timeout) || 8000
  if (timeout > 0) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve()
      }, timeout)
    })
  }
})
