const program = require('commander')
const path = require('path')
const fs = require('fs')

const readSwagger = require('src/readSwagger')
const extract = require('src/extractFromSwagger')
const { gateway, microservice } = require('src/template')

program
  .option('-f, --file <swaggerFile>', 'The path to the swagger file')
  .option('-o, --output', 'The folder to output the generated service to')
  .option(
    '-g, --gateway',
    'Use this flag if the service is to be a gateway-api not a microservice.'
  )
  .parse(process.argv)

const swaggerFilePath = path.join(process.cwd(), program.file || './api.yml')
const isGateway = program.gateway || false
const outputPath = path.join(process.cwd(), program.output || '.')

console.log('swaggerFilePath', swaggerFilePath)
console.log('outputPath', outputPath)
console.log('isGateway', isGateway)

try {
  const template = isGateway ? gateway : microservice

  template(extract(readSwagger(swaggerFilePath)))
} catch (err) {
  console.error('Caught', err)
  process.exit(1)
}
