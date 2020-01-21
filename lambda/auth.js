const { hashSync } = require('bcrypt')
const { DynamoDB } = require('aws-sdk')
const { tokenSign, tokenVerify, getCookie } = require('./utils')

const db = new DynamoDB.DocumentClient()

async function register(evt) {
  const { username, password } = evt

  if (!username || !password) {
    return {
      statusCode: 400,
      messageCode: 'badRequestPayload'
    }
  }

  const user = await db
    .get({
      TableName: 'Users',
      Key: {
        username
      }
    })
    .promise()

  if (user) {
    return {
      statusCode: 400,
      messageCode: 'usernameAlreadyExists'
    }
  }

  const params = {
    TableName: 'Users',
    Item: { username, password: hashSync(password, 12) }
  }

  await db.put(params).promise()

  return { statusCode: 201 }
}

async function login(evt) {
  const { username, password, rememberMe } = evt

  if (!username || !password) {
    return {
      statusCode: 400,
      messageCode: 'badRequestPayload'
    }
  }

  const user = await db
    .get({
      TableName: 'Users',
      Key: {
        username
      }
    })
    .promise()

  if (!user) {
    return {
      statusCode: 400,
      messageCode: 'usernameDoesNotExist'
    }
  }

  const accessToken = tokenSign({ user, rememberMe })
  return {
    statusCode: 200,
    headers: { 'Set-Cookie': accessToken }
  }
}

function auth(evt) {
  const { accessToken } = getCookie(evt.headers)
  if (!accessToken) {
    return {
      statusCode: 400,
      messageCode: 'badAuthPayload'
    }
  }

  try {
    tokenVerify(accessToken)
  } catch (e) {
    return {
      statusCode: 400,
      messageCode: 'badAuthPayload'
    }
  }

  return {
    statusCode: 200
  }
}

module.exports = { register, login, auth }
