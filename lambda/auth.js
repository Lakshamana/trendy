const { hashSync, compareSync } = require('bcrypt')
const { DynamoDB } = require('aws-sdk')
const {
  tokenSign,
  tokenVerify,
  getCookie,
  generateIAMPolicy
} = require('./utils')

const db = new DynamoDB.DocumentClient({ region: 'sa-east-1' })

async function register(evt) {
  const { username, password } = JSON.parse(evt.body)
  if (!username || !password) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        messageCode: 'badRequestPayload'
      }),
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
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
      }),
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
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
      }),
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
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
      }),
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
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
    headers: {
      'Set-Cookie': 'accessToken=' + accessToken,
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({})
  }
}

async function auth(evt) {
  const { accessToken } = getCookie(evt.headers)
  console.log('accessToken:', accessToken)
  if (!accessToken) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        messageCode: 'badAuthPayload'
      }),
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    }
  }

  try {
    tokenVerify(accessToken)
  } catch (e) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        messageCode: 'badAuthPayload'
      }),
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    }
  }

  console.log('accessToken OK!')
  return generateIAMPolicy('me', 'Allow', evt.methodArn)
}

module.exports = { register, login, auth }
