const program = require('commander')
const path = require('path')
// const fs = require('fs')

const readSwagger = require('./readSwagger')
const extract = require('./extractFromSwagger')
const { gateway, service, api } = require('./template')

program
  .option('-f, --file <swaggerFile>', 'The path to the swagger file')
  .option('-o, --output', 'The folder to output the generated service to')
  .option('-g, --gateway', 'Use this flag if the service is to be a gateway-api not a service.')
  .option(
    '-a, --api',
    'Use this flag if the service is to be a regular api not a service or gateway.'
  )
  .parse(process.argv)

const opts = program.opts()

const swaggerFilePath = path.resolve(process.cwd(), opts.file || './api.yml')
const isGateway = opts.gateway || false
const isApi = opts.api || false
const outputPath = path.resolve(process.cwd(), opts.output || '.')

console.log('swaggerFilePath', swaggerFilePath)
console.log('outputPath', outputPath)
console.log('isGateway', isGateway)
console.log('isApi', isApi)

try {
  const template = isApi ? api : isGateway ? gateway : service

  const swagger = readSwagger(swaggerFilePath)
  template(extract(swagger), swaggerFilePath)
} catch (err) {
  console.error('Caught', err)
  process.exit(1)
}
