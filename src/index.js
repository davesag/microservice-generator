const program = require('commander')
const path = require('path')
// const fs = require('fs')

const readSwagger = require('./readSwagger')
const extract = require('./extractFromSwagger')
const { gateway, microservice, api } = require('./template')

program
  .option('-f, --file <swaggerFile>', 'The path to the swagger file')
  .option('-o, --output', 'The folder to output the generated service to')
  .option(
    '-g, --gateway',
    'Use this flag if the service is to be a gateway-api not a microservice.'
  )
  .option(
    '-a, --api',
    'Use this flag if the service is to be a regular api not a microservice or gateway.'
  )
  .parse(process.argv)

const swaggerFilePath = path.resolve(process.cwd(), program.file || './api.yml')
const isGateway = program.gateway || false
const isApi = program.api || false
const outputPath = path.resolve(process.cwd(), program.output || '.')

console.log('swaggerFilePath', swaggerFilePath)
console.log('outputPath', outputPath)
console.log('isGateway', isGateway)
console.log('isApi', isApi)

try {
  const template = isApi ? api : isGateway ? gateway : microservice

  const swagger = readSwagger(swaggerFilePath)
  template(extract(swagger), swaggerFilePath)
} catch (err) {
  console.error('Caught', err)
  process.exit(1)
}
