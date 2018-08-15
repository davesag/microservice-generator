const YAML = require('yamljs')

const readSwagger = swaggerPath => YAML.load(swaggerPath)

module.exports = readSwagger
