'use strict';

const { BaseKonnector } = require('cozy-konnector-libs');

const konnectorErrors = [
  'CHALLENGE_ASKED',
  'LOGIN_FAILED',
  'LOGIN_FAILED.NEEDS_SECRET',
  'LOGIN_FAILED.TOO_MANY_ATTEMPTS',
  'MAINTENANCE',
  'NOT_EXISTING_DIRECTORY',
  'USER_ACTION_NEEDED.ACCOUNT_REMOVED',
  'USER_ACTION_NEEDED.CHANGE_PASSWORD',
  'VENDOR_DOWN.BANK_DOWN',
  'VENDOR_DOWN.LINXO_DOWN'
];

module.exports = new BaseKonnector(fields => {
  if (!!fields.login && konnectorErrors.includes(fields.login.toUpperCase())) {
    throw new Error(fields.login.toUpperCase())
  }

  const timeout = Number(fields.timeout) || 8000;
  if (timeout > 0) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, timeout);
    });
  }
});
