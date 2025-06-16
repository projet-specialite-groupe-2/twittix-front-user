/* eslint-disable @typescript-eslint/no-unused-vars */
import http from 'http'
import https from 'https'
import { writeFile, rm } from 'fs'
import { emptydir } from 'fs-extra'
import { join } from 'path'
import { generate } from 'openapi-typescript-codegen'
import path from 'path'
import { fileURLToPath } from 'url'

import { config } from 'dotenv'

const __filename = fileURLToPath(import.meta.url) // get the resolved path to the file
const __dirname = path.dirname(__filename)
config({ path: path.dirname(__dirname) + '/../.env' })

const openAPIfilename = 'openapi'

const getAPIAccessToken = () =>
  new Promise((resolve, reject) => {
    console.log('retrieving access token ...')
    console.log(process.env.OPENAPI_HOST)
    console.log(process.env.OPENAPI_PORT)
    console.log(process.env.OPENAPI_PROTOCOL)

    const postData = JSON.stringify({
      username: process.env.OPENAPI_USER,
      password: process.env.OPENAPI_PASSWORD,
      client: process.env.OPENAPI_CLIENT ? process.env.OPENAPI_CLIENT : '1',
    })

    const webClient = process.env.OPENAPI_PROTOCOL === 'HTTP' ? http : https

    const req = webClient.request(
      {
        hostname: process.env.OPENAPI_HOST,
        port: process.env.OPENAPI_PORT,
        path: '/api/auth/token/',
        method: 'POST',
        // protocol: process.env.OPENAPI_PROTOCOL === 'HTTP' ? 'http:' : 'https:',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(postData),
        },
      },
      res => {
        res.on('data', d => {
          resolve(JSON.parse(d)?.access)
        })
      }
    )

    req.on('error', e => {
      reject(e)
    })

    req.write(postData)
    req.end()
  })

const getAPISchemaSource = accessToken => {
  console.log('retrieving schema source ...')

  const options = {
    hostname: process.env.VUE_APP_OPEN_API_HOST,
    port: process.env.VUE_APP_OPEN_API_PORT,
    path: '/api/docs.jsonopenapi',
    // protocol: process.env.OPENAPI_PROTOCOL === 'HTTP' ? 'http:' : 'https:',
    //headers: {
    //   Authorization: `Bearer ${accessToken}`,
    //},
  }

  const webClient = process.env.VUE_APP_OPEN_API_PROTOCOl === 'HTTP' ? http : https
  console.log(process.env.VUE_APP_OPEN_API_PROTOCOl)

  return new Promise((resolve, reject) => {
    const req = webClient.get(options, res => {
      console.log('options', options)
      let result = ''
      res.on('data', chunk => {
        result += chunk
      })

      res.on('end', () => {
        const sourceTmpFile = join(__dirname, '..', '..', `.${openAPIfilename}.json`)
        writeFile(sourceTmpFile, result, err => {
          if (err) {
            reject(err)
          } else {
            resolve(sourceTmpFile)
          }
        })
      })
    })

    req.on('error', err => {
      console.log('error', err)
      reject(err)
    })

    req.end()
  })
}

const generateCode = async source => {
  console.log('generating code...')

  await generate({
    input: source,
    output: join(__dirname, '..', 'core', 'api'),
    clientName: 'ApiClient',
    httpClient: 'axios',
    useOptions: true,
  })
}

const cleanup = async source =>
  new Promise((resolve, reject) => {
    rm(source, err => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })

const removeApiFolder = async () => {
  console.log('remove existing folder ...')
  await emptydir(join(__dirname, 'src', 'api'))
}

const main = async () => {
  // const token = await getAPIAccessToken()

  // remove existing file to replace it
  try {
    await cleanup(openAPIfilename)
  } catch (err) {
    console.log('No openapi definition file to remove')
  }

  const source = await getAPISchemaSource('')

  await removeApiFolder()
  await generateCode(source)
  //  No more cleanup, we need to keep the file to be able to build in gitlab during CD
  //  await cleanup(source)
}

main()
