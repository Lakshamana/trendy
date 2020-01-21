const { hashSync, compareSync } = require('bcrypt')
const { DynamoDB } = require('aws-sdk')
const { tokenSign, tokenVerify, getCookie } = require('./utils')

const db = new DynamoDB.DocumentClient({ region: 'sa-east-1' })

async function register(evt) {
  const { username, password } = JSON.parse(evt.body)
  if (!username || !password) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        messageCode: 'badRequestPayload'
      })
    }
  }

  const { Item } = await db
    .get({
      TableName: 'Users',
      Key: {
        username
      }
    })
    .promise()

  if (Item) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        messageCode: 'usernameAlreadyExists'
      })
    }
  }

  const params = {
    TableName: 'Users',
    Item: { username, password: hashSync(password, 12) }
  }

  await db.put(params).promise()

  return { statusCode: 201, body: JSON.stringify({}) }
}

async function login(evt) {
  const { username, password, rememberMe } = JSON.parse(evt.body)

  if (!username || !password) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        messageCode: 'badRequestPayload'
      })
    }
  }

  const { Item } = await db
    .get({
      TableName: 'Users',
      Key: {
        username
      }
    })
    .promise()

  if (!Item) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        messageCode: 'usernameDoesNotExist'
      })
    }
  }

  if (!compareSync(password, Item.password)) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        messageCode: 'authDataMismatch'
      })
    }
  }

  const accessToken = await tokenSign({ Item, rememberMe })
  return {
    statusCode: 200,
    headers: { 'Set-Cookie': 'accessToken=' + accessToken },
    body: JSON.stringify({})
  }
}

async function auth(evt) {
  const { accessToken } = getCookie(evt.headers)
  if (!accessToken) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        messageCode: 'badAuthPayload'
      })
    }
  }

  try {
    tokenVerify(accessToken)
  } catch (e) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        messageCode: 'badAuthPayload'
      })
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({})
  }
}

module.exports = { register, login, auth }
