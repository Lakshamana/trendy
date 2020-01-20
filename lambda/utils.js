const { sign, verify } = require('jsonwebtoken')
const { SecretsManager } = require('aws-sdk')
const { stringify } = require('querystring')
const axios = require('../plugins/axios.plugin')

const sm = new SecretsManager()

const SECS_PER_DAY = 60 * 60 * 24

const secret = 'super-secret'

function tokenSign(user, rememberMeFactor = 7) {
  const { rememberMe } = user
  const ttl = SECS_PER_DAY * (rememberMe ? rememberMeFactor : 1)
  const exp = Math.floor(Date.now() / 1000) + ttl
  sign({ user, exp }, secret)
}

function tokenVerify(token) {
  verify(token, secret)
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

/**
 *
 * @param {Function => Promise} cb
 * @returns {Promise} the original request payload
 */
async function twitterAuth(cb) {
  const tokens = await getSecret('TrendySecrets')
  try {
    return await cb(tokens.TWT_BEARER_TOKEN)
  } catch (e) {
    const formData = stringify({ grant_type: 'client_credentials' })
    const { TWT_API_KEY, TWT_API_SECRET } = tokens
    const b64Encoded = Buffer.from(TWT_API_KEY + ':' + TWT_API_SECRET).toString(
      'base64'
    )
    const { access_token } = await axios.post('/oauth2/token', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + b64Encoded
      }
    })
    return await cb(access_token)
  }
}

module.exports = { tokenSign, tokenVerify, getCookie, twitterAuth }