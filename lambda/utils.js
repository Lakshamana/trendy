const { sign, verify } = require('jsonwebtoken')

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

module.exports = { tokenSign, tokenVerify, getCookie }
