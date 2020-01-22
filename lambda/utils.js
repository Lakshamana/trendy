const { sign, verify } = require('jsonwebtoken')
const { SecretsManager } = require('aws-sdk')
const { stringify } = require('querystring')

const axios = require('../plugins/axios.plugin')
const { twitterAPI } = require('./shared/app.constants')

const sm = new SecretsManager()

const SECS_PER_DAY = 60 * 60 * 24

async function tokenSign(user, rememberMeFactor = 7) {
  const { rememberMe } = user
  const ttl = SECS_PER_DAY * (rememberMe ? rememberMeFactor : 1)
  const exp = Math.floor(Date.now() / 1000) + ttl
  const { JWT_SECRET } = await getSecret('TrendySecrets')
  return sign({ user, exp }, JWT_SECRET)
}

async function tokenVerify(token) {
  const { JWT_SECRET } = await getSecret('TrendySecrets')
  verify(token, JWT_SECRET)
}

/**
 * Receives an array of headers and extract the value from the cookie header
 * @param  {String}   errors List of errors
 * @return {Object}
 */
function getCookie(headers) {
  if (
    headers === null ||
    headers === undefined ||
    headers.Cookie === undefined
  ) {
    return {}
  }

  // Split a cookie string in an array (Originally found http://stackoverflow.com/a/3409200/1427439)
  var list = {},
    rc = headers.Cookie

  rc &&
    rc.split(';').forEach(function(cookie) {
      var parts = cookie.split('=')
      var key = parts.shift().trim()
      var value = decodeURI(parts.join('='))
      if (key != '') {
        list[key] = value
      }
    })

  return list
}

async function getSecret(SecretId) {
  const { SecretString } = await sm.getSecretValue({ SecretId }).promise()
  return JSON.parse(SecretString)
}

async function putSecret(SecretId, secretJson) {
  const SecretString = JSON.stringify(secretJson)
  await sm.putSecretValue({ SecretId, SecretString }).promise()
}

/**
 *
 * @param {Function} cb
 * @returns {Promise} the original request payload
 */
async function twitterAuth(cb) {
  const tokens = await getSecret('TrendySecrets')
  try {
    return (await cb()).data
  } catch (e) {
    const formData = stringify({ grant_type: 'client_credentials' })
    const { TWT_API_KEY, TWT_API_SECRET } = tokens
    const b64Encoded = Buffer.from(TWT_API_KEY + ':' + TWT_API_SECRET).toString(
      'base64'
    )
    const { data } = await axios.post(twitterAPI + '/oauth2/token', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + b64Encoded
      }
    })
    tokens.TWT_BEARER_TOKEN = data.access_token
    await putSecret('TrendySecrets', tokens)
    axios.defaults.headers.Authorization = 'Bearer ' + data.access_token
    return (await cb()).data
  }
}

function generateIAMPolicy(principalId, Effect, Resource) {
  return (
    Effect &&
    Resource && {
      principalId,
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect,
            Resource
          }
        ]
      }
    }
  )
}

module.exports = {
  tokenSign,
  tokenVerify,
  getCookie,
  twitterAuth,
  generateIAMPolicy
}
